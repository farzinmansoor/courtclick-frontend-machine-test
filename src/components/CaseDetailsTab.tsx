"use client";

interface CaseDetailsTabProps {
  order: {
    caseDetails?: {
      caseNumber?: string;
      legalName?: string;
      name?: string;
      email?: string;
      phone?: string;
      deliveryFeedback?: string;
      court?: string;
      petitioner?: string;
      respondent?: string;
    };
    customerDetails?: {
      name?: string;
      email?: string;
      phone?: string;
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
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      {label}
    </div>

    <div
      style={{
        color: "#202020",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {value}
    </div>
  </div>
);

export default function CaseDetailsTab({
  order,
}: CaseDetailsTabProps) {
  if (!order) return null;

  const caseNumber =
    order.caseDetails?.caseNumber ||
    "OS/300179/2024";

  const legalName =
    order.caseDetails?.legalName ||
    order.caseDetails?.name ||
    "Anil philip";

  const email =
    order.caseDetails?.email ||
    order.customerDetails?.email ||
    "anilphilipka@gmail.com";

  const phone =
    order.caseDetails?.phone ||
    order.customerDetails?.phone ||
    "919495862301";

  const feedback =
    order.caseDetails?.deliveryFeedback ||
    "N/A";

  return (
    <div
      style={{
        background: "#F6F6F6",
        borderRadius: 14,
        padding: 22,
        border: "1px solid #ECECEC",
      }}
    >
      <Row
        label="Case Number:"
        value={caseNumber}
      />

      <Row
        label="Legal Name:"
        value={legalName}
      />

      <Row
        label="Name:"
        value={legalName}
      />

      <Row
        label="Email:"
        value={email}
      />

      <Row
        label="Phone:"
        value={phone}
      />

      <Row
        label="Delivery Feedback:"
        value={
          <span>
            • <strong>Issue:</strong> {feedback}
          </span>
        }
      />
    </div>
  );
}