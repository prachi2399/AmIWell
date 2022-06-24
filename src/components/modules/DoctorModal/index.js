import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
const { Option } = Select;

function DoctorModal({
  modalVisible,
  handleOk,
  handleCancel,
  symptoms,
  profile,
  getDoctors,
}) {
  const { currentUser } = useAuth();

  const onFinish = async (values) => {
    try {
      if (profile) {
        await fetch(`http://localhost:4001/api/update-doctor/${profile?._id}`, {
          method: "PATCH", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      } else {
        await fetch("http://localhost:4001/api/post-doctor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      }
      getDoctors();
      handleOk();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Add your profile (Doctor)"
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        initialValues={{
          email: currentUser?.email,
          name: profile?.name,
          phone: profile?.phone,
          address: profile?.address,
          pincode: profile?.pincode,
          city: profile?.city,
          state: profile?.state,
          symptoms: profile?.symptoms,
        }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Pincode"
          name="pincode"
          rules={[{ required: true, message: "Please input your pincode!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please input your city!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: "Please input your state!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Symptoms"
          name="symptoms"
          rules={[{ required: true, message: "Please input your symptoms!" }]}
        >
          <Select
            size="large"
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Your Symptoms expertise"
          >
            {symptoms?.map((item, i) => (
              <Option key={i} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DoctorModal;
