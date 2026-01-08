import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import AppointmentTable from "../../Tables/AppointmentTable";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Appointment = () => {
  const [searchText, setSearchText] = useState("");
  //* Use to set user
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //* It's Use to Show Modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/appointmentData.json");

        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter((item) =>
      item.patientName?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  return (
    <div>
      {" "}
      <div className="min-h-[90vh]">
        <div className="bg-[#FFFFFF] rounded p-3">
          <div className=" p-6">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-3xl font-bold text-base-color">
                Appointment
              </h1>
              <div className="flex gap-4 items-center">
                <Input
                  placeholder="Search User..."
                  value={searchText}
                  onChange={(e) => onSearch(e.target.value)}
                  className="text-base font-semibold !border-input-color py-2"
                  prefix={
                    <SearchOutlined className="text-[#222222] font-bold text-lg mr-2" />
                  }
                />
              </div>
            </div>
          </div>
          <div className="px-2 lg:px-6">
            <AppointmentTable
              data={filteredData}
              loading={loading}
              pageSize={12}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
