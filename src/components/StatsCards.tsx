"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const stats = [
  {
    title: "Total Orders",
    value: "121",
    subtitle: "All Orders",
    icon: <ShoppingCartOutlined />,
    color: "#5B2A86",
    bg: "#F6F0FC",
  },
  {
    title: "Completed",
    value: "86",
    subtitle: "Successfully Delivered",
    icon: <CheckCircleOutlined />,
    color: "#389E0D",
    bg: "#F6FFED",
  },
  {
    title: "Pending",
    value: "35",
    subtitle: "Awaiting Processing",
    icon: <ClockCircleOutlined />,
    color: "#FA8C16",
    bg: "#FFF7E6",
  },
  {
    title: "Revenue",
    value: "₹1,24,500",
    subtitle: "This Month",
    icon: <DollarOutlined />,
    color: "#1677FF",
    bg: "#F0F7FF",
  },
];

export default function StatsCards() {
  return (
    <Row gutter={[20, 20]} style={{ marginBottom: 28 }}>
      {stats.map((item) => (
        <Col xs={24} sm={12} lg={6} key={item.title}>
          <Card
            bordered={false}
            styles={{
              body: {
                padding: 22,
              },
            }}
            style={{
              borderRadius: 18,
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#888",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </div>

                <div
                  style={{
                    marginTop: 10,
                    fontSize: 30,
                    fontWeight: 700,
                    color: "#222",
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                </div>

                <div
                  style={{
                    marginTop: 12,
                    color: "#8A8A8A",
                    fontSize: 13,
                  }}
                >
                  {item.subtitle}
                </div>
              </div>

              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 16,
                  background: item.bg,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: item.color,
                  fontSize: 26,
                }}
              >
                {item.icon}
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}