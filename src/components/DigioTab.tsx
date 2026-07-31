"use client";

interface DocumentItem {
  id?: string;
  digioId?: string;
  status?: string;
  signedDocumentUrl?: string;
  auditLogUrl?: string;
}

interface DigioTabProps {
  order: {
    documents?: DocumentItem[];
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
      alignItems: "center",
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
        color: "#222",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {value}
    </div>
  </div>
);

export default function DigioTab({
  order,
}: DigioTabProps) {
  if (!order) return null;

  const documents: DocumentItem[] =
    order.documents && order.documents.length > 0
      ? order.documents
      : [
          {
            id: "1",
            digioId:
              "DID260227135944268625QRGSUK5WP37",
            status: "Completed",
          },
        ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {documents.map((doc, index) => (
        <div
          key={doc.id || index}
          style={{
            background: "#F6F6F6",
            border: "1px solid #ECECEC",
            borderRadius: 14,
            padding: 22,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#222",
              marginBottom: 20,
            }}
          >
            eSign {index + 1}
          </div>

          <Row
            label="Digio ID:"
            value={
              doc.digioId ||
              "DID260227135944268625QRGSUK5WP37"
            }
          />

          <Row
            label="Status:"
            value={
              <span
                style={{
                  color:
                    doc.status === "Completed"
                      ? "#16A34A"
                      : "#D97706",
                  fontWeight: 700,
                }}
              >
                {doc.status || "Completed"}
              </span>
            }
          />

          <Row
            label="Signed Document:"
            value={
              <a
                href={doc.signedDocumentUrl || "#"}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  if (!doc.signedDocumentUrl) {
                    e.preventDefault();
                  }
                }}
                style={{
                  color: "#1677ff",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View Signed Document
              </a>
            }
          />

          <Row
            label="Audit Log:"
            value={
              <a
                href={doc.auditLogUrl || "#"}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  if (!doc.auditLogUrl) {
                    e.preventDefault();
                  }
                }}
                style={{
                  color: "#1677ff",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View Audit Log
              </a>
            }
          />
        </div>
      ))}
    </div>
  );
}