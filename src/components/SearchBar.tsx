"use client";

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function SearchBar() {
  return (
    <Input
      size="large"
      placeholder="Search Order ID / Customer Name"
      prefix={<SearchOutlined />}
    />
  );
}