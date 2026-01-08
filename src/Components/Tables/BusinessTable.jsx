/* eslint-disable react/prop-types */
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const BusinessTable = ({ data, loading, pageSize = 0 }) => {
  const navigate = useNavigate();

  const handleNavigate = (record) => {
    navigate(`/business/${record._id}`, { state: { businessData: record } });
  };

  const columns = [
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
    },
    {
      title: "Business Email",
      dataIndex: "businessEmail",
      key: "businessEmail",
      render: (_, record) => record?.businessId?.email || "N/A",
    },
    {
      title: "Business Type",
      dataIndex: "businessType",
      key: "businessType",
      render: (types) =>
        types && Array.isArray(types) && types.length > 0 ? (
          <>
            {types.map((type, index) => (
              <Tag color="#FE5C8E" key={index}>
                {type}
              </Tag>
            ))}
          </>
        ) : (
          <span>-</span>
        ),
    },
    {
      title: "Location",
      dataIndex: "businessLocation",
      key: "businessLocation",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (text) => <span>{text}</span>,
    },
    // {
    //   title: "Total Withdraw",
    //   dataIndex: "totalWithdraw",
    //   key: "totalWithdraw",
    //   render: (text) => <span>{text}</span>,
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="right" title="View Details">
            <Button
              className="!p-0"
              style={{
                background: "#FFFFFF",
                border: "none",
                color: "#222222",
              }}
              onClick={() => handleNavigate(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
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
        pagination={pageSize > 0 ? { pageSize } : false}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default BusinessTable;
