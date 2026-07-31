"use client";

import { Button, Space } from "antd";
import {
  EyeOutlined,
  UserAddOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

export default function ActionButtons() {
  return (
    <Space>
      <Button type="link" icon={<EyeOutlined />}>
        View
      </Button>

      <Button type="link" icon={<UserAddOutlined />}>
        Assign
      </Button>

      <Button type="link" icon={<ShareAltOutlined />}>
        Share
      </Button>
    </Space>
  );
}