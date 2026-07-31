"use client";

import React, { useState } from "react";
import {
  Modal,
  Input,
  Typography,
  Button,
  Tag as AntTag,
  Space,
} from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { tagColorOptions } from "@/data/tags";
import { Tag } from "@/types/types";

const { Text } = Typography;

interface CreateTagModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (tag: Tag) => void;
}

export default function CreateTagModal({
  open,
  onClose,
  onCreate,
}: CreateTagModalProps) {
  const [tagName, setTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const canCreate =
    tagName.trim().length > 0 && selectedColor !== null;

  const handleCreate = () => {
    if (!canCreate || !selectedColor) return;

    onCreate({
      id: `tag-${Date.now()}`,
      label: tagName.trim(),
      color: selectedColor,
    });

    setTagName("");
    setSelectedColor(null);

    onClose();
  };

  return (
    <Modal
      open={open}
      centered
      width={520}
      destroyOnClose
      footer={null}
      onCancel={onClose}
      title={
        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#222",
            }}
          >
            Create New Tag
          </div>

          <div
            style={{
              color: "#888",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            Create a custom tag for organizing orders
          </div>
        </div>
      }
    >
      <div style={{ marginTop: 24 }}>
        <Text
          strong
          style={{
            display: "block",
            marginBottom: 8,
          }}
        >
          Tag Name
        </Text>

        <Input
          size="large"
          placeholder="Enter tag name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          style={{
            borderRadius: 8,
          }}
        />
      </div>

      <div style={{ marginTop: 28 }}>
        <Text
          strong
          style={{
            display: "block",
            marginBottom: 14,
          }}
        >
          Choose Color
        </Text>

        <Space wrap size={14}>
          {tagColorOptions.map((color) => (
            <div
              key={color}
              onClick={() => setSelectedColor(color)}
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: color,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border:
                  selectedColor === color
                    ? "3px solid #222"
                    : "2px solid #ECECEC",
                transition: "0.2s",
              }}
            >
              {selectedColor === color && (
                <CheckOutlined
                  style={{
                    color: "#fff",
                    fontSize: 14,
                  }}
                />
              )}
            </div>
          ))}
        </Space>
      </div>

      <div style={{ marginTop: 30 }}>
        <Text
          strong
          style={{
            display: "block",
            marginBottom: 10,
          }}
        >
          Preview
        </Text>

        <div
          style={{
            minHeight: 60,
            border: "1px dashed #DDD",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            background: "#FAFAFA",
          }}
        >
          {canCreate ? (
            <AntTag
              style={{
                background: selectedColor!,
                border: "none",
                borderRadius: 18,
                padding: "6px 14px",
                fontWeight: 600,
                fontSize: 13,
                margin: 0,
              }}
            >
              {tagName}
            </AntTag>
          ) : (
            <Text type="secondary">
              Tag preview will appear here
            </Text>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          marginTop: 34,
        }}
      >
        <Button
          size="large"
          onClick={onClose}
          style={{
            borderRadius: 8,
            paddingInline: 24,
          }}
        >
          Cancel
        </Button>

        <Button
          size="large"
          type="primary"
          disabled={!canCreate}
          onClick={handleCreate}
          style={{
            background: "#5A1746",
            borderColor: "#5A1746",
            borderRadius: 8,
            paddingInline: 28,
            fontWeight: 600,
          }}
        >
          Create Tag
        </Button>
      </div>
    </Modal>
  );
}
