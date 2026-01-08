import { Link, useParams } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { useState } from "react";
import AssignMVRModal from "../../UI/AssignMVRModal";

const SingleAssignMVR = () => {
  const { id } = useParams();
  console.log(id);
  const [isAssignMVRVisible, setIsAssignMVRVisible] = useState(false);
  const handleCancel = () => {
    setIsAssignMVRVisible(false);
  };

  const handleOk = () => {
    setIsAssignMVRVisible(false);
  };

  return (
    <div
      className="  min-h-screen rounded p-6"
      style={{ boxShadow: "0px 0px 3px 1px #00000040" }}
    >
      <div className="flex justify-start items-center gap-x-1">
        <Link to="/assign-mvr">
          <MdArrowBackIos className="text-xl sm:text-2xl lg:text-3xl text-secondary-color" />
        </Link>
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-base-color font-semibold">
          Assign MVR
        </h1>
      </div>
      <div className="w-full sm:w-[90%] md:w-[90%] lg:w-[80%] xl:w-[70%] mx-auto">
        <div className="">
          <div className="flex flex-col justify-center items-center p-4 mb-5">
            {/* Avatar */}
            <img
              src="../../../../public/images/userImage.png"
              alt="User Image"
              className="w-14 h-14 sm:w-20  sm:h-20 rounded-lg "
            />
            <div className="text-xl sm:text-3xl font-bold">Sonia Ivy</div>
          </div>

          <div className="my-5">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 text-start gap-4 text-lg">
              <div className="sm:flex flex-col gap-1">
                <div className="font-bold">Name</div>
                <div>Sonia Ivy</div>
              </div>
              <div className="sm:flex flex-col gap-1">
                <div className="font-bold">Email</div>
                <div>example@gmail.com</div>
              </div>
              <div className="sm:flex flex-col gap-1">
                <div className="font-bold">Contact </div>
                <div>+56447516134</div>
              </div>
              <div className="sm:flex flex-col gap-1">
                <div className="font-bold">Gender</div>
                <div>Female</div>
              </div>
              <div className="sm:flex flex-col gap-1">
                <div className="font-bold">Date of Birth</div>
                <div>19-04-2000</div>
              </div>
              <div className="sm:flex flex-col gap-1">
                <div className="font-bold">Height</div>
                <div>168m</div>
              </div>
              <div className="sm:flex flex-col gap-1">
                <div className="font-bold">Weight</div>
                <div>72 kg</div>
              </div>
              <div className="sm:flex flex-col gap-1">
                <div className="font-bold">Medical Condition</div>
                <div>Breathing Problem and chest pain.</div>
              </div>
              <div className="sm:flex flex-col gap-1">
                <div className="font-bold">Address</div>
                <div>Banasree, Rampura, Dhaka.</div>
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-xl font-bold">Documents</h2>
              <div className="flex items-center mt-5 gap-2">
                <div className="bg-[#DFE1E3] p-5">
                  <div className="p-4 rounded-full bg-[#334A55]">
                    <img
                      src="../../../../public/images/pdfImage.png"
                      alt="User Image"
                      className="w-7 h-8 "
                    />
                  </div>
                  <p className="text-xs text-[#232323] mt-1">Resume.pdf</p>
                </div>
                <div className="bg-[#DFE1E3] p-5">
                  <div className="p-4 rounded-full bg-[#334A55]">
                    <img
                      src="../../../../public/images/pdfImage.png"
                      alt="User Image"
                      className="w-7 h-8 "
                    />
                  </div>
                  <p className="text-xs text-[#232323] mt-1">Resume.pdf</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-3 mt-5">
          <button className="bg-[#646262] text-primary-color border border-[#646262] px-2 w-full rounded-md font-semibold text-lg sm:text-xl lg:text-2xl py-3">
            Cancle
          </button>

          <button
            onClick={() => setIsAssignMVRVisible(true)}
            className="bg-secondary-color text-primary-color border border-secondary-color px-2 w-full rounded-md font-semibold text-lg sm:text-xl lg:text-2xl py-3"
          >
            Assign MVR
          </button>
        </div>
      </div>
      <AssignMVRModal
        isAssignMVRVisible={isAssignMVRVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
};

export default SingleAssignMVR;
