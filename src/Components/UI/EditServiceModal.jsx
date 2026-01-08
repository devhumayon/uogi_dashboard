/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal } from "antd";

const EditServiceModal = ({
  serviceData,
  handleSave,
  handleCancel,
  isModalVisible,
  form,
}) => {
  return (
    <Modal
      title={
        <div className="pt-7">
          <h2 className="text-secondary-color text-4xl ">Edit Service</h2>
        </div>
      }
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:min-w-[800px]"
    >
      {/* Ant Design Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={serviceData}
      >
        <Form.Item
          label="Service Name"
          name="serviceName"
          rules={[
            { required: true, message: "Please enter the service name!" },
          ]}
        >
          <Input
            className="!border-base-color"
            placeholder="Enter service name"
          />
        </Form.Item>

        <Form.Item
          label="Details"
          name="description"
          rules={[
            { required: true, message: "Please enter the service details!" },
          ]}
        >
          <Input.TextArea
            className="!border-base-color"
            rows={4}
            placeholder="Enter service details"
          />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter the price!" }]}
        >
          <Input
            className="!border-base-color"
            placeholder="Enter service price"
          />
        </Form.Item>

        {/* Modal Footer (Submit and Cancel buttons) */}
        <Form.Item>
          <div className="flex justify-end items-center gap-2">
            <Button className="w-full py-5 text-xl" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              className="!bg-secondary-color !text-primary-color border !border-secondary-color w-full py-5 text-xl"
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditServiceModal;
