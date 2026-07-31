"use client";

import React from "react";
import {
  Modal,
  Button,
  Typography,
  message,
  Space,
} from "antd";
import {
  CopyOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Order } from "@/types/types";

const { Text } = Typography;

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
}

interface RowProps {
  label: string;
  value: string;
}

const Row = ({ label, value }: RowProps) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 18px",
      background: "#FAFAFA",
      border: "1px solid #ECECEC",
      borderRadius: 10,
      marginBottom: 12,
    }}
  >
    <Text
      style={{
        color: "#777",
        fontWeight: 500,
      }}
    >
      {label}
    </Text>

    <Text
      strong
      style={{
        color: "#222",
        maxWidth: 340,
        textAlign: "right",
      }}
    >
      {value}
    </Text>
  </div>
);

export default function ShareModal({
  open,
  onClose,
  order,
}: ShareModalProps) {
  if (!order) return null;

  const details = `Applicant : ${order.userName}

Phone : ${order.phone}

Case Number : ${order.caseNumber ?? "-"}

Case Name : ${order.caseName ?? "-"}

CNR Number : ${order.cnrNumber ?? "-"}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(details);
    message.success("Details copied");
  };

  const handleShare = () => {
    const text = encodeURIComponent(details);

    window.open(
      `https://wa.me/?text=${text}`,
      "_blank"
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={700}
      destroyOnClose
      title={
        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#222",
            }}
          >
            Share Order
          </div>

          <div
            style={{
              color: "#888",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            Share order information with customer
          </div>
        </div>
      }
      styles={{
        body: {
          paddingTop: 24,
        },
      }}
    >
      <Row
        label="Applicant"
        value={`${order.userName} (Petitioner)`}
      />

      <Row
        label="Phone"
        value={order.phone}
      />

      <Row
        label="Case Number"
        value={order.caseNumber ?? "-"}
      />

      <Row
        label="Case Name"
        value={order.caseName ?? "-"}
      />

      <Row
        label="CNR Number"
        value={order.cnrNumber ?? "-"}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        <Button
          size="large"
          icon={<CopyOutlined />}
          onClick={handleCopy}
          style={{
            height: 42,
            borderRadius: 8,
            fontWeight: 600,
            paddingInline: 22,
          }}
        >
          Copy Details
        </Button>

        <Space>
          <Button
            size="large"
            onClick={onClose}
            style={{
              height: 42,
              borderRadius: 8,
              paddingInline: 22,
            }}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            size="large"
            icon={<WhatsAppOutlined />}
            onClick={handleShare}
            style={{
              background: "#5A1746",
              borderColor: "#5A1746",
              height: 42,
              borderRadius: 8,
              fontWeight: 600,
              paddingInline: 26,
            }}
          >
            Share
          </Button>
        </Space>
      </div>
    </Modal>
  );
}