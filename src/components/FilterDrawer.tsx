"use client";

import React, { useState } from "react";
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
  "All",
  "Judgement",
  "Interim Order",
  "Other",
];

export default function FilterDrawer({
  open,
  onClose,
  onApply,
}: FilterDrawerProps) {
  const [district, setDistrict] = useState<string>();
  const [court, setCourt] = useState<string>();
  const [product, setProduct] = useState<string>();
  const [testUsers, setTestUsers] = useState(true);

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
            Filter Users
          </div>

          <div
            style={{
              color: "#8A8A8A",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            Filter orders using available options
          </div>
        </div>
      }
      styles={{
        header: {
          padding: "24px",
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
        style={{
          width: "100%",
        }}
      >
        <div>
          <Text
            strong
            style={{
              display: "block",
              marginBottom: 8,
            }}
          >
            District
          </Text>

          <Select
            size="large"
            allowClear
            placeholder="Choose District"
            value={district}
            onChange={setDistrict}
            style={{
              width: "100%",
            }}
            options={districtOptions.map((d) => ({
              label: d,
              value: d,
            }))}
          />
        </div>

        <div>
          <Text
            strong
            style={{
              display: "block",
              marginBottom: 8,
            }}
          >
            Court Establishment
          </Text>

          <Select
            size="large"
            allowClear
            placeholder="Choose Court"
            value={court}
            onChange={setCourt}
            style={{
              width: "100%",
            }}
            options={courtOptions.map((c) => ({
              label: c,
              value: c,
            }))}
          />
        </div>

        <div>
          <Text
            strong
            style={{
              display: "block",
              marginBottom: 8,
            }}
          >
            Product
          </Text>

          <Select
            size="large"
            allowClear
            placeholder="All Products"
            value={product}
            onChange={setProduct}
            style={{
              width: "100%",
            }}
            options={productOptions.map((p) => ({
              label: p,
              value: p,
            }))}
          />
        </div>

        <Divider style={{ margin: "4px 0" }} />

        <Checkbox
          checked={testUsers}
          onChange={(e) => setTestUsers(e.target.checked)}
          style={{
            fontWeight: 500,
          }}
        >
          Show Test Users
        </Checkbox>
      </Space>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <Button
          size="large"
          onClick={handleReset}
          style={{
            borderRadius: 8,
            paddingInline: 24,
            height: 42,
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
            borderRadius: 8,
            paddingInline: 30,
            height: 42,
            fontWeight: 600,
          }}
        >
          Apply Filter
        </Button>
      </div>
    </Drawer>
  );
}