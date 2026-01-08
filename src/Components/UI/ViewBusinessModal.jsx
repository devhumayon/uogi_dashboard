/* eslint-disable react/prop-types */
import { Modal } from "antd";

const ViewBusinessModal = ({
  isViewBusiness,
  handleCancel,
  currentRecord,
  //   handleBlock,
}) => {
  return (
    <Modal
      title={
        <div className="pt-7">
          <h2 className="text-secondary-color text-4xl ">Business Details</h2>
        </div>
      }
      open={isViewBusiness}
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
            <img
              src={currentRecord?.image}
              alt={currentRecord?.fullName}
              className="w-14 h-14 sm:w-20  sm:h-20 rounded-lg mr-4"
            />
            <div className="text-xl sm:text-3xl font-bold">
              {currentRecord?.fullName}
            </div>
          </div>

          <div className="mt-5">
            <div className="grid lg:grid-cols-2 text-start gap-4 text-lg">
              <div className="sm:flex gap-1">
                <div className="font-bold">Email:</div>
                <div>{currentRecord?.email}</div>
              </div>
              <div className="sm:flex gap-1">
                <div className="font-bold">Contact number:</div>
                <div>{currentRecord?.contactNumber}</div>
              </div>
              <div className="sm:flex gap-1">
                <div className="font-bold">Address:</div>
                <div>{currentRecord?.address}</div>
              </div>
              <div className="sm:flex gap-1">
                <div className="font-bold">Date of Birth:</div>
                <div>{currentRecord?.dateOfBirth}</div>
              </div>
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

export default ViewBusinessModal;
