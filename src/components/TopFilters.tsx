"use client";

import { Button, Space } from "antd";
import {
  FilterOutlined,
  ShareAltOutlined,
  TagsOutlined,
} from "@ant-design/icons";

export default function TopFilters() {
  return (
    <Space wrap>
      <Button icon={<FilterOutlined />}>
        Filter Users
      </Button>

      <Button icon={<ShareAltOutlined />}>
        Share
      </Button>

      <Button icon={<TagsOutlined />}>
        Choose Tag
      </Button>
    </Space>
  );
}