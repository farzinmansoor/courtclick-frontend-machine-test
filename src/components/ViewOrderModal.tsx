"use client";

import { Modal, Tabs, Divider } from "antd";
import {
  FileTextOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

import CaseDetailsTab from "./CaseDetailsTab";
import AddressTab from "./AddressTab";
import ProductsTab from "./ProductsTab";
import DigioTab from "./DigioTab";

interface Props {
  open: boolean;
  onClose: () => void;
  order: any;
}

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "170px 1fr",
      marginBottom: 10,
      fontSize: 13,
    }}
  >
    <span
      style={{
        color: "#7A7A7A",
        fontWeight: 500,
      }}
    >
      {label}
    </span>

    <span
      style={{
        color: "#1F1F1F",
        fontWeight: 600,
      }}
    >
      {value}
    </span>
  </div>
);

export default function ViewOrderModal({
  open,
  onClose,
  order,
}: Props) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
      width={1180}
      style={{ top: 20 }}
      bodyStyle={{
        padding: "24px 28px",
        background: "#fff",
      }}
      title={
        <div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: "#222",
            }}
          >
            Order Details
          </div>

          <div
            style={{
              marginTop: 4,
              color: "#8C8C8C",
              fontSize: 13,
            }}
          >
            View complete order information
          </div>
        </div>
      }
    >
      <div
        style={{
          width: 520,
          marginBottom: 20,
        }}
      >
        <DetailRow
          label="Order ID:"
          value={order?.orderId || "2298"}
        />

        <DetailRow
          label="Tracking ID:"
          value={order?.trackingId || "EL767335963IN"}
        />

        <DetailRow
          label="Payment completed:"
          value={order?.paymentCompleted || "27 Feb 2026 01:54 PM"}
        />

        <DetailRow
          label="Order placed:"
          value={order?.orderPlaced || "27 Feb 2026 02:01 PM"}
        />

        <DetailRow
          label="Assigned:"
          value={order?.assigned || "3 Mar 2026 05:35 PM"}
        />

        <DetailRow
          label="Applied:"
          value={order?.applied || "26 Mar 2026 10:45 AM"}
        />

        <DetailRow
          label="Dispatched:"
          value={order?.dispatched || "27 Feb 2026 01:54 PM"}
        />

        <DetailRow
          label="Delivered:"
          value={order?.delivered || "30 Mar 2026 06:03 PM"}
        />
      </div>

      <Divider style={{ margin: "0 0 20px 0" }} />

      <Tabs
        defaultActiveKey="1"
        size="middle"
        tabBarGutter={35}
        tabBarStyle={{
          marginBottom: 22,
          fontWeight: 600,
        }}
        items={[
          {
            key: "1",
            label: (
              <span>
                <FileTextOutlined />
                <span style={{ marginLeft: 8 }}>
                  Case & Customer Details
                </span>
              </span>
            ),
            children: <CaseDetailsTab order={order} />,
          },
          {
            key: "2",
            label: (
              <span>
                <HomeOutlined />
                <span style={{ marginLeft: 8 }}>
                  Address
                </span>
              </span>
            ),
            children: <AddressTab order={order} />,
          },
          {
            key: "3",
            label: (
              <span>
                <ShoppingCartOutlined />
                <span style={{ marginLeft: 8 }}>
                  Products
                </span>
              </span>
            ),
            children: <ProductsTab order={order} />,
          },
          {
            key: "4",
            label: (
              <span>
                <SafetyCertificateOutlined />
                <span style={{ marginLeft: 8 }}>
                  Digio eSigned Documents
                </span>
              </span>
            ),
            children: <DigioTab order={order} />,
          },
        ]}
      />
    </Modal>
  );
}