"use client";

import React from "react";
import {
  Table,
  Button,
  Space,
  Tag as AntTag,
  Avatar,
  Typography,
} from "antd";
import { FilterOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import { Order } from "@/types/types";
import StatusBadge from "./StatusBadge";
import CheckboxFilterPopover from "./CheckboxFilterPopover";
import { dummyTags } from "@/data/tags";

const { Text } = Typography;

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
      width: 60,
      align: "center",
      render: (id) => (
        <Text strong style={{ color: "#444", fontSize: 13 }}>
          {id}
        </Text>
      ),
    },

    {
      title: "USER INFO",
      key: "userInfo",
      width: 270,

      render: (_, record) => (
        <Space size={14} align="start">
          <Avatar
            size={42}
            style={{
              background: "#5A1746",
              fontWeight: 700,
              fontSize: 15,
              boxShadow: "0 4px 12px rgba(90,23,70,.25)",
            }}
          >
            {record.userName.charAt(0).toUpperCase()}
          </Avatar>

          <div style={{ lineHeight: 1.6 }}>
            <div
              style={{
                fontWeight: 700,
                color: "#222",
                fontSize: 14,
              }}
            >
              {record.userName}
            </div>

            <div
              style={{
                color: "#777",
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
      width: 260,

      render: (_, record) => (
        <div style={{ lineHeight: 1.6 }}>
          <div
            style={{
              fontWeight: 700,
              color: "#222",
              fontSize: 13,
            }}
          >
            {record.courtComplex}
          </div>

          <div
            style={{
              color: "#8C8C8C",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            {record.city}
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
              color: "#1F1F1F",
            }}
          >
            {record.orderDate}
          </div>

          <div
            style={{
              color: "#8C8C8C",
              fontSize: 12,
              marginTop: 4,
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
                fontSize: 12,
                color: "#8C8C8C",
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
      title: "ORDER DETAILS / E-SIGN",
      key: "orderDetails",
      width: 180,

      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Button
            type="link"
            onClick={() => onView(record)}
            style={{
              padding: 0,
              color: "#5A1746",
              fontWeight: 600,
            }}
          >
            View
          </Button>

          <Button
            type="link"
            disabled
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
              color: "#5A1746",
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
          options={dummyTags.map((tag) => ({
            label: tag.label,
            value: tag.id,
          }))}
          onApply={(selected) => console.log(selected)}
        >
          <span
            style={{
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            TAGS
            <FilterOutlined style={{ marginLeft: 4 }} />
          </span>
        </CheckboxFilterPopover>
      ),

      key: "tags",
      width: 250,

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
                borderRadius: 20,
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 600,
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
      width: 190,

      render: (_, record) =>
        record.clerk ? (
          <Space size={12}>
            <Avatar
              size={42}
              style={{
                background: "#5A1746",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {record.clerk.name.charAt(0).toUpperCase()}
            </Avatar>

            <div>
              <div
                style={{
                  fontWeight: 700,
                  color: "#222",
                  fontSize: 13,
                }}
              >
                {record.clerk.name}
              </div>

              <div
                style={{
                  fontSize: 11,
                  color: "#999",
                }}
              >
                {record.clerk.phone}
              </div>
            </div>
          </Space>
        ) : (
          <Button
            type="primary"
            onClick={() => onAssign(record)}
            style={{
              background: "#5A1746",
              borderColor: "#5A1746",
              borderRadius: 10,
              height: 38,
              paddingInline: 22,
              fontWeight: 600,
              boxShadow: "0 6px 14px rgba(90,23,70,.18)",
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
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,.05)",
      }}
    >
      <Table<Order>
        columns={columns}
        dataSource={orders}
        rowKey="id"
        pagination={false}
        bordered={false}
        size="middle"
        scroll={{
          x: 1950,
          y: 650,
        }}
        rowClassName={(_, index) =>
          index % 2 === 0 ? "even-row" : "odd-row"
        }
        onHeaderRow={() => ({
          style: {
            background: "#FAFAFA",
            height: 60,
            fontWeight: 700,
            fontSize: 12,
            color: "#666",
            textTransform: "uppercase",
          },
        })}
        onRow={() => ({
          style: {
            height: 84,
          },
        })}
      />
    </div>
  );
};

export default OrdersTable;