"use client";

import React, { useMemo, useState } from "react";
import { Input, Button, Card, Space } from "antd";
import {
  SearchOutlined,
  TagsOutlined,
  FilterOutlined,
} from "@ant-design/icons";

import OrdersTable from "./OrdersTable";
import PaginationBar from "./PaginationBar";
import FilterDrawer, { FilterValues } from "./FilterDrawer";
import TagModal from "./TagModal";
import ShareModal from "./ShareModal";
import AssignClerkModal from "./AssignClerkModal";
import ViewOrderModal from "./ViewOrderModal";

import { dummyOrders } from "@/data/orders";
import { Order } from "@/types/types";
import { Clerk } from "@/data/clerks";

const PAGE_SIZE = 10;

const tabItems = [
  { key: "orders", label: "Orders (121)" },
  { key: "clerks", label: "Clerks (40)" },
  { key: "courts", label: "Courts (32)" },
  { key: "districts", label: "Districts (14)" },
  { key: "eligibleUsers", label: "Eligible Users (11)" },
];

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);

  const [activeTab, setActiveTab] = useState("orders");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);

  const [appliedFilters, setAppliedFilters] =
    useState<FilterValues | null>(null);

  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [shareOrder, setShareOrder] = useState<Order | null>(null);
  const [assignOrder, setAssignOrder] = useState<Order | null>(null);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const handleApplyFilters = (values: FilterValues) => {
    setAppliedFilters(values);
    setCurrentPage(1);
  };

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (appliedFilters?.district) {
      result = result.filter(
        (order) => order.city === appliedFilters.district
      );
    }

    if (appliedFilters?.courtEstablishment) {
      result = result.filter(
        (order) =>
          order.courtComplex ===
          appliedFilters.courtEstablishment
      );
    }

    if (appliedFilters?.product) {
      result = result.filter((order) =>
        order.productName
          .toLowerCase()
          .includes(appliedFilters.product!.toLowerCase())
      );
    }

    const keyword = searchText.trim().toLowerCase();

    if (keyword) {
      result = result.filter((order) => {
        return (
          order.userName?.toLowerCase().includes(keyword) ||
          order.phone?.toLowerCase().includes(keyword) ||
          order.orderRef?.toLowerCase().includes(keyword) ||
          order.caseNumber?.toLowerCase().includes(keyword) ||
          order.caseName?.toLowerCase().includes(keyword) ||
          order.cnrNumber?.toLowerCase().includes(keyword) ||
          order.courtComplex?.toLowerCase().includes(keyword) ||
          order.city?.toLowerCase().includes(keyword)
        );
      });
    }

    return result;
  }, [orders, searchText, appliedFilters]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredOrders.slice(start, start + PAGE_SIZE);
  }, [filteredOrders, currentPage]);
  return (
  <div
    style={{
      background: "#F6F7FB",
      minHeight: "100vh",
      padding: 32,
    }}
  >
    {/* Heading */}

    <div style={{ marginBottom: 28 }}>
      <h1
        style={{
          margin: 0,
          fontSize: 30,
          fontWeight: 700,
          color: "#4E1F63",
        }}
      >
        Certified True Copy
      </h1>

      <p
        style={{
          marginTop: 8,
          color: "#8C8C8C",
          fontSize: 15,
        }}
      >
        Manage your Certified True Copy orders
      </p>
    </div>

    <Card
      bordered={false}
      style={{
        borderRadius: 18,
        boxShadow: "0 4px 20px rgba(0,0,0,.05)",
      }}
      bodyStyle={{
        padding: 28,
      }}
    >
      {/* Tabs */}

      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 28,
          flexWrap: "wrap",
        }}
      >
        {tabItems.map((tab) => {
          const active = activeTab === tab.key;

          return (
            <div
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "10px 20px",
                borderRadius: 30,
                cursor: "pointer",
                background: active ? "#5A1746" : "#F5F5F5",
                color: active ? "#fff" : "#666",
                fontWeight: 600,
                transition: ".25s",
              }}
            >
              {tab.label}
            </div>
          );
        })}
      </div>

      {/* Search & Actions */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 28,
        }}
      >
        <Input
          placeholder="Search by User, Phone, Case..."
          prefix={<SearchOutlined />}
          allowClear
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            width: 380,
            height: 46,
            borderRadius: 12,
          }}
        />

        <Space wrap>
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterOpen(true)}
            style={{
              height: 46,
              borderRadius: 12,
              paddingInline: 24,
              fontWeight: 600,
            }}
          >
            Filter
          </Button>

          <Button
            type="primary"
            icon={<TagsOutlined />}
            onClick={() => setTagModalOpen(true)}
            style={{
              height: 46,
              borderRadius: 12,
              background: "#5A1746",
              borderColor: "#5A1746",
              paddingInline: 24,
              fontWeight: 600,
            }}
          >
            Choose Tag
          </Button>
        </Space>
      </div>

      <OrdersTable
        orders={paginatedOrders}
        onView={(order) => setViewOrder(order)}
        onShare={(order) => setShareOrder(order)}
        onAssign={(order) => setAssignOrder(order)}
      />

      <div style={{ marginTop: 24 }}>
        <PaginationBar
          current={currentPage}
          total={filteredOrders.length}
          pageSize={PAGE_SIZE}
          onChange={setCurrentPage}
        />
      </div>
    </Card>
          <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleApplyFilters}
      />

      <TagModal
        open={tagModalOpen}
        onClose={() => setTagModalOpen(false)}
      />

      <ShareModal
        open={shareOrder !== null}
        order={shareOrder}
        onClose={() => setShareOrder(null)}
      />

      <AssignClerkModal
        open={assignOrder !== null}
        onClose={() => setAssignOrder(null)}
        onAssign={(clerk: Clerk) => {
          if (!assignOrder) return;

          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === assignOrder.id
                ? {
                    ...order,
                    clerk: clerk.name,
                  }
                : order
            )
          );

          setAssignOrder(null);
        }}
      />

      <ViewOrderModal
        open={viewOrder !== null}
        order={viewOrder}
        onClose={() => setViewOrder(null)}
      />
    </div>
  );
};

export default Dashboard;