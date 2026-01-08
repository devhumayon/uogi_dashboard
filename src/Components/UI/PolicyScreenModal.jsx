/* eslint-disable react/prop-types */
import { Modal, Button, Form, Typography } from "antd";

import { useState, useEffect } from "react";

const PolicyScreenModal = ({
  isViewModalVisible,
  currentRecord,
  handleCancel,
}) => {
  const [refundOnDeposit, setRefundOnDeposit] = useState(
    currentRecord?.customerRefundOnDeposit
  );

  // Use Ant Design's useForm hook to manage form state
  const [form] = Form.useForm();

  // Update refundOnDeposit when currentRecord changes (ensuring that it triggers the update correctly)
  useEffect(() => {
    if (currentRecord) {
      // Ensure that customerRefundOnDeposit is valid, else default to 0
      setRefundOnDeposit(currentRecord.customerRefundOnDeposit);
      // Update the form field values based on currentRecord
      form.setFieldsValue({
        customerRefundOnDeposit: currentRecord.customerRefundOnDeposit || 0,
      });
    }
  }, [currentRecord, form]); // Trigger when currentRecord changes

  // Calculate loss on deposit as 100 - refundOnDeposit
  const lossOnDeposit = 100 - refundOnDeposit;

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  // Ensure that currentRecord is not null or undefined before accessing its properties
  const timeOfCancellation = currentRecord?.timeOfCancellation || "N/A"; // Default if undefined or null

  // Handle modal cancelation and reset form fields
  const handleModalCancel = () => {
    handleCancel(); // Call the parent's handleCancel function
    form.resetFields(); // Reset the form fields
    setRefundOnDeposit(0); // Reset the state value as well
  };
  return (
    <Modal
      title={
        <div className="pt-5">
          <h2 className="text-secondary-color text-3xl text-center mb-5">
            {timeOfCancellation}
          </h2>
        </div>
      }
      open={isViewModalVisible}
      onCancel={handleModalCancel}
      footer={null}
      centered
    >
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="bg-transparent w-full"
      >
        <Typography.Title level={4} style={{ color: "#222222" }}>
          Amount Held by Uogi Admin Panel: {lossOnDeposit}%
        </Typography.Title>

        <Typography.Title level={4} style={{ color: "#222222" }}>
          Customer Refund on Deposit
        </Typography.Title>
        <input
          max={100} // Limit input to 100
          value={refundOnDeposit}
          onChange={(e) => setRefundOnDeposit(Number(e.target.value))}
          placeholder="Enter Refund on Deposit"
          className="py-1 rounded px-3 text-xl border !border-secondary-color outline-none !text-base-color !bg-transparent w-full mb-5"
        />

        <Typography.Title level={4} style={{ color: "#222222" }}>
          Amount Held by Uogi Admin Panel: {lossOnDeposit}%
        </Typography.Title>

        <Form.Item>
          <Button
            className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color !bg-[#FE5C8E] hover:!bg-secondary-color font-semibold mt-8"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PolicyScreenModal;
