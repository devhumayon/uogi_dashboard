/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";

const PolicyScreenTable = ({ data, loading, showViewModal }) => {
  const columns = [
    {
      title: "Time of Cancellation",
      dataIndex: "timeOfCancellation",
      key: "timeOfCancellation",
    },
    {
      title: "Customer Loss on Deposit",
      dataIndex: "customerLossOnDeposit",
      key: "customerLossOnDeposit",
      render: (text) => `${text}%`, // Append % symbol to the value
    },
    {
      title: "Customer Refund on Deposit",
      dataIndex: "customerRefundOnDeposit",
      key: "customerRefundOnDeposit",
      render: (text) => `${text}%`, // Append % symbol to the value
    },
    {
      title: "Amount Held by Uogi Admin Panel",
      dataIndex: "amountHeldByUogiAdminPanel",
      key: "amountHeldByUogiAdminPanel",
      render: (text) => `${text}%`, // Append % symbol to the value
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="right" title="Edit">
            <Button
              className="!p-0"
              style={{
                background: "#FFFFFF",
                border: "none",
                color: "#222222",
              }}
              onClick={() => showViewModal(record)}
            >
              <CiEdit
                className="!text-secondary-color"
                style={{ fontSize: "24px" }}
              />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default PolicyScreenTable;
