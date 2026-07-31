"use client";

import React, { useMemo, useState } from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

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
  const [activeTab, setActiveTab] = useState("orders");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);
  const [, setAppliedFilters] = useState<FilterValues | null>(null);

  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [shareOrder, setShareOrder] = useState<Order | null>(null);
  const [assignOrder, setAssignOrder] = useState<Order | null>(null);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const handleApplyFilters = (values: FilterValues) => {
    setAppliedFilters(values);
  };

  const filteredOrders = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    if (!keyword) return dummyOrders;

    return dummyOrders.filter((order) => {
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
  }, [searchText]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredOrders.slice(start, start + PAGE_SIZE);
  }, [filteredOrders, currentPage]);

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <div style={{ marginBottom: 16 }}>
        <h1
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 700,
            color: "#232323",
          }}
        >
          Certified True Copy (47834)
        </h1>

        <p
          style={{
            margin: 0,
            color: "#8c8c8c",
          }}
        >
          Manage Your CTC Orders Here
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 18,
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
                padding: "8px 18px",
                borderRadius: 999,
                background: active ? "#232323" : "transparent",
                color: active ? "#fff" : "#888",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {tab.label}
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Input
          placeholder="Search Tag"
          prefix={<SearchOutlined />}
          value={searchText}
          allowClear
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            width: 320,
          }}
        />

        <Button onClick={() => setTagModalOpen(true)}>
          Choose Tag
        </Button>
      </div>

      <OrdersTable
        orders={paginatedOrders}
        onView={(order) => setViewOrder(order)}
        onShare={(order) => setShareOrder(order)}
        onAssign={(order) => setAssignOrder(order)}
      />

      <PaginationBar
        current={currentPage}
        total={filteredOrders.length}
        pageSize={PAGE_SIZE}
        onChange={setCurrentPage}
      />

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
          console.log(clerk);
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