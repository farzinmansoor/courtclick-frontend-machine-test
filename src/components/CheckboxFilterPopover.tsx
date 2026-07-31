"use client";

import React, { useState } from "react";
import {
  Popover,
  Checkbox,
  Button,
  Space,
  Divider,
  Typography,
} from "antd";

const { Text } = Typography;

export interface FilterOption {
  label: string;
  value: string;
}

interface CheckboxFilterPopoverProps {
  options: FilterOption[];
  onApply: (selected: string[]) => void;
  children: React.ReactNode;
}

export default function CheckboxFilterPopover({
  options,
  onApply,
  children,
}: CheckboxFilterPopoverProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    setSelected([]);
  };

  const handleApply = () => {
    onApply(selected);
    setOpen(false);
  };

  const content = (
    <div
      style={{
        width: 260,
      }}
    >
      <Text
        strong
        style={{
          fontSize: 15,
        }}
      >
        Filter Options
      </Text>

      <Divider
        style={{
          margin: "12px 0 16px",
        }}
      />

      <Checkbox.Group
        value={selected}
        onChange={(values) => setSelected(values as string[])}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {options.map((option) => (
          <Checkbox
            key={option.value}
            value={option.value}
            style={{
              fontSize: 14,
            }}
          >
            {option.label}
          </Checkbox>
        ))}
      </Checkbox.Group>

      <Divider
        style={{
          margin: "18px 0",
        }}
      />

      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={handleReset}
          style={{
            borderRadius: 8,
            height: 36,
            paddingInline: 18,
          }}
        >
          Reset
        </Button>

        <Button
          type="primary"
          onClick={handleApply}
          style={{
            background: "#5A1746",
            borderColor: "#5A1746",
            borderRadius: 8,
            height: 36,
            paddingInline: 22,
            fontWeight: 600,
          }}
        >
          Apply
        </Button>
      </Space>
    </div>
  );

  return (
    <Popover
      trigger="click"
      placement="bottomLeft"
      open={open}
      onOpenChange={setOpen}
      content={content}
      overlayInnerStyle={{
        borderRadius: 12,
        padding: 18,
      }}
    >
      <span
        style={{
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {children}
      </span>
    </Popover>
  );
}