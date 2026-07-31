"use client";

import React from "react";
import { Table, Button, Space, Tag as AntTag, Avatar } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import { Order } from "@/types/order";
import StatusBadge from "./StatusBadge";
import CheckboxFilterPopover from "./CheckboxFilterPopover";
import { dummyTags } from "@/data/tags";

const productFilterOptions = [
  { label: "All", value: "all" },
  { label: "Judgement", value: "judgement" },
  { label: "Interim Order", value: "interim_order" },
  { label: "Other", value: "other" },
];

interface OrdersTableProps {
  orders: Order[];
  onShare: (order: Order) => void;
  onAssign: (order: Order) => void;
  onView: (order: Order) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  onShare,
  onAssign,
  onView,
}) => {
  const columns: ColumnsType<Order> = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 70,
      align: "center",
    },

    {
      title: "USER INFO",
      key: "userInfo",
      width: 260,

      render: (_, record) => (
        <Space size={12} align="start">
          <Avatar
            size={36}
            style={{
              background: "#5A1746",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {record.userName?.charAt(0)}
          </Avatar>

          <div style={{ lineHeight: 1.7 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 13,
                color: "#222",
              }}
            >
              {record.userName}
            </div>

            <div
              style={{
                color: "#666",
                fontSize: 13,
              }}
            >
              {record.phone}
            </div>

            <div
              style={{
                color: "#A0A0A0",
                fontSize: 12,
              }}
            >
              #{record.orderRef}
            </div>
          </div>
        </Space>
      ),
    },

    {
      title: "COURT COMPLEX",
      key: "courtComplex",
      width: 250,

      render: (_, record) => (
        <div style={{ lineHeight: 1.7 }}>
          <div
            style={{
              fontWeight: 600,
              color: "#222",
            }}
          >
            {record.courtComplex}
          </div>

          <div
            style={{
              color: "#8C8C8C",
              fontSize: 13,
            }}
          >
            {record.city}
          </div>
        </div>
      ),
    },

    {
      title: (
        <CheckboxFilterPopover
          options={productFilterOptions}
          onApply={(selected) => console.log(selected)}
        >
          <span
            style={{
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            PRODUCTS <FilterOutlined style={{ marginLeft: 4 }} />
          </span>
        </CheckboxFilterPopover>
      ),

      key: "products",
      width: 220,

      render: (_, record) => (
        <div>
          <div
            style={{
              fontWeight: 700,
              color: "#222",
            }}
          >
            {record.productName}
          </div>

          <div
            style={{
              color: "#111111",
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            ₹{record.amount.toLocaleString()}
          </div>
        </div>
      ),
    },

    {
      title: "ORDER DATE",
      key: "orderDate",
      width: 170,

      render: (_, record) => (
        <div>
          <div
            style={{
              fontWeight: 600,
            }}
          >
            {record.orderDate}
          </div>

          <div
            style={{
              color: "#999",
              marginTop: 4,
              fontSize: 12,
            }}
          >
            {record.orderTime}
          </div>
        </div>
      ),
    },

    {
      title: "STATUS",
      key: "status",
      width: 180,

      render: (_, record) => (
        <div>
          <StatusBadge status={record.status} />

          {record.statusNote && (
            <div
              style={{
                marginTop: 8,
                color: "#999",
                fontSize: 12,
                lineHeight: 1.5,
              }}
            >
              {record.statusNote}
            </div>
          )}
        </div>
      ),
    },

    {
      title: "ORDER DETAILS",
      key: "orderDetails",
      width: 170,

      render: (_, record) => (
        <Space direction="vertical" size={4}>
          <Button
            type="link"
            onClick={() => onView(record)}
            style={{
              padding: 0,
              fontWeight: 600,
            }}
          >
            View
          </Button>

          <Button
            type="link"
            style={{
              padding: 0,
              fontWeight: 600,
            }}
          >
            E-sign
          </Button>

          <Button
            type="link"
            onClick={() => onShare(record)}
            style={{
              padding: 0,
              fontWeight: 600,
            }}
          >
            Share
          </Button>
        </Space>
      ),
    },

    {
      title: (
        <CheckboxFilterPopover
          options={dummyTags.map((t) => ({
            label: t.label,
            value: t.id,
          }))}
          onApply={(selected) => console.log(selected)}
        >
          <span
            style={{
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            TAGS <FilterOutlined style={{ marginLeft: 4 }} />
          </span>
        </CheckboxFilterPopover>
      ),

      key: "tags",
      width: 240,

      render: (_, record) => (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {record.tags.map((tag) => (
            <AntTag
              key={tag.id}
              style={{
                background: tag.color,
                border: "none",
                borderRadius: 30,
                padding: "3px 10px",
                fontWeight: 600,
                fontSize: 10,
                margin: 0,
              }}
            >
              {tag.label}
            </AntTag>
          ))}
        </div>
      ),
    },

    {
      title: "CLERK",
      key: "clerk",
      width: 180,

      render: (_, record) =>
        record.clerk ? (
          <Space>
            <Avatar
              size={42}
              style={{
                background: "#5A1746",
                fontWeight: 700,
              }}
            >
              {record.clerk.charAt(0)}
            </Avatar>

            <span
              style={{
                fontWeight: 600,
              }}
            >
              {record.clerk}
            </span>
          </Space>
        ) : (
          <Button
            type="primary"
            onClick={() => onAssign(record)}
            style={{
              background: "#5A1746",
              borderColor: "#111111",
              borderRadius: 8,
              height: 34,
              paddingInline: 20,
              fontWeight: 600,
            }}
          >
            Assign
          </Button>
        ),
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ECECEC",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "none",
      }}
    >
      <Table<Order>
        columns={columns}
        dataSource={orders}
        rowKey="id"
        pagination={false}
        bordered={false}
        size="small"
        scroll={{
          x: 1900,
          y: 650,
        }}
        rowClassName={(_, index) =>
          index % 2 === 0 ? "even-row" : "odd-row"
        }
        onHeaderRow={() => ({
          style: {
            background: "#F7F7F7",
            height: 48,
            fontWeight: 700,
            fontSize: 11,
            color: "#666",
            textTransform: "uppercase",
          },
        })}
        onRow={() => ({
          style: {
            height: 72,
          },
        })}
      />
    </div>
  );
};

export default OrdersTable;