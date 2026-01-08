import { useState, useMemo } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import UsersTable from "../../Tables/UsersTable";
import DeleteUserModal from "../../UI/DeleteUserModal";
import ViewCustomerModal from "../../UI/ViewCustomerModal";
import { useAllUsersQuery } from "../../../Redux/api/userApi";

export default function AllUsers() {
  // eslint-disable-next-line no-unused-vars
  const { data: allUsers, loadingUser, refetch } = useAllUsersQuery();
  const userData = allUsers?.data;
  console.log(userData);
  //* Store Search Value
  const [searchText, setSearchText] = useState("");

  //* It's Use to Show Customer Modal
  const [isViewCustomer, setIsViewCustomer] = useState(false);

  //* It's Use to Show Delete Modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  //* It's Use to Set Seclected User to delete and view
  const [currentRecord, setCurrentRecord] = useState(null);

  const filteredData = useMemo(() => {
    if (!searchText) return userData;
    return userData.filter((item) =>
      item.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [userData, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const showCustomerViewModal = (record) => {
    console.log(record);
    setCurrentRecord(record);
    setIsViewCustomer(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = (data) => {
    // Handle delete action here
    console.log({ id: data?.id, data });
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsViewCustomer(false);
    setIsDeleteModalVisible(false);
  };

  // const handleBlock = (data) => {
  //   console.log("Blocked User:", { id: data?.id, data: data });
  //   setIsViewCustomer(false);
  //   setIsViewBusiness(false);
  // };

  return (
    <div className="min-h-[90vh]">
      <div className="bg-[#FFFFFF] rounded">
        <div className="flex justify-between p-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-secondary-color">
              User List
            </h1>
          </div>
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
        <div className="px-2 lg:px-6">
          <UsersTable
            data={filteredData}
            loading={loadingUser}
            showCustomerViewModal={showCustomerViewModal}
            showDeleteModal={showDeleteModal}
            pageSize={8}
          />
        </div>

        <ViewCustomerModal
          isViewCustomer={isViewCustomer}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          // handleBlock={handleBlock}
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
}
