"use client";

import React, { useState } from "react";
import { Pagination, InputNumber, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

interface PaginationBarProps {
  current: number;
  total: number;
  pageSize?: number;
  onChange: (page: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  current,
  total,
  pageSize = 10,
  onChange,
}) => {
  const [goToValue, setGoToValue] = useState<number | null>(null);

  const totalPages = Math.ceil(total / pageSize);

  const handleGoTo = () => {
    if (
      goToValue &&
      goToValue >= 1 &&
      goToValue <= totalPages
    ) {
      onChange(goToValue);
      setGoToValue(null);
    }
  };

  const startItem = total === 0 ? 0 : (current - 1) * pageSize + 1;
  const endItem = Math.min(current * pageSize, total);

  return (
    <div
      style={{
        marginTop: 24,
        background: "#FFFFFF",
        borderRadius: 18,
        border: "1px solid #ECECEC",
        padding: "18px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 20,
        boxShadow: "0 6px 18px rgba(0,0,0,.04)",
      }}
    >
      <div
        style={{
          color: "#777",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        Showing{" "}
        <strong style={{ color: "#222" }}>
          {startItem}-{endItem}
        </strong>{" "}
        of{" "}
        <strong style={{ color: "#5A1746" }}>
          {total}
        </strong>{" "}
        orders
      </div>

      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        showSizeChanger={false}
        onChange={onChange}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            color: "#666",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Go to
        </span>

        <InputNumber
          min={1}
          max={totalPages}
          controls={false}
          placeholder="1"
          value={goToValue}
          onChange={(value) => setGoToValue(value)}
          onPressEnter={handleGoTo}
          style={{
            width: 80,
            borderRadius: 10,
          }}
        />

        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          onClick={handleGoTo}
          style={{
            height: 40,
            borderRadius: 10,
            paddingInline: 18,
            background:
              "linear-gradient(135deg,#5A1746,#7B2CBF)",
            border: "none",
            fontWeight: 600,
            boxShadow:
              "0 8px 18px rgba(90,23,70,.18)",
          }}
        >
          Go
        </Button>
      </div>
    </div>
  );
};

export default PaginationBar;