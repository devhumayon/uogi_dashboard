import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useAllServicesByBusinessIdQuery } from "../../../Redux/api/serviceApi";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../../utils/baseUrl";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaStar, FaTag } from "react-icons/fa";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { TbCategoryFilled } from "react-icons/tb";
import Swal from "sweetalert2"; 

const BusinessDetails = () => {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const businessData = location.state?.businessData;
  console.log('businessData._id', businessData._id);
  

  const imageUrl = getImageUrl();

  const {
    data: allServices,
    isLoading: isFetching,
    error: fetchError,
  } = useAllServicesByBusinessIdQuery(businessData?._id);
  const servicesData = allServices?.data;
  console.log("servicesData", servicesData);

  useEffect(() => {
    console.log("API Response:", allServices);
    if (Array.isArray(servicesData) && servicesData.length > 0) {
      setServices(servicesData);
    }
  }, [servicesData]);

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (fetchError) {
    return <div>Error: {fetchError.message}</div>;
  }

  const showContactNumber =(email)=>{

    Swal.fire({
      title: `Email: ${email}`,
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      // denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Thanks!",);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    
  }

  console.log('businessData=====***', businessData);
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-2">
          <Link
            to="/business"
            className="flex items-center text-secondary-color hover:text-primary-color transition-colors duration-300"
          >
            <MdOutlineArrowBackIosNew className="text-xl sm:text-2xl lg:text-3xl mr-2" />
            <span className="text-lg font-medium">Back to Business</span>
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-color mb-2">
          Business Details
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full mb-8"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Business Details */}
          <div className="lg:w-2/3">
            {/* Business Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100 mb-8">
              {/* Business Header with Images */}
              <div className="relative">
                {businessData ? (
                  <div className="flex overflow-x-auto scrollbar-hide">
                    {businessData?.businessImage.map((image, index) => (
                      <div key={index} className="flex-shrink-0 w-[500px]">
                        <img
                          src={image}
                          alt={`Business ${index + 1}`}
                          className="w-full h-64 md:h-80 object-cover p-2 rounded-2xl "
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <img
                    src={
                      businessImages[0] ||
                      business?.image ||
                      "/uploads/profile/default-user.jpg"
                    }
                    alt="Business"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                )}

                {/* Business Rating Badge */}
                {/* {businessData?.ratings && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center shadow-lg">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span className="font-bold text-gray-800">
                      {businessData?.ratings.toFixed(1)}
                    </span>
                    <span className="text-gray-500 ml-1">
                      ({businessData?.reviewCount || 0})
                    </span>
                  </div>
                )} */}
              </div>

              {/* Business Info */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={
                          businessData?.businessId?.image ||
                          "/uploads/profile/default-user.jpg"
                        }
                        alt={businessData?.businessId?.fullName}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Verified
                      </div>
                    </div>
                  </div>

                  {/* Business Details */}
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                          {businessData?.businessId?.fullName}
                        </h2>
                        <p className="text-lg text-gray-600 mb-2">
                          {businessData.businessName}
                        </p>

                        {/* Business Type Tags */}
                        {businessData.businessType &&
                          businessData.businessType.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {businessData.businessType.map((type, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                                >
                                  {type}
                                </span>
                              ))}
                            </div>
                          )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4 md:mt-0">
                        <button
                          onClick={() =>
                            showContactNumber(businessData.businessId.email)
                          }
                          className="px-4 py-2 bg-secondary-color text-white rounded-lg hover:bg-[#FE5C8E] transition-colors duration-300 font-medium"
                        >
                          Contact
                        </button>
                        {/* <button className="px-4 py-2 border border-secondary-color text-secondary-color rounded-lg hover:bg-pink-50 transition-colors duration-300 font-medium">
                          Share
                        </button> */}
                      </div>
                    </div>

                    {/* Business Description */}
                    {businessData.businessDescription && (
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          About
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {businessData.businessDescription}
                        </p>
                      </div>
                    )}

                    {/* Contact Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {businessData?.businessId?.email && (
                        <div className="flex items-center p-3 bg-pink-50 rounded-xl">
                          <div className="p-2 bg-white rounded-lg mr-3">
                            <FaEnvelope className="text-pink-500" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-900">
                              {businessData?.businessId?.email}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* {business?.contactNumber && (
                        <div className="flex items-center p-3 bg-pink-50 rounded-xl">
                          <div className="p-2 bg-white rounded-lg mr-3">
                            <FaPhone className="text-pink-500" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Contact Number</p>
                            <p className="font-medium text-gray-900">{business.contactNumber}</p>
                          </div>
                        </div>
                      )} */}

                      {businessData.businessLocation && (
                        <div className="flex items-center p-3 bg-pink-50 rounded-xl">
                          <div className="p-2 bg-white rounded-lg mr-3">
                            <FaMapMarkerAlt className="text-pink-500" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium text-gray-900">
                              {businessData.businessLocation}
                            </p>
                          </div>
                        </div>
                      )}

                      {businessData.paymentMethod && (
                        <div className="flex items-center p-3 bg-pink-50 rounded-xl">
                          <div className="p-2 bg-white rounded-lg mr-3">
                            <RiMoneyPoundCircleFill className="text-pink-500" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Payment Method
                            </p>
                            <p className="font-medium text-gray-900">
                              {businessData.paymentMethod}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* {businessData?.licenseId && (
                        <div className="flex items-center p-3 bg-pink-50 rounded-xl">
                          <div className="p-2 bg-white rounded-lg mr-3">
                            <FaIdCard className="text-pink-500" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">License ID</p>
                            <p className="font-medium text-gray-900">{business.licenseId}</p>
                          </div>
                        </div>
                      )} */}

                      {businessData?.addressLine1 ||
                        (businessData?.addressLine2 && (
                          <div className="flex items-center p-3 bg-pink-50 rounded-xl">
                            <div className="p-2 bg-white rounded-lg mr-3">
                              <FaMapMarkerAlt className="text-pink-500" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Address</p>
                              <p className="font-medium text-gray-900">
                                {businessData.addressLine1 ||
                                  businessData.addressLine2 ||
                                  "N/A"}
                                , {businessData.townCity || "N/A"}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Days & Time */}
            {businessData.availableDaysTime &&
              businessData.availableDaysTime.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100 p-6 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FaClock className="mr-3 text-pink-500" />
                    Business Hours
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {businessData.availableDaysTime.map((dayTime, index) => (
                      <div
                        key={dayTime._id}
                        className="p-4 bg-gray-50 rounded-xl hover:bg-pink-50 transition-colors duration-300"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-800">
                            {dayTime.day}
                          </span>
                          <span className="text-sm px-2 py-1 bg-pink-100 text-pink-700 rounded-full">
                            Open
                          </span>
                        </div>
                        <div className="text-gray-600">
                          <span className="font-medium">
                            {dayTime.startTime}
                          </span>
                          <span className="mx-2">-</span>
                          <span className="font-medium">{dayTime.endTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional Timing Info */}
                  {(businessData.specifigStartTime ||
                    businessData.launchbreakStartTime) && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Additional Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {businessData.specifigStartTime && (
                          <div className="text-gray-600">
                            <span className="font-medium">
                              Specific Date Hours:
                            </span>
                            <span className="ml-2">
                              {businessData.specifigStartTime} -{" "}
                              {businessData.specifigEndTime}
                            </span>
                          </div>
                        )}
                        
                        <div className="text-gray-600">
                          <span className="font-medium">Lunch Break:</span>
                          <span className="ml-2">
                            {businessData.launchbreakStartTime || "00:00"} -{" "}
                            {businessData.launchbreakEndTime || "00:00"}
                          </span>
                        </div>
                        {businessData.bookingBreak && (
                          <div className="text-gray-600">
                            <span className="font-medium">Booking Break:</span>
                            <span className="ml-2">
                              {businessData.bookingBreak} minutes
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
          </div>

          {/* Right Column: Stats & Quick Info */}
          <div className="lg:w-1/3">
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Business Stats
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 hover:bg-pink-50 rounded-lg transition-colors duration-300">
                  <div className="flex items-center">
                    <div className="p-2 bg-pink-100 rounded-lg mr-3">
                      <TbCategoryFilled className="text-pink-600" />
                    </div>
                    <span className="text-gray-700">Total Services</span>
                  </div>
                  <span className="text-2xl font-bold text-secondary-color">
                    {services.length}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 hover:bg-pink-50 rounded-lg transition-colors duration-300">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                      <FaStar className="text-yellow-600" />
                    </div>
                    <span className="text-gray-700">Average Rating</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">
                    {businessData.ratings.toFixed(1)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 hover:bg-pink-50 rounded-lg transition-colors duration-300">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <FaClock className="text-blue-600" />
                    </div>
                    <span className="text-gray-700">Response Time</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">24h</span>
                </div>

                <div className="flex justify-between items-center p-3 hover:bg-pink-50 rounded-lg transition-colors duration-300">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg mr-3">
                      <FaTag className="text-green-600" />
                    </div>
                    <span className="text-gray-700">Business Type</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">
                    {businessData.businessType?.length || 0}
                  </span>
                </div>
              </div>

              {/* Location Map Preview (Optional) */}
              {businessData.latitude && businessData.longitude && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Location
                  </h4>
                  <div className="h-40 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <FaMapMarkerAlt className="text-3xl mx-auto mb-2 text-pink-500" />
                      <p>Map View Available</p>
                      <p className="text-sm">
                        {businessData.townCity}, {businessData.country}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gradient-to-br from-pink-500 to-secondary-color rounded-2xl shadow-xl overflow-hidden p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center justify-center font-medium">
                  Book Appointment
                </button>
                <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center justify-center font-medium">
                  View All Reviews
                </button>
                <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center justify-center font-medium">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-color mb-2">
                All Services
              </h2>
              <p className="text-gray-600">
                Discover <span className="font-bold">{services.length}</span>{" "}
                amazing services offered by{" "}
                <span className="font-bold">
                  {businessData?.businessId.fullName}
                </span>
              </p>
            </div>

            {/* <div className="mt-4 md:mt-0">
              <button className="px-6 py-3 bg-secondary-color text-white rounded-xl hover:bg-primary-color transition-colors duration-300 font-medium shadow-lg hover:shadow-xl">
                Filter Services
              </button>
            </div> */}
          </div>

          {/* Services Grid */}
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service._id}
                  to={`/services/${service._id}`}
                  state={service}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-pink-100">
                    {/* Service Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={service?.serviceImage}
                        alt={service.serviceName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-pink-500 text-white text-sm font-bold rounded-full">
                          {service.categoryName}
                        </span>
                      </div>

                      {/* Price Tag */}
                      <div className="absolute bottom-4 right-4">
                        <div className="px-4 py-2 bg-white rounded-xl shadow-lg">
                          <span className="text-2xl font-bold text-secondary-color">
                            £{service.servicePrice}
                          </span>
                          {/* <span className="text-gray-500 text-sm block">
                            Starting from
                          </span> */}
                        </div>
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-secondary-color transition-colors duration-300">
                        {service.serviceName}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {service.serviceDescription ||
                          "Professional service with excellent quality"}
                      </p>

                      {/* Service Meta */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border-2 border-white shadow">
                            <img
                              src={
                                service?.businessUserId?.image ||
                                "/uploads/profile/default-user.jpg"
                              }
                              alt="Provider"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-gray-700 font-medium">
                            {service?.businessUserId?.fullName}
                          </span>
                        </div>

                        <div className="text-[#FE5C8E] flex items-center">
                          <FaClock className="mr-1" />
                          <span>{service.businessDuration || 60} min (duration)</span>
                        </div>
                      </div>

                      {/* Subcategory */}
                      {service.subCategoryName && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <span className="text-sm font-medium text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
                            {service.subCategoryName}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gradient-to-r from-pink-50 to-white rounded-2xl border-2 border-dashed border-pink-200">
              <div className="text-6xl text-pink-300 mb-4">💇‍♀️</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No Services Available
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This business hasn't added any services yet. Check back later!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
