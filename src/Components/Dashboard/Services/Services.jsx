import { useState } from "react";
import { Link } from "react-router-dom";
import { ConfigProvider, Select } from "antd";
import { useAllServicesQuery } from "../../../Redux/api/serviceApi";
import { getImageUrl } from "../../../utils/baseUrl";
import { useAllCategoryQuery } from "../../../Redux/api/categoryApi";

const Services = () => {
  const {
    data: allServices,
    isLoading: isFetching,
    error: fetchError,
  } = useAllServicesQuery();
  const servicesData = allServices?.data?.result;
  console.log(servicesData);
  const {
    data: allCategories,
    isLoading: fetchingCategories,
    error: categoryError,
  } = useAllCategoryQuery();
  const categoriesData = allCategories?.data;
  console.log("categoriesData", categoriesData);

  const [selectedCategory, setSelectedCategory] = useState("");

  const imageUrl = getImageUrl();

  // Filtered services based on selected category
  const filteredServices = selectedCategory
    ? servicesData.filter(
        (service) => service.categoryName === selectedCategory
      )
    : servicesData;

  if (isFetching || fetchingCategories) {
    return <div>Loading...</div>;
  }
  if (fetchError || categoryError) {
    return <div>Error: {fetchError.message}</div>;
  }

  return (
    <div className="min-h-[90vh]">
      <div className="bg-[#FFFFFF] rounded p-3">
        <div className="flex justify-between p-6">
          <div className="flex flex-col items-center justify-between w-full gap-5 md:flex-row">
            <h1 className="text-3xl font-bold text-secondary-color">
              All Services
            </h1>
            <div>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      fontSize: 16,
                      colorBorder: "#FCC1BE",
                    },
                  },
                }}
              >
                <label className="mr-2 text-xl font-bold text-secondary-color">
                  Category
                </label>
                <Select
                  value={selectedCategory}
                  onChange={(value) => setSelectedCategory(value)}
                  placeholder="Select Category"
                  className="w-[200px] !ring-[#FCC1BE] "
                >
                  <Select.Option value="">All Categories</Select.Option>
                  {categoriesData.map((category, index) => (
                    <Select.Option key={index} value={category.name}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </ConfigProvider>
            </div>
          </div>
        </div>

        <div className="px-2 lg:px-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-4">
            {filteredServices.map((service, index) => (
              <Link
                key={index}
                to={`/services/${service?._id}`}
                state={service}
                className="hover:text-base-color"
              >
                <div className="flex flex-col gap-2 bg-[#FEF2F5] border border-[#FEF2F5] px-4 py-3 rounded-md">
                  <div className="relative rounded-md">
                    <img
                      src={`/${service?.serviceImage}`}
                      alt="service"
                      className="w-full h-[180px] sm:h-[200px] object-cover rounded-md"
                    />
                    <div className="w-full bg-[#18191B88] h-full absolute top-0 left-0 flex items-end rounded-md">
                      <h1 className="text-[#FFEBF1] text-xl md:text-3xl p-3">
                        {service?.serviceName}
                      </h1>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mt-3">
                      <img
                        src={`/${service?.businessUserId?.image}`}
                        className="w-6 h-6 rounded-full lg:h-8 lg:w-8"
                        alt="business"
                      />
                      <h1 className="text-xl font-medium">
                        {service?.businessUserId?.fullName}
                      </h1>
                    </div>
                    <p className="mt-1 text-lg">
                      Price: <span>£{service?.servicePrice}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
