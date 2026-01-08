import { useLocation } from "react-router-dom";
import { getImageUrl } from "../../../utils/baseUrl";

const ServiceDetails = () => {
  const location = useLocation();
  console.log("location", location);
  const service = location?.state || {};

  const imageUrl = getImageUrl();

  // if (isFetching) {
  //   return <div>Loading...</div>;
  // }
  // if (!service) {
  //   return <div>Service not found!</div>;
  // }
  console.log(service);
  return (
    <div className=" min-h-[90vh] mx-auto p-8 ">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-secondary-color">
          Service details
        </h2>
      </div>

      <div className="w-full sm:w-[80%] lg:w-[70%] xl:w-[60%]">
        {/* Image Section */}
        <div className="mb-6">
          <img
            src={`/${service?.serviceImage}`}
            alt="Brows and Lashes"
            height={100}
            width={100}
            className="h-[350px] w-[750px] rounded-lg object-cover"
          />
        </div>

        {/* Service Info Section */}
        <div className="mb-6">
          <h3 className="text-3xl font-semibold mb-4">
            {service?.serviceName}
          </h3>
          <p className="text-base-color text-lg mb-4">
            <span className="font-semibold">Details:</span>
            {service?.serviceDescription}
          </p>
          <p className="text-base-color text-lg  font-semibold">
            Price: <span className="text-xl">£{service?.servicePrice}</span>
          </p>
        </div>

        {/* Business Owner Info Section */}
        <div className="flex items-center space-x-4">
          {service?.businessUserId?.image && (
            <img
              src={`/${service?.businessUserId?.image}`}
              alt={service?.businessUserId?.fullName}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}

          <div>
            {service?.businessUserId?.fullName && (
              <h4 className="text-xl font-semibold">
                {service?.businessUserId?.fullName}
              </h4>
            )}
            {service?.businessUserId?.email && (
              <p className="text-gray-600">
                Email: {service?.businessUserId?.email}
              </p>
            )}
            {service?.businessUserId?.contactNumber && (
              <p className="text-gray-600">
                Contact number: {service?.businessUserId?.contactNumber}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
