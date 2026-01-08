import { useState, useEffect } from "react";
import EarningTable from "../../Tables/EarningTable";
import ViewEarningModal from "../../UI/ViewEarningModal";
import { LuArrowLeftRight } from "react-icons/lu";
import { useEarningsQuery } from "../../../Redux/api/earningApi";
import dayjs from "dayjs";

export default function Earning() {
  const {
    data: earningsData,
    isLoading: isFetching,
    // eslint-disable-next-line no-unused-vars
    error: fetchError,
  } = useEarningsQuery();
  const earnings = earningsData?.data?.result;

  console.log(earnings);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [todaysEarnings, setTodaysEarnings] = useState(0);
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    if (earnings?.length > 0) {
      const today = dayjs().format("YYYY-MM-DD");

      const total = earnings.reduce(
        (sum, record) => sum + (record.bookingprice || 0),
        0
      );

      const todayTotal = earnings
        .filter(
          (record) =>
            dayjs(record.transactionDate).format("YYYY-MM-DD") === today
        )
        .reduce((sum, record) => sum + (record.bookingprice || 0), 0);

      setTotalEarnings(total);
      setTodaysEarnings(todayTotal);
    }
  }, [earnings]);

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
  };

  return (
    <div className="min-h-[90vh]">
      <div className="bg-[#FFFFFF] rounded p-3">
        <div className="flex justify-between p-6">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-5">
            <h1 className="text-3xl font-bold text-secondary-color">Earning</h1>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-3 bg-secondary-color text-primary-color px-4 py-2 rounded">
                <LuArrowLeftRight />
                <h1>Today’s Earning</h1>
                <h1>£{todaysEarnings}</h1>
              </div>
              <div className="flex items-center gap-3 bg-secondary-color text-primary-color px-4 py-2 rounded">
                <LuArrowLeftRight />
                <h1>Total Earning</h1>
                <h1>£{totalEarnings}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 lg:px-6">
          <EarningTable
            data={earnings}
            loading={isFetching}
            showViewModal={showViewModal}
            pageSize={8}
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
