import { ConfigProvider, Select } from "antd";
import Area_Chart from "../Chart/AreaChart";
import { Link } from "react-router-dom";

import { AllIcons } from "../../../public/images/AllImages";
import { useState } from "react";

import ViewUserModal from "../UI/ViewCustomerModal";
import DeleteUserModal from "../UI/DeleteUserModal";
import RecentUserTable from "../Tables/RecentUserTable";
import HourArea_Chart from "../Chart/HourAreaChart";
import IncomeBarChart from "../Chart/IncomeBarChart";
import { useAllCustomerQuery } from "../../Redux/api/dashboardApi";
import { useAllUsersQuery } from "../../Redux/api/userApi";

const Dashboard = () => {
  const { data: allCustomer } = useAllCustomerQuery();
  // eslint-disable-next-line no-unused-vars
  const { data: allUsers, loadingUser, refetch } = useAllUsersQuery();
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedHour, setSelectedHour] = useState("24hour");
  const [selectedDays, setSelectedDays] = useState("7day");

  const userData = allUsers?.data;
  console.log(userData);

  // console.log(allCustomer?.data);

  //* It's Use to Show Modal
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  //* It's Use to Show Delete Modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  //* It's Use to Set Seclected User to delete and view
  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = (data) => {
    // Handle delete action here
    console.log({ id: data?.id, userName: data?.userName });
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
  };

  const handleBlock = (data) => {
    console.log("Blocked User:", { id: data?.id, userName: data?.userName });
    setIsViewModalVisible(false);
  };

  return (
    <div className="w-full min-h-[90vh] px-1 sm:px-2 lg:px-2">
      <div>
        <div>
          {/* Card Items */}
          <div className="grid grid-cols-1 items-start lg:grid-cols-2 gap-5 mt-8 w-full">
            <div className="flex gap-5 flex-wrap rounded-lg bg-[#FE5C8E] border border-[#FE5C8E] py-2 px-1 lg:p-5 items-center  flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3 w-fit">
                  <img
                    src={AllIcons.groupsPerson}
                    className="h-10 w-10"
                    alt=""
                  />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-base xl:text-2xl text-primary-color mb-1">
                    Total customer
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                    {allCustomer?.data?.allCustomerCount}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-[#FEF2F5] border border-secondary-color py-2 px-1 xl:p-5 items-center  flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3  w-fit">
                  <img src={AllIcons.person} className="h-10 w-10" alt="" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-sm xl:text-2xl text-secondary-color mb-1">
                    Total Business
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-medium text-secondary-color">
                    {allCustomer?.data?.allBusinessCount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* graphs */}
          <div className="mt-8 w-full">
            <div
              className="w-full p-3 bg-[#FFFFFF] rounded-lg border border-input-color"
              //
            >
              <div className="flex justify-between text-base-color mt-4">
                <p className="text-2xl sm:text-3xl mb-5">Income</p>
                <div>
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          fontSize: 16,
                          colorBorder: "#222222",
                        },
                      },
                    }}
                  >
                    <Select
                      onChange={(value) => setSelectedYear(value)}
                      defaultValue="2026"
                      options={[
                        { value: "2025", label: "2025" },
                        { value: "2026", label: "2026" },
                        { value: "2027", label: "2027" },
                        { value: "2028", label: "2028" },
                        { value: "2029", label: "2029" },
                        { value: "2030", label: "2030" },
                        { value: "2031", label: "2031" },
                        { value: "2032", label: "2032" },
                        { value: "2033", label: "2033" },
                        { value: "2034", label: "2034" },
                        { value: "2035", label: "2035" },
                      ]}
                    />
                  </ConfigProvider>
                </div>
              </div>
              <div>
                <IncomeBarChart selectedYear={selectedYear} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start lg:grid-cols-2 gap-5 mt-8 w-full">
            <div
              className="w-full p-3 bg-[#FFFFFF] rounded-lg border border-input-color"
              //
            >
              <div className="flex justify-between text-base-color mt-4">
                <p className="text-2xl sm:text-3xl mb-5">Income</p>
                <div>
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          fontSize: 16,
                          colorBorder: "#222222",
                        },
                      },
                    }}
                  >
                    <Select
                      onChange={(value) => setSelectedDays(value)}
                      defaultValue="Last 7 days"
                      options={[{ value: "7day", label: "Last 7 days" }]}
                    />
                  </ConfigProvider>
                </div>
              </div>
              <div>
                <Area_Chart selectedDays={selectedDays} />
              </div>
            </div>

            <div
              className="w-full p-3 bg-[#FFFFFF] rounded-lg border border-input-color"
              //
            >
              <div className="flex justify-between text-base-color mt-4">
                <p className="text-2xl sm:text-3xl mb-5">Income</p>
                <div>
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          fontSize: 16,
                          colorBorder: "#222222",
                        },
                      },
                    }}
                  >
                    <Select
                      defaultValue="Last 24 Hours"
                      onChange={(value) => setSelectedHour(value)}
                      options={[
                        { value: "24hour", label: "Last 24 Hours" },
                        // { value: "12hour", label: "Last 12 Hours" },
                        // { value: "6hour", label: "Last 6 Hours" },
                      ]}
                    />
                  </ConfigProvider>
                </div>
              </div>
              <div>
                <HourArea_Chart selectedHour={selectedHour} />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mt-5">
            <div className="bg-[#FFFFFF] rounded flex-1 p-3">
              <div className="flex justify-between items-center mx-3 py-2">
                <p className="text-2xl font-semibold text-base-color">
                  Users
                </p>
                <div>
                  <Link to="/users">
                    <p className="bg-[#FEF2F5] border border-secondary-color text-[#FE5C8E] px-3 py-1 rounded-lg">
                      See All
                    </p>
                  </Link>
                </div>
              </div>
              <RecentUserTable
                data={userData}
                loading={loadingUser}
                showViewModal={showViewModal}
                showDeleteModal={showDeleteModal}
              />
            </div>
          </div>
        </div>
        <ViewUserModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleBlock={handleBlock}
        />
        <DeleteUserModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default Dashboard;
