/* eslint-disable react/prop-types */
import { Modal } from "antd";
import dayjs from "dayjs";
import { getImageUrl } from "../../utils/baseUrl";

const ViewCustomerModal = ({
  isViewCustomer,
  handleCancel,
  currentRecord,
  // handleBlock,
}) => {
  const imageUrl = getImageUrl();

  return (
    <Modal
      title={
        <div className="pt-7">
          <h2 className="text-secondary-color text-4xl ">User Details</h2>
        </div>
      }
      open={isViewCustomer}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:min-w-[800px]"
    >
      <div className="p-10">
        <div className="">
          <div className="flex justify-center items-center p-4 border-b">
            {/* Avatar */}
            {currentRecord?.image && (
              <img
                src={`/${currentRecord.image}`}
                alt={currentRecord?.fullName}
                className="w-14 h-14 sm:w-20  sm:h-20 rounded-lg mr-4"
              />
            )}
            <div className="text-xl sm:text-3xl font-bold">
              {currentRecord?.fullName}
            </div>
          </div>

          <div className="mt-5">
            <div className="grid lg:grid-cols-2 text-start gap-4 text-lg">
              {currentRecord?.serviceName && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Service name:</div>
                  <div>{currentRecord?.serviceName}</div>
                </div>
              )}
              {currentRecord?.email && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Email:</div>
                  <div>{currentRecord?.email}</div>
                </div>
              )}
              {currentRecord?.servicePrice && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Service price:</div>
                  <div>{currentRecord?.servicePrice}</div>
                </div>
              )}

              {currentRecord?.dateOfBirth && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Date of Birth:</div>
                  <div>
                    {currentRecord?.dateOfBirth
                      ? dayjs(currentRecord?.dateOfBirth).format("DD-MM-YYYY")
                      : "-"}
                  </div>
                </div>
              )}
              {currentRecord?.contactNumber && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Contact number:</div>
                  <div>{currentRecord?.contactNumber}</div>
                </div>
              )}
              {currentRecord?.address && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Contact number:</div>
                  <div>{currentRecord?.address}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <button
          onClick={() => handleBlock(currentRecord)}
          className="bg-secondary-color text-primary-color py-3 text-xl font-semibold rounded-lg mt-8 w-full"
        >
          Block
        </button> */}
      </div>
    </Modal>
  );
};

export default ViewCustomerModal;
