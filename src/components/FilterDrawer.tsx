"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  Select,
  Checkbox,
  Button,
  Typography,
  Divider,
  Space,
} from "antd";

const { Text } = Typography;

export interface FilterValues {
  district?: string;
  courtEstablishment?: string;
  product?: string;
  testUsers: boolean;
}

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  onApply: (values: FilterValues) => void;

  // Current applied filters
  initialValues?: FilterValues;
}

const districtOptions = [
  "Thrissur",
  "Kochi",
  "Kozhikode",
  "Palakkad",
];

const courtOptions = [
  "District Court Thrissur",
  "Court Complex, Kunnamkulam",
  "High Court Kerala",
];

const productOptions = [
  "Judgement",
  "Interim Order",
  "Other",
];

export default function FilterDrawer({
  open,
  onClose,
  onApply,
  initialValues,
}: FilterDrawerProps) {
  const [district, setDistrict] = useState<string>();
  const [court, setCourt] = useState<string>();
  const [product, setProduct] = useState<string>();
  const [testUsers, setTestUsers] = useState(false);

  // Load previously applied filters whenever drawer opens
  useEffect(() => {
    if (open) {
      setDistrict(initialValues?.district);
      setCourt(initialValues?.courtEstablishment);
      setProduct(initialValues?.product);
      setTestUsers(initialValues?.testUsers ?? false);
    }
  }, [open, initialValues]);
  const handleReset = () => {
  setDistrict(undefined);
  setCourt(undefined);
  setProduct(undefined);
  setTestUsers(false);
};

const handleApply = () => {
  onApply({
    district,
    courtEstablishment: court,
    product,
    testUsers,
  });

  onClose();
};

const activeFilters = [
  district,
  court,
  product,
  testUsers ? "Test Users" : null,
].filter(Boolean).length;

return (
  <Drawer
    open={open}
    onClose={onClose}
    width={430}
    title={
      <div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#222",
          }}
        >
          Filter Orders
        </div>

        <div
          style={{
            color: "#8A8A8A",
            fontSize: 13,
            marginTop: 4,
          }}
        >
          Refine the order list using the filters below.
        </div>
      </div>
    }
    styles={{
      header: {
        padding: 24,
        borderBottom: "1px solid #ECECEC",
      },
      body: {
        padding: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
    }}
  >
    <Space
      direction="vertical"
      size={24}
      style={{ width: "100%" }}
    >
      <div>
        <Text strong style={{ display: "block", marginBottom: 8 }}>
          District
        </Text>

        <Select
          size="large"
          allowClear
          placeholder="Select District"
          value={district}
          onChange={setDistrict}
          style={{ width: "100%" }}
          options={districtOptions.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </div>

      <div>
        <Text strong style={{ display: "block", marginBottom: 8 }}>
          Court Establishment
        </Text>

        <Select
          size="large"
          allowClear
          placeholder="Select Court"
          value={court}
          onChange={setCourt}
          style={{ width: "100%" }}
          options={courtOptions.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </div>

      <div>
        <Text strong style={{ display: "block", marginBottom: 8 }}>
          Product
        </Text>

        <Select
          size="large"
          allowClear
          placeholder="Select Product"
          value={product}
          onChange={setProduct}
          style={{ width: "100%" }}
          options={productOptions.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </div>

      <Divider />

      <Checkbox
        checked={testUsers}
        onChange={(e) => setTestUsers(e.target.checked)}
      >
        Show Test Users
      </Checkbox>
    </Space>

    <div
      style={{
        marginTop: 40,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        onClick={handleReset}
        size="large"
        style={{
          borderRadius: 10,
          height: 44,
          paddingInline: 28,
        }}
      >
        Reset
      </Button>

      <Button
        type="primary"
        size="large"
        onClick={handleApply}
        style={{
          background: "#5A1746",
          borderColor: "#5A1746",
          borderRadius: 10,
          height: 44,
          paddingInline: 30,
          fontWeight: 600,
        }}
      >
        Apply Filter
        {activeFilters > 0 ? ` (${activeFilters})` : ""}
      </Button>
    </div>
  </Drawer>
);
}