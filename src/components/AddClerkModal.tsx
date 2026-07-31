"use client";

import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
} from "antd";
import { Clerk } from "@/data/clerks";

interface AddClerkModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (clerk: Clerk) => void;
}

const AddClerkModal: React.FC<AddClerkModalProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = (values: any) => {
    setLoading(true);

    onAdd({
      id: `clerk-${Date.now()}`,
      name: values.name,
      phone: values.phone,
      clerkId: values.clerkId,
    });

    form.resetFields();
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={560}
      title={
        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#222",
            }}
          >
            Add New Clerk
          </div>

          <div
            style={{
              marginTop: 4,
              color: "#8c8c8c",
              fontSize: 13,
            }}
          >
            Create a new authorized personnel.
          </div>
        </div>
      }
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        style={{ marginTop: 24 }}
      >
        <Form.Item
          label="Clerk Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter clerk name",
            },
          ]}
        >
          <Input
            placeholder="Enter clerk name"
            size="large"
            style={{
              borderRadius: 10,
            }}
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter phone number",
            },
          ]}
        >
          <Input
            addonBefore={
              <Select
                defaultValue="+91"
                style={{ width: 85 }}
              >
                <Select.Option value="+91">
                  +91
                </Select.Option>
              </Select>
            }
            placeholder="9876543210"
            size="large"
            style={{
              borderRadius: 10,
            }}
          />
        </Form.Item>

        <Form.Item
          label="Clerk ID"
          name="clerkId"
          rules={[
            {
              required: true,
              message: "Please enter Clerk ID",
            },
          ]}
        >
          <Input
            placeholder="Enter Clerk ID"
            size="large"
            style={{
              borderRadius: 10,
            }}
          />
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 10,
          }}
        >
          <Button
            onClick={onClose}
            size="large"
            style={{
              borderRadius: 8,
            }}
          >
            Cancel
          </Button>

          <Button
            htmlType="submit"
            type="primary"
            loading={loading}
            size="large"
            style={{
              background: "#5B2A86",
              borderColor: "#5B2A86",
              borderRadius: 8,
            }}
          >
            Save Clerk
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddClerkModal;