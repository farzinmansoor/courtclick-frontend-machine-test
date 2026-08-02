"use client";

import React, { useEffect, useState } from "react";
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
  onUpdate?: (tag: Tag) => void;
  editTag?: Tag | null;
}

export default function CreateTagModal({
  open,
  onClose,
  onCreate,
  onUpdate,
  editTag,
}: CreateTagModalProps) {
  const [tagName, setTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      if (editTag) {
        setTagName(editTag.label);
        setSelectedColor(editTag.color);
      } else {
        setTagName("");
        setSelectedColor(null);
      }
    }
  }, [open, editTag]);

  const canSave =
    tagName.trim().length > 0 && selectedColor !== null;

  const handleSave = () => {
    if (!canSave || !selectedColor) return;

    const tag: Tag = {
      id: editTag ? editTag.id : `tag-${Date.now()}`,
      label: tagName.trim(),
      color: selectedColor,
    };

    if (editTag && onUpdate) {
      onUpdate(tag);
    } else {
      onCreate(tag);
    }

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
            {editTag ? "Edit Tag" : "Create New Tag"}
          </div>

          <div
            style={{
              color: "#888",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            {editTag
              ? "Update your existing tag"
              : "Create a custom tag for organizing orders"}
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
          style={{ borderRadius: 8 }}
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
          {canSave ? (
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
          disabled={!canSave}
          onClick={handleSave}
          style={{
            background: "#5A1746",
            borderColor: "#5A1746",
            borderRadius: 8,
            paddingInline: 28,
            fontWeight: 600,
          }}
        >
          {editTag ? "Save Changes" : "Create Tag"}
        </Button>
      </div>
    </Modal>
  );
}