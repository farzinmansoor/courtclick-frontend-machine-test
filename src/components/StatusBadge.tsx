"use client";

import { Tag } from "antd";
import { OrderStatus } from "@/types/types";

interface StatusBadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<
  OrderStatus,
  {
    text: string;
    color: string;
    background: string;
    border: string;
    dot: string;
  }
> = {
  cancelled: {
    text: "Cancelled",
    color: "#CF1322",
    background: "#FFF1F0",
    border: "#FFA39E",
    dot: "#F5222D",
  },

  "order placed": {
    text: "Order Placed",
    color: "#237804",
    background: "#F6FFED",
    border: "#B7EB8F",
    dot: "#52C41A",
  },

  "payment completed": {
    text: "Payment Completed",
    color: "#AD6800",
    background: "#FFFBE6",
    border: "#FFE58F",
    dot: "#FAAD14",
  },
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const item = statusConfig[status];

  return (
    <Tag
      style={{
        background: item.background,
        color: item.color,
        border: `1px solid ${item.border}`,
        borderRadius: 999,
        padding: "6px 14px",
        fontWeight: 700,
        fontSize: 12,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        margin: 0,
        boxShadow: "0 2px 6px rgba(0,0,0,.05)",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: item.dot,
          display: "inline-block",
        }}
      />

      {item.text}
    </Tag>
  );
}