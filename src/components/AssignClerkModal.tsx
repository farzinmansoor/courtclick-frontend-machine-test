"use client";

import React, { useState } from "react";
import {
  Modal,
  Radio,
  Avatar,
  Button,
  Input,
  Typography,
  message,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { dummyClerks, Clerk } from "@/data/clerks";
import AddClerkModal from "./AddClerkModal";

const { Text } = Typography;

interface AssignClerkModalProps {
  open: boolean;
  onClose: () => void;
  onAssign: (clerk: Clerk) => void;
}

const AssignClerkModal: React.FC<AssignClerkModalProps> = ({
  open,
  onClose,
  onAssign,
}) => {
  const [clerks, setClerks] = useState(dummyClerks);
  const [selectedId, setSelectedId] = useState<string>();
  const [search, setSearch] = useState("");
  const [addClerkOpen, setAddClerkOpen] = useState(false);

  const filteredClerks = clerks.filter((clerk) =>
    clerk.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAssign = () => {
    const clerk = clerks.find((c) => c.id === selectedId);

    if (!clerk) {
      message.warning("Please select a clerk.");
      return;
    }

    onAssign(clerk);
    setSelectedId(undefined);
    onClose();
  };

  const handleAdd = (newClerk: Clerk) => {
    setClerks((prev) => [...prev, newClerk]);
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        width={650}
        centered
        title={
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              Assign Clerk
            </div>

            <div
              style={{
                color: "#8c8c8c",
                marginTop: 4,
                fontSize: 13,
              }}
            >
              Select the authorized clerk for this order.
            </div>
          </div>
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 18,
            marginTop: 12,
          }}
        >
          <Input
            placeholder="Search clerk..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "78%",
              borderRadius: 10,
            }}
          />

          <Button
            icon={<PlusOutlined />}
            type="primary"
            style={{
              background: "#5B2A86",
              borderColor: "#5B2A86",
              borderRadius: 10,
            }}
            onClick={() => setAddClerkOpen(true)}
          >
            Add
          </Button>
        </div>

        <Radio.Group
          style={{
            width: "100%",
          }}
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxHeight: 320,
              overflowY: "auto",
            }}
          >
            {filteredClerks.map((clerk) => (
              <div
                key={clerk.id}
                style={{
                  border: "1px solid #ECECEC",
                  borderRadius: 12,
                  padding: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Avatar
                    size={46}
                    icon={<UserOutlined />}
                    style={{
                      background: "#5B2A86",
                    }}
                  />

                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      {clerk.name}
                    </div>

                    {"phone" in clerk && (
                      <Text type="secondary">
                        {(clerk as any).phone}
                      </Text>
                    )}
                  </div>
                </div>

                <Radio value={clerk.id} />
              </div>
            ))}
          </div>
        </Radio.Group>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
          }}
        >
          <Button
            onClick={onClose}
            style={{
              borderRadius: 8,
            }}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            onClick={handleAssign}
            style={{
              background: "#5B2A86",
              borderColor: "#5B2A86",
              borderRadius: 8,
            }}
          >
            Assign Clerk
          </Button>
        </div>
      </Modal>

      <AddClerkModal
        open={addClerkOpen}
        onClose={() => setAddClerkOpen(false)}
        onAdd={handleAdd}
      />
    </>
  );
};

export default AssignClerkModal;