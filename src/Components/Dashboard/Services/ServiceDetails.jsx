import { useLocation, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../../utils/baseUrl";
import {
  FaArrowLeft,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaTag,
  FaCalendar,
  FaStar,
  FaCheck,
  FaShieldAlt,
  FaCreditCard,
} from "react-icons/fa";

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location?.state || {};

  const imageUrl = getImageUrl();

  // Mock data for features (you can replace with actual data)
  const features = [
    {
      icon: <FaClock />,
      text: `${service?.businessDuration || 60} min service`,
    },
    { icon: <FaShieldAlt />, text: "Hygiene Certified" },
    { icon: <FaCheck />, text: "Premium Quality" },
    {
      icon: <FaCreditCard />,
      text: `${
        service?.dipositAmount
          ? `Deposit: £${service.dipositAmount}`
          : "Flexible Payment"
      }`,
    },
  ];

  // Mock reviews (you can replace with actual data)
  const reviews = [
    {
      name: "Alex Morgan",
      rating: 5,
      comment: "Excellent service! Very professional and friendly.",
    },
    {
      name: "Taylor Swift",
      rating: 4,
      comment: "Great experience, will definitely come back.",
    },
    {
      name: "Chris Evans",
      rating: 5,
      comment: "Top-notch quality and service.",
    },
  ];

  const handleBookNow = () => {
    // Add booking logic here
    console.log("Booking service:", service?.serviceName);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  console.log(service);

  if (!service || Object.keys(service).length === 0) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#FE5C8E] mb-4">
            Service Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The service details are not available.
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-gradient-to-r bg-[#FEF2F5] text-[#FE5C8E] rounded-lg  transition-all duration-300 flex items-center gap-2"
          >
            <FaArrowLeft /> Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] mx-auto p-4 md:p-8 max-w-7xl">
      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="mb-6 px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2 group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Back to Services</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:w-2/3">
          {/* Service Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-[#FEF2F5] text-[#FE5C8E] rounded-full text-sm font-medium">
                {service?.categoryName}
              </span>
              <span className="px-3 py-1 bg-[#FEF2F5] text-[#FE5C8E] rounded-full text-sm font-medium">
                {service?.subCategoryName}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {service?.serviceName}
            </h1>
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <FaClock className="text-[#FE5C8E]" />
                <span>{service?.businessDuration || 60} minutes</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="text-[#FE5C8E]" />
                ))}
                <span className="ml-1">(4.9)</span>
              </div>
            </div>
          </div>

          {/* Service Image with Gradient Overlay */}
          <div className="mb-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
            <img
              src={service?.serviceImage}
              alt={service?.serviceName}
              className="h-[400px] w-full rounded-2xl object-cover shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          {/* Service Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaTag className="text-[#FE5C8E]" />
              Service Details
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-200">
              {service?.serviceDescription}
            </p>
          </div>

          {/* Features Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What's Included
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg">
                    <div className="text-[#FE5C8E]">{feature.icon}</div>
                  </div>
                  <span className="text-gray-700 font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          {/* <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Customer Reviews
            </h2>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <FaUser className="text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {review.name}
                        </h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/* Right Column - Booking Card & Provider Info */}
        <div className="lg:w-1/3">
          {/* Sticky Booking Card */}
          <div className="sticky top-8">
            {/* Price Card */}
            <div className="bg-gradient-to-br bg-[#FEF2F5] text-[#FE5C8E] rounded-2xl p-6 mb-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-medium">Starting from</p>
                  <p className="text-4xl font-bold">£{service?.servicePrice}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium">Deposit</p>
                  <p className="text-2xl font-bold">
                    £{service?.dipositAmount || "0"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleBookNow}
                className="w-full py-4 bg-[#FE5C8E] text-[#FEF2F5] font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                Thanks
              </button>
              <p className="text-center mt-4 text-purple-100 text-sm">
                Secure booking with instant confirmation
              </p>
            </div>

            {/* Business Owner Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaUser className="text-[#FE5C8E]" />
                Service Provider
              </h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={
                      service?.businessUserId?.image || "/default-avatar.png"
                    }
                    alt={service?.businessUserId?.fullName}
                    className="w-20 h-20 rounded-full object-cover border-4 border-purple-100"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#FE5C8E] rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {service?.businessUserId?.fullName ||
                      "Professional Provider"}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <FaStar className="text-[#FE5C8E]" />
                    <span className="text-gray-600">4.9 (128 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                {service?.businessUserId?.email && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FaEnvelope className="text-[#FE5C8E]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">
                        {service.businessUserId.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* {service?.businessUserId?.contactNumber && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FaPhone className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="font-medium text-gray-900">
                        {service.businessUserId.contactNumber}
                      </p>
                    </div>
                  </div>
                )} */}
              </div>

              {/* Additional Info */}
              {/* <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Business Information
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <FaCalendar className="text-purple-500" />
                    <span>Available: Mon-Sun, 9AM-8PM</span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <FaShieldAlt className="text-purple-500" />
                    <span>Licensed & Insured</span>
                  </p>
                </div>
              </div> */}
            </div>

            {/* Safety Guidelines */}
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FaShieldAlt className="text-[#FE5C8E]" />
                Safety Guidelines
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-[#FE5C8E] rounded-full mt-2"></div>
                  <span>All tools are sterilized and sanitized</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-[#FE5C8E] rounded-full mt-2"></div>
                  <span>Single-use items are disposed after each service</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-[#FE5C8E] rounded-full mt-2"></div>
                  <span>Hygiene certified professionals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
