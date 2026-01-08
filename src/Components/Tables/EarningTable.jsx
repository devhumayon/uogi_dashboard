/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import dayjs from "dayjs";
import { GoEye } from "react-icons/go";

const EarningTable = ({ data, loading, showViewModal, pageSize = 0 }) => {
  const columns = [
    {
      title: "Txn ID",
      dataIndex: "transactionId",
      key: "transactionId",
      responsive: ["md"],
    },
    {
      title: "Amount",
      dataIndex: "depositAmount",
      key: "depositAmount",
    },
    {
      title: "Time & Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (date) => (date ? dayjs(date).format("DD-MM-YYYY hh:mm A") : "-"),
    },
    {
      title: "Payment Method",
      dataIndex: "method",
      key: "method",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Tooltip placement="right" title="View Details">
              <Button
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#222222",
                }}
                onClick={() => showViewModal(record)}
              >
                <GoEye style={{ fontSize: "24px" }} />
              </Button>
            </Tooltip>
          </Space>
        </>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pageSize > 0 ? { pageSize } : false}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default EarningTable;
