/* eslint-disable react/prop-types */
import { Table } from "antd";
import dayjs from "dayjs";
import { getImageUrl } from "../../utils/baseUrl";

const RecentUserTable = ({ data, loading, pageSize = 5 }) => {
  const imageUrl = getImageUrl();
  const columns = [
    {
      title: "#SI",
      dataIndex: "id",
      key: "id",
      responsive: ["md"],
      render: (_, __, index) => index + 1, // Serial number based on row index
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <div className="flex items-center">
          {record?.image && (
            <img
              src={`/${record.image}`}
              alt={text}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
          )}
          <span>{text}</span>
        </div>
      ),
    },
    // {
    //   title: "Category",
    //   dataIndex: "serviceName",
    //   key: "serviceName",
    // },
    // {
    //   title: "Price",
    //   dataIndex: "servicePrice",
    //   key: "servicePrice",
    // },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "joiningDate",
      render: (date) => (date ? dayjs(date).format("DD-MM-YYYY") : "-"),
    },
    {
      title: "Process",
      dataIndex: "process",
      key: "process",
      render: () => {
        return <div className="">User</div>;
      },
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

export default RecentUserTable;
