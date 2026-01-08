import { useState, useEffect } from "react";
import axios from "axios";
import ViewEarningModal from "../../UI/ViewEarningModal";
import WithdrawTable from "../../Tables/WithdrawTable";
import { DatePicker, Space } from "antd";

export default function Withdraw() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([null, null]);

  //* It's Use to Show Modal
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  //* It's Use to Set Seclected User to delete and view
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/withdrawData.json");

        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  // Filter data by selected date range
  //   const filteredData = data.filter((item) => {
  //     if (!dateRange[0] || !dateRange[1]) return true; // No filter applied

  //     const itemDate = new Date(item.timeAndDate);
  //     console.log(itemDate); // Parse the timeAndDate string into a Date object
  //     const startDate = dateRange[0].toDate(); // Convert moment object to Date
  //     const endDate = dateRange[1].toDate(); // Convert moment object to Date

  //     return itemDate >= startDate && itemDate <= endDate;
  //   });

  return (
    <div className="min-h-[90vh]">
      <div className="bg-[#FFFFFF] rounded">
        <div className="flex justify-between ">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-5">
            <h1 className="text-3xl font-bold text-secondary-color">
              Withdraw
            </h1>
            <div className="flex justify-between mt-5">
              <Space size={12}>
                <h3 className="text-secondary-color text-xl">From:</h3>
                <DatePicker
                  value={dateRange[0]}
                  onChange={(date) => handleDateChange([date, dateRange[1]])}
                  format="DD/MM/YYYY"
                />
                <h3 className="text-secondary-color text-xl">To:</h3>
                <DatePicker
                  value={dateRange[1]}
                  onChange={(date) => handleDateChange([dateRange[0], date])}
                  format="DD/MM/YYYY"
                />
              </Space>
            </div>
          </div>
        </div>
        <div className=" pt-6">
          <WithdrawTable
            data={data}
            loading={loading}
            showViewModal={showViewModal}
            pageSize={12}
          />
        </div>

        <ViewEarningModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
}
