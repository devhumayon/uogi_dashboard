import { useState, useEffect } from "react";
import axios from "axios";
import PolicyScreenTable from "../../Tables/PolicyScreenTable";
import PolicyScreenModal from "../../UI/PolicyScreenModal";

export default function PolicyScreen() {
  //* Use to set user
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //* It's Use to Show Modal
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  //* It's Use to Set Seclected User to delete and view
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/policyScreen.json");
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
    console.log(record);
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setCurrentRecord(null);
    setIsViewModalVisible(false);
  };

  return (
    <div className="min-h-[90vh]">
      <div className="bg-[#FFFFFF] rounded">
        <div className="flex justify-between ">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-5">
            <h1 className="text-3xl font-bold text-secondary-color">
              Policy Screen
            </h1>
          </div>
        </div>

        {/* Date Filter */}

        <div className="pt-6">
          <PolicyScreenTable
            data={data} // Pass the filtered data
            loading={loading}
            showViewModal={showViewModal}
            pageSize={12}
          />
        </div>

        <PolicyScreenModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
}
