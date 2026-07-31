"use client";

import { useState } from "react";
import {
  CopyOutlined,
  CheckOutlined,
} from "@ant-design/icons";

interface AddressTabProps {
  order: {
    address?: {
      pincode?: string;
      addressLine1?: string;
      addressLine2?: string;
      city?: string;
      district?: string;
      state?: string;
      country?: string;
    };
  };
}

const Row = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "170px 1fr",
      alignItems: "start",
      marginBottom: 14,
    }}
  >
    <div
      style={{
        color: "#7D7D7D",
        fontWeight: 500,
        fontSize: 13,
      }}
    >
      {label}
    </div>

    <div
      style={{
        color: "#202020",
        fontWeight: 600,
        fontSize: 13,
      }}
    >
      {value}
    </div>
  </div>
);

export default function AddressTab({
  order,
}: AddressTabProps) {
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const pincode =
    order.address?.pincode || "682028";

  const addressLine1 =
    order.address?.addressLine1 ||
    "67/67A Flat No D, 1st Floor";

  const addressLine2 =
    order.address?.addressLine2 ||
    "Attaniyilthu Road, Vennala";

  const city =
    order.address?.city || "Kochi";

  const district =
    order.address?.district || "Ernakulam";

  const state =
    order.address?.state || "Kerala";

  const country =
    order.address?.country || "India";

  const fullAddress = `${addressLine1}, ${addressLine2}, ${city}, ${district}, ${state} - ${pincode}, ${country}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullAddress);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      style={{
        background: "#F6F6F6",
        borderRadius: 14,
        border: "1px solid #ECECEC",
        padding: 22,
        position: "relative",
      }}
    >
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          right: 22,
          top: 22,
          background: "#ffffff",
          border: "1px solid #E2E2E2",
          borderRadius: 8,
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {copied ? (
          <>
            <CheckOutlined
              style={{ color: "#16A34A" }}
            />
            Copied
          </>
        ) : (
          <>
            <CopyOutlined />
            Copy Address
          </>
        )}
      </button>

      <div style={{ paddingRight: 170 }}>
        <Row
          label="Pincode:"
          value={pincode}
        />

        <Row
          label="Address Line 1:"
          value={addressLine1}
        />

        <Row
          label="Address Line 2:"
          value={addressLine2}
        />

        <Row
          label="City:"
          value={city}
        />

        <Row
          label="District:"
          value={district}
        />

        <Row
          label="State:"
          value={state}
        />

        <Row
          label="Country:"
          value={country}
        />
      </div>
    </div>
  );
}