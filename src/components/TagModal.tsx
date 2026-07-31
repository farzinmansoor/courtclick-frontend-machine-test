"use client";

import React, { useState } from "react";
import {
  Modal,
  Button,
  Tag as AntTag,
  Space,
  Typography,
  Empty,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { dummyTags } from "@/data/tags";
import { Tag } from "@/types/order";
import CreateTagModal from "./CreateTagModal";

const { Text } = Typography;

interface TagModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TagModal({
  open,
  onClose,
}: TagModalProps) {
  const [tags, setTags] = useState<Tag[]>(dummyTags);
  const [createOpen, setCreateOpen] = useState(false);

  const deleteTag = (id: string) => {
    setTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const createTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  return (
    <>
      <Modal
        open={open}
        centered
        width={650}
        destroyOnClose
        onCancel={onClose}
        footer={null}
        title={
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#222",
              }}
            >
              Choose Tag
            </div>

            <div
              style={{
                color: "#888",
                fontSize: 13,
                marginTop: 4,
              }}
            >
              Create, edit and manage order tags
            </div>
          </div>
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
            marginTop: 8,
          }}
        >
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            Available Tags
          </Text>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateOpen(true)}
            style={{
              background: "#5A1746",
              borderColor: "#5A1746",
              borderRadius: 8,
              height: 40,
              fontWeight: 600,
              paddingInline: 20,
            }}
          >
            Create Tag
          </Button>
        </div>

        <div
          style={{
            maxHeight: 430,
            overflowY: "auto",
            paddingRight: 4,
          }}
        >
          {tags.length === 0 ? (
            <Empty
              description="No Tags Available"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            tags.map((tag) => (
              <div
                key={tag.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#FAFAFA",
                  border: "1px solid #ECECEC",
                  borderRadius: 12,
                  padding: "16px 18px",
                  marginBottom: 14,
                }}
              >
                <div>
                  <AntTag
                    style={{
                      background: tag.color,
                      border: "none",
                      borderRadius: 16,
                      padding: "6px 14px",
                      fontWeight: 600,
                      fontSize: 13,
                      margin: 0,
                    }}
                  >
                    {tag.label}
                  </AntTag>
                </div>

                <Space size={18}>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    style={{
                      color: "#5A1746",
                      fontSize: 18,
                    }}
                  />

                  <Popconfirm
                    title="Delete this tag?"
                    okText="Delete"
                    cancelText="Cancel"
                    onConfirm={() => deleteTag(tag.id)}
                  >
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      style={{
                        fontSize: 18,
                      }}
                    />
                  </Popconfirm>
                </Space>
              </div>
            ))
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 28,
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
            onClick={onClose}
            style={{
              background: "#5A1746",
              borderColor: "#5A1746",
              borderRadius: 8,
              paddingInline: 28,
              fontWeight: 600,
            }}
          >
            Save Changes
          </Button>
        </div>
      </Modal>

      <CreateTagModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={createTag}
      />
    </>
  );
}