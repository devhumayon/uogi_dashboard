import { SearchOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import { useMemo, useState } from "react";
import BusinessTable from "../../Tables/BusinessTable";
import { useAllBusinessQuery } from "../../../Redux/api/businessApi";

const Business = () => {
  const {
    data: allBusiness,
    isLoading: isFetching,
    // eslint-disable-next-line no-unused-vars
    error: fetchError,
  } = useAllBusinessQuery();

  const businessData = allBusiness?.data;
  console.log(businessData);
  //* Store Search Value
  const [searchText, setSearchText] = useState("");

  //* Use to set user
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  const filteredData = useMemo(() => {
    if (!searchText) return businessData;
    return businessData.filter((item) =>
      item.businessName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [businessData, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading businessData..." />
      </div>
    );
  }

  // Show error message if fetch fails
  if (fetchError) {
    return (
      <div className="text-white">
        Error loading aboutUs. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-[90vh]">
      <div className="bg-[#FFFFFF] rounded">
        <div className="flex justify-between p-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-secondary-color">
              Business List
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
          <BusinessTable
            data={filteredData}
            loading={isFetching}
            pageSize={8}
          />
        </div>
      </div>
    </div>
  );
};

export default Business;
