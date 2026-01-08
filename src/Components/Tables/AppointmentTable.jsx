/* eslint-disable react/prop-types */
import { Table } from "antd";

const AppointmentTable = ({ data, loading, pageSize = 0 }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      responsive: ["md"],
    },
    {
      title: "Patient name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Appointment date & time",
      dataIndex: "appointmentDateTime",
      key: "appointmentDateTime",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Consultation type",
      dataIndex: "consultationType",
      key: "consultationType",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
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

export default AppointmentTable;
