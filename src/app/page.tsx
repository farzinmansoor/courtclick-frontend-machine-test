"use client";

import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";

const { Content } = Layout;

export default function Home() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />

      <Layout style={{ minWidth: 0 }}>
        <Header />

        <Content
          style={{
            padding: 24,
            background: "#f5f5f5",
            overflow: "auto",
            minWidth: 0,
          }}
        >
          <Dashboard />
        </Content>
      </Layout>
    </Layout>
  );
}