/* eslint-disable react/prop-types */
import { Modal, Button } from "antd";

const ViewEarningModal = ({
  isViewModalVisible,
  currentRecord,
  handleCancel,
}) => {
  const transactionInfo = currentRecord;
  console.log(transactionInfo);

  return (
    <Modal
      title={
        <div className="pt-5 px-5">
          <h2 className="text-secondary-color text-4xl mb-2 text-center">
            Earning Details
          </h2>
        </div>
      }
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <div className=" mb-5">
        <div className=" p-5">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm sm:text-base lg:text-lg  font-semibold">
              Business name:
            </p>
            <p className="text-sm sm:text-base lg:text-lg">
              {
                transactionInfo?.serviceBookingId?.serviceId?.businessId
                  ?.businessName
              }
            </p>
          </div>
          {/* <div className="flex items-center gap-2 mb-3">
            <p className="text-sm sm:text-base lg:text-lg  font-semibold">
              Account number:
            </p>
            <p className="text-sm sm:text-base lg:text-lg">
              {transactionInfo?.accountNumber}
            </p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm sm:text-base lg:text-lg  font-semibold">
              Account name:
            </p>
            <p className="text-sm sm:text-base lg:text-lg">
              {transactionInfo?.accountName}
            </p>
          </div> */}
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm sm:text-base lg:text-lg  font-semibold">
              Current amount:
            </p>
            <p className="text-sm sm:text-base lg:text-lg">
              {transactionInfo?.bookingprice}
            </p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm sm:text-base lg:text-lg  font-semibold">
              Status:
            </p>
            <p className="text-sm sm:text-base lg:text-lg">
              {transactionInfo?.status}
            </p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm sm:text-base lg:text-lg  font-semibold">
              Transaction ID:
            </p>
            <p className="text-sm sm:text-base lg:text-lg">
              {transactionInfo?.transactionId || "Not available"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleCancel}
          className="py-5 text-white !bg-[#FE5C8E] hover:!bg-secondary-color w-full text-2xl"
        >
          Okay
        </Button>
      </div>
    </Modal>
  );
};

export default ViewEarningModal;
