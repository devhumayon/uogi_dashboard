/* eslint-disable no-unused-vars */
import { Button, ConfigProvider, Form, Input, Typography, Upload } from "antd";
import profileImage from "/images/profileImage.png";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { MdOutlineEdit } from "react-icons/md";
import { AllImages } from "../../../public/images/AllImages";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useEditProfileMutation,
  useUserProfileQuery,
} from "../../Redux/api/userApi";
import { toast } from "sonner";
import { getImageUrl } from "../../utils/baseUrl";

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profileData } = location.state || {};
  console.log(profileData);

  const { refetch } = useUserProfileQuery();
  const [imageUrl, setImageUrl] = useState(profileImage);
  const [imageFile, setImageFile] = useState(null);

  const imageUrlIp = getImageUrl();

  const [updateProfile, { isLoading }] = useEditProfileMutation();

  const onFinish = async (values) => {
    console.log("onfinish", values);
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    if (imageFile) {
      formData.append("image", imageFile); // Append image for upload
    }

    try {
      const response = await updateProfile(formData).unwrap(); // Send formData to the backend
      if (response.success) {
        toast.success("Profile updated successfully!");
        setImageUrl(imageUrl);

        await refetch();
        navigate("/profile", { state: { updated: true } });
      } else {
        toast.error(response.message || "Failed to update profile.");
      }
    } catch (error) {
      console.log("Update error:", error);
      toast.error("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="min-h-screen bg-primary-color flex justify-center items-center">
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="bg-transparent w-full"
      >
        <div className="py-10 text-base-color rounded-lg h-full w-full lg:w-[70%] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-8">
              <div className="mt-12 flex items-center  gap-x-4">
                <div className="mt-12  relative ">
                  <div className="rounded-full w-fit border-2 border-secondary-color overflow-hidden">
                    <img
                      src={`${imageUrlIp}/${profileData?.image}`}
                      alt="profile_img"
                      className="!h-40 !w-40 object-cover"
                    />
                  </div>
                  <Form.Item name="image" className="text-white ">
                    <Upload
                      maxCount={1}
                      listType="picture"
                      beforeUpload={() => false}
                      accept="image/*"
                      multiple={false}
                      // style={{
                      //   top: 0,
                      //   left: 0,
                      //   width: "100%",
                      //   height: "100%",
                      //   opacity: 0,
                      //   cursor: "pointer",
                      // }}
                    >
                      <Button
                        style={{
                          position: "absolute",
                          top: "-20px",
                          left: "130px",
                          transform: "translate(-50%, -50%)",
                          zIndex: 1,
                          opacity: 1,
                          height: "36px",
                          width: "36px",
                          borderRadius: "90px",
                          fontSize: "18px",
                        }}
                      >
                        <EditOutlined style={{ color: "#f5382c" }} />
                      </Button>
                    </Upload>
                  </Form.Item>
                </div>
                <p className="text-5xl font-semibold">
                  {profileData?.fullName}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center text-white mt-5">
            <div className="p-4 w-full">
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Email
              </Typography.Title>
              <Form.Item
                initialValue={profileData?.email}
                name="email"
                className="text-white "
              >
                <Input
                  suffix={<MdOutlineEdit />}
                  type="email"
                  placeholder="Enter your email"
                  className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                />
              </Form.Item>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Full Name
              </Typography.Title>
              <Form.Item
                initialValue={profileData?.fullName}
                name="fullName"
                className="text-white"
              >
                <Input
                  suffix={<MdOutlineEdit />}
                  placeholder="Enter your Name"
                  className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                />
              </Form.Item>
              {profileData?.address && (
                <>
                  <Typography.Title level={5} style={{ color: "#222222" }}>
                    Address
                  </Typography.Title>
                  <Form.Item
                    initialValue={profileData?.address}
                    name="address"
                    className="text-white"
                  >
                    <Input
                      suffix={<MdOutlineEdit />}
                      placeholder="Enter your address"
                      className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                    />
                  </Form.Item>
                </>
              )}
              {profileData?.phoneNumber && (
                <>
                  <Typography.Title level={5} style={{ color: "#222222" }}>
                    Contact number
                  </Typography.Title>
                  <Form.Item
                    initialValue={profileData?.phoneNumber}
                    name="phoneNumber"
                    className="text-white"
                  >
                    <Input
                      suffix={<MdOutlineEdit />}
                      placeholder="Enter your Contact number"
                      className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                    />
                  </Form.Item>
                </>
              )}
              <Form.Item>
                <Button
                  className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                  htmlType="submit"
                >
                  Save & Change
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default EditProfile;
