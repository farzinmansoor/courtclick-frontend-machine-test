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
import { Tag } from "@/types/types";
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

  const [editTag, setEditTag] = useState<Tag | null>(null);

  const createTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const updateTag = (updatedTag: Tag) => {
    setTags((prev) =>
      prev.map((tag) =>
        tag.id === updatedTag.id ? updatedTag : tag
      )
    );
  };

  const deleteTag = (id: string) => {
    setTags((prev) =>
      prev.filter((tag) => tag.id !== id)
    );
  };

  const editSelectedTag = (tag: Tag) => {
    setEditTag(tag);
    setCreateOpen(true);
  };

  return (
    <>
      <Modal
        open={open}
        centered
        width={650}
        destroyOnClose
        footer={null}
        onCancel={onClose}
        title={
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
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
          }}
        >
          <Text strong>Available Tags</Text>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditTag(null);
              setCreateOpen(true);
            }}
            style={{
              background: "#5A1746",
              borderColor: "#5A1746",
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

                <Space size={16}>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => editSelectedTag(tag)}
                    style={{
                      color: "#5A1746",
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
            marginTop: 24,
          }}
        >
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="primary"
            onClick={onClose}
            style={{
              background: "#5A1746",
              borderColor: "#5A1746",
            }}
          >
            Save Changes
          </Button>
        </div>

      </Modal>
            <CreateTagModal
        open={createOpen}
        editTag={editTag}
        onClose={() => {
          setCreateOpen(false);
          setEditTag(null);
        }}
        onCreate={createTag}
        onUpdate={updateTag}
      />
    </>
  );
}