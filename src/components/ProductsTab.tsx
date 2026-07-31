"use client";

interface ProductItem {
  id?: string;
  name?: string;
  type?: string;
  orderDate?: string;
  file?: string;
  fileUrl?: string;
  quantity?: number;
  price?: number;
}

interface ProductsTabProps {
  order: {
    products?: ProductItem[];
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
      marginBottom: 14,
      alignItems: "center",
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
        color: "#222",
        fontWeight: 600,
        fontSize: 13,
      }}
    >
      {value}
    </div>
  </div>
);

export default function ProductsTab({
  order,
}: ProductsTabProps) {
  if (!order) return null;

  const products: ProductItem[] =
    order.products && order.products.length > 0
      ? order.products
      : [
          {
            id: "1",
            name: "Certified True Copy",
            type: "Judgement",
            orderDate: "27 Feb 2026",
            file: "Judgement.pdf",
            quantity: 1,
            price: 250,
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
      {products.map((product, index) => (
        <div
          key={product.id || index}
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
              marginBottom: 20,
              color: "#222",
            }}
          >
            {product.name || `Product ${index + 1}`}
          </div>

          <Row
            label="Product Type:"
            value={product.type || "Judgement"}
          />

          <Row
            label="Order Date:"
            value={product.orderDate || "27 Feb 2026"}
          />

          <Row
            label="Quantity:"
            value={product.quantity || 1}
          />

          <Row
            label="Price:"
            value={`₹${product.price || 250}`}
          />

          <Row
            label="File:"
            value={
              product.fileUrl ? (
                <a
                  href={product.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#1677ff",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  View File
                </a>
              ) : (
                <span
                  style={{
                    color: "#1677ff",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {product.file || "View File"}
                </span>
              )
            }
          />
        </div>
      ))}
    </div>
  );
}