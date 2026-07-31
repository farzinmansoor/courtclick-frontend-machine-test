"use client";

import { Layout } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  TeamOutlined,
  FileTextOutlined,
  ReloadOutlined,
  UsergroupAddOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const menus = [
  { key: 1, icon: <DashboardOutlined />, active: false },
  { key: 2, icon: <AppstoreOutlined />, active: true },
  { key: 3, icon: <TeamOutlined />, active: false },
  { key: 4, icon: <UsergroupAddOutlined />, active: false },
  { key: 5, icon: <FileTextOutlined />, active: false },
  { key: 6, icon: <ReloadOutlined />, active: false },
];

export default function Sidebar() {
  return (
    <Sider
      width={96}
      theme="light"
      style={{
        background: "#111111",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRight: "1px solid rgba(255,255,255,.06)",
      }}
    >
      {/* Logo */}

      <div
        style={{
          height: 96,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "linear-gradient(135deg,#5A1746,#7B2CBF)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 12px 30px rgba(90,23,70,.35)",
          }}
        >
          <UserOutlined
            style={{
              color: "#fff",
              fontSize: 26,
            }}
          />
        </div>
      </div>

      {/* Menu */}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 28,
          gap: 18,
        }}
      >
        {menus.map((item) => (
          <div
            key={item.key}
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {item.active && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 4,
                  height: 44,
                  borderRadius: "0 8px 8px 0",
                  background: "#7B2CBF",
                }}
              />
            )}

            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "all .25s ease",
                background: item.active
                  ? "linear-gradient(135deg,#5A1746,#7B2CBF)"
                  : "transparent",
                color: item.active ? "#fff" : "#AFAFAF",
                fontSize: 22,
                boxShadow: item.active
                  ? "0 10px 24px rgba(90,23,70,.35)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!item.active) {
                  e.currentTarget.style.background = "#232323";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!item.active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#AFAFAF";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          paddingBottom: 28,
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#BFBFBF",
            cursor: "pointer",
            transition: "all .25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#232323";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#BFBFBF";
          }}
        >
          <MoreOutlined
            style={{
              fontSize: 22,
            }}
          />
        </div>

        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "#F5F5F5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "3px solid #5A1746",
            cursor: "pointer",
            transition: "all .25s ease",
          }}
        >
          <UserOutlined
            style={{
              color: "#5A1746",
              fontSize: 24,
            }}
          />
        </div>
      </div>
    </Sider>
  );
}