// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { ConfigProvider, Select } from "antd";
// import { useAllServicesQuery } from "../../../Redux/api/serviceApi";
// import { getImageUrl } from "../../../utils/baseUrl";
// import { useAllCategoryQuery } from "../../../Redux/api/categoryApi";

// const Services = () => {
//   const {
//     data: allServices,
//     isLoading: isFetching,
//     error: fetchError,
//   } = useAllServicesQuery();
//   const servicesData = allServices?.data?.result;
//   console.log(servicesData);
//   const {
//     data: allCategories,
//     isLoading: fetchingCategories,
//     error: categoryError,
//   } = useAllCategoryQuery();
//   const categoriesData = allCategories?.data;
//   console.log("categoriesData", categoriesData);

//   const [selectedCategory, setSelectedCategory] = useState("");

//   const imageUrl = getImageUrl();

//   // Filtered services based on selected category
//   const filteredServices = selectedCategory
//     ? servicesData.filter(
//         (service) => service.categoryName === selectedCategory
//       )
//     : servicesData;

//   if (isFetching || fetchingCategories) {
//     return <div>Loading...</div>;
//   }
//   if (fetchError || categoryError) {
//     return <div>Error: {fetchError.message}</div>;
//   }

//   return (
//     <div className="min-h-[90vh]">
//       <div className="bg-[#FFFFFF] rounded p-3">
//         <div className="flex justify-between p-6">
//           <div className="flex flex-col items-center justify-between w-full gap-5 md:flex-row">
//             <h1 className="text-3xl font-bold text-secondary-color">
//               All Services
//             </h1>
//             <div>
//               <ConfigProvider
//                 theme={{
//                   components: {
//                     Select: {
//                       fontSize: 16,
//                       colorBorder: "#FCC1BE",
//                     },
//                   },
//                 }}
//               >
//                 <label className="mr-2 text-xl font-bold text-secondary-color">
//                   Category
//                 </label>
//                 <Select
//                   value={selectedCategory}
//                   onChange={(value) => setSelectedCategory(value)}
//                   placeholder="Select Category"
//                   className="w-[150px] !ring-[#FCC1BE] "
//                 >
//                   <Select.Option value="">All Categories</Select.Option>
//                   {categoriesData.map((category, index) => (
//                     <Select.Option key={index} value={category.name}>
//                       {category.name}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </ConfigProvider>
//             </div>
//           </div>
//         </div>

//         <div className="px-2 lg:px-6">
//           <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-4">
//             {filteredServices.map((service, index) => (
//               <Link
//                 key={index}
//                 to={`/services/${service?._id}`}
//                 state={service}
//                 className="hover:text-base-color"
//               >
//                 <div className="flex flex-col gap-2 bg-[#FEF2F5] border border-[#FEF2F5] px-4 py-3 rounded-md">
//                   <div className="relative rounded-md">
//                     <img
//                       src={`/${service?.serviceImage}`}
//                       alt="service"
//                       className="w-full h-[180px] sm:h-[200px] object-cover rounded-md"
//                     />
//                     <div className="w-full bg-[#18191B88] h-full absolute top-0 left-0 flex items-end rounded-md">
//                       <h1 className="text-[#FFEBF1] text-xl md:text-3xl p-3">
//                         {service?.serviceName}
//                       </h1>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="flex items-center gap-2 mt-3">
//                       <img
//                         src={`/${service?.businessUserId?.image}`}
//                         className="w-6 h-6 rounded-full lg:h-8 lg:w-8"
//                         alt="business"
//                       />
//                       <h1 className="text-xl font-medium">
//                         {service?.businessUserId?.fullName}
//                       </h1>
//                     </div>
//                     <p className="mt-1 text-lg">
//                       Price: <span>£{service?.servicePrice}</span>
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;

import { useState } from "react";
import { Link } from "react-router-dom";
import { ConfigProvider, Select, Skeleton, Input, Badge, Slider } from "antd";
import { useAllServicesQuery } from "../../../Redux/api/serviceApi";
import { useAllCategoryQuery } from "../../../Redux/api/categoryApi";
import {
  FaSearch,
  FaFilter,
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaSortAmountDown,
  FaSortAmountUp,
  FaUser,
  FaTag,
} from "react-icons/fa";
import { TbHeart, TbHeartFilled } from "react-icons/tb";

const Services = () => {
  const {
    data: allServices,
    isLoading: isFetching,
    error: fetchError,
  } = useAllServicesQuery();
  const servicesData = allServices?.data?.result || [];
  
  const {
    data: allCategories,
    isLoading: fetchingCategories,
    error: categoryError,
  } = useAllCategoryQuery();
  const categoriesData = allCategories?.data || [];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("featured");
  const [favorites, setFavorites] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Filtered and sorted services
  const filteredServices = servicesData
    .filter((service) => {
      const matchesCategory = !selectedCategory || service?.categoryName === selectedCategory;
      const matchesSearch = !searchTerm || 
        service?.serviceName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        service?.categoryName?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesPrice = service?.servicePrice >= priceRange[0] && 
                          service?.servicePrice <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case "price-low":
          return a.servicePrice - b.servicePrice;
        case "price-high":
          return b.servicePrice - a.servicePrice;
        case "name":
          return a.serviceName?.localeCompare(b.serviceName);
        default:
          return 0;
      }
    });

  const toggleFavorite = (serviceId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => 
      prev?.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  if (isFetching || fetchingCategories) {
    return <LoadingSkeleton />;
  }

  if (fetchError || categoryError) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Unable to load services
          </h2>
          <p className="text-gray-600 mb-6">
            Please check your connection and try again
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-[#FEF2F5] to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r bg-[#FEF2F5] text-[#FE5C8E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Premium Services
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Book professional services from trusted providers in your area
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Search Input */}
            <div className="relative">
              <div className="flex justify-start items-center">
                <span className="mb-1 text-lg">
                  <FaSearch className="left-4  transform  text-[#FE5C8E] font-bold text-lg inline-block " />{" "}
                  Search
                </span>
              </div>

              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 rounded-xl border-gray-300 hover:border-purple-400 focus:border-purple-500"
                size="large"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaFilter className="inline mr-2 text-[#FE5C8E]" />
                Category
              </label>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      controlHeight: 48,
                      borderRadius: 12,
                      colorBorder: "#E5E7EB",
                      colorPrimaryHover: "#8B5CF6",
                    },
                  },
                }}
              >
                <Select
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  placeholder="All Categories"
                  className="w-full rounded-xl"
                  suffixIcon={<FaTag className="text-[#FE5C8E]" />}
                  options={[
                    { value: "", label: "All Categories" },
                    ...categoriesData.map((category) => ({
                      value: category.name,
                      label: category.name,
                    })),
                  ]}
                />
              </ConfigProvider>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaSortAmountDown className="inline mr-2 text-[#FE5C8E]" />
                Sort By
              </label>
              <Select
                value={sortOrder}
                onChange={setSortOrder}
                className="w-full rounded-xl h-12"
                suffixIcon={
                  sortOrder.includes("high") ? (
                    <FaSortAmountUp className="text-[#FE5C8E]" />
                  ) : (
                    <FaSortAmountDown className="text-[#FE5C8E]" />
                  )
                }
                options={[
                  { value: "featured", label: "Featured" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                  { value: "name", label: "Name: A to Z" },
                ]}
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: £{priceRange[0]} - £{priceRange[1]}
              </label>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#FE5C8E",
                    controlHeight: 40,
                  },
                }}
              >
                <Slider
                  range
                  min={0}
                  max={1000}
                  value={priceRange}
                  onChange={setPriceRange}
                  className="custom-range-slider"
                />
              </ConfigProvider>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory ||
            searchTerm ||
            priceRange[0] > 0 ||
            priceRange[1] < 1000) && (
            <div className="flex flex-wrap gap-2">
              {selectedCategory && (
                <Badge
                  count={
                    <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-[#FE5C8E] rounded-full text-sm">
                      Category: {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory("")}
                        className="ml-1 text-[#FE5C8E] hover:text-[#FE5C8E]"
                      >
                        ×
                      </button>
                    </div>
                  }
                />
              )}
              {/* {searchTerm && (
                <Badge
                  count={
                    <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      Search: {searchTerm}
                      <button
                        onClick={() => setSearchTerm("")}
                        className="ml-1 text-blue-500 hover:text-blue-700"
                      >
                        ×
                      </button>
                    </div>
                  }
                />
              )} */}
              {/* {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                <Badge
                  count={
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Price: £{priceRange[0]} - £{priceRange[1]}
                      <button
                        onClick={() => setPriceRange([0, 1000])}
                        className="ml-1 text-green-500 hover:text-green-700"
                      >
                        ×
                      </button>
                    </div>
                  }
                />
              )} */}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Available Services
            <span className="ml-2 text-[#FE5C8E]">
              ({filteredServices?.length || 0} found)
            </span>
          </h2>
        </div>

        {/* Services Grid */}
        {!filteredServices?.length ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No services found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                setSelectedCategory("");
                setSearchTerm("");
                setPriceRange([0, 1000]);
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={service._id}
                service={service}
                index={index}
                isFavorite={favorites?.includes(service._id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#FE5C8E] mb-2">
                {servicesData.length}+
              </div>
              <div className="text-gray-600">Services Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FE5C8E] mb-2">
                {categoriesData.length}
              </div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FE5C8E] mb-2">4.9★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FE5C8E] mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ service, index, isFavorite, onToggleFavorite }) => {
  return (
    <Link
      to={`/services/${service?._id}`}
      state={service}
      className="group block"
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-purple-300 transform hover:-translate-y-1 h-full">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={service?.serviceImage || "/placeholder-service.jpg"}
            alt={service?.serviceName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Favorite Button */}
          <button
            onClick={(e) => onToggleFavorite(service._id, e)}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300"
          >
            {isFavorite ? (
              <TbHeartFilled className="text-[#FE5C8E] text-xl" />
            ) : (
              <TbHeart className="text-[#FE5C8E] text-xl" />
            )}
          </button>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gradient-to-r text-[#FE5C8E] bg-[#FEF2F5] text-sm font-medium rounded-full">
              {service?.categoryName}
            </span>
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-4 left-4">
            <div className="px-4 py-2 bg-white rounded-lg shadow-lg">
              <span className="text-2xl font-bold text-[#FE5C8E]">
                £{service?.servicePrice}
              </span>
              {/* <span className="text-sm text-gray-500 ml-1">/session</span> */}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Service Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#FE5C8E] transition-colors duration-300">
            {service?.serviceName}
          </h3>

          {/* Service Description */}
          <p className="text-gray-600 mb-4 line-clamp-2">
            {service?.serviceDescription ||
              "Professional service with premium quality"}
          </p>

          {/* Service Details */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <FaClock className="text-[#FE5C8E]" />
              <span className="text-sm">
                {service?.businessDuration || 60} minutes
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaStar className="text-[#FE5C8E]" />
              <span className="text-sm">4.9 (128 reviews)</span>
            </div>
          </div>

          {/* Provider Info */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <div className="relative">
              <img
                src={service?.businessUserId?.image || "/default-avatar.png"}
                alt={service?.businessUserId?.fullName}
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-100"
              />
              {/* <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div> */}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm">
                {service?.businessUserId?.fullName}
              </h4>
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-gray-400 text-xs" />
                <span className="text-xs text-gray-500">London, UK</span>
              </div>
            </div>
            <div className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
              PRO
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="min-h-[90vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="mb-8">
      <Skeleton.Input active size="large" className="w-64 mb-4" />
      <Skeleton paragraph={{ rows: 1 }} className="w-96" />
    </div>
    
    {/* Filter Skeletons */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton.Input key={i} active className="w-full h-12" />
      ))}
    </div>
    
    {/* Service Cards Skeletons */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-2xl shadow-lg p-4">
          <Skeleton.Image active className="w-full h-48 mb-4 rounded-xl" />
          <Skeleton active paragraph={{ rows: 2 }} />
          <Skeleton active paragraph={{ rows: 1 }} className="w-32" />
        </div>
      ))}
    </div>
  </div>
);

export default Services;