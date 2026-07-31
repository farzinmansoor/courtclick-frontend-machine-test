"use client";

import { Input, Button } from "antd";
import {
  SearchOutlined,
  ShareAltOutlined,
  FilterOutlined,
} from "@ant-design/icons";

export default function Header() {
  return (
    <div
      style={{
        height: 64,
        background: "#fff",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 20px",
        gap: 10,
        borderBottom: "1px solid #ECECEC",
      }}
    >
      <Button
        icon={<ShareAltOutlined />}
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          padding: 0,
        }}
      />

      <Button
        icon={<FilterOutlined />}
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          padding: 0,
        }}
      />

      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        style={{
          width: 220,
          borderRadius: 8,
        }}
      />
    </div>
  );
}