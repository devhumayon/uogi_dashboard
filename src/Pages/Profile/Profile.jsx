import { Form, Input, Typography } from "antd";
// import profileImage from "/images/profileImage.png";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUserProfileQuery } from "../../Redux/api/userApi";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../utils/baseUrl";

const Profile = () => {
  const { data: userProfile, refetch } = useUserProfileQuery();
  console.log(userProfile);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
  });

  const imageUrl = getImageUrl();

  useEffect(() => {
    if (userProfile?.data) {
      const profileDataApi = userProfile.data;
      console.log("profileDataApi", profileDataApi);

      setProfileData({
        fullName: profileDataApi.fullName,
        email: profileDataApi.email,
        image: profileDataApi.image,
        // phoneCode: profileDataApi.phoneCode || "BD",
        address: profileDataApi.address,
        phoneNumber: profileDataApi.phoneNumber,
        role: profileDataApi.role || "Undefined",
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (location.state?.updated) {
      refetch();
    }
  }, [location.state, refetch]);

  const handleEditClick = () => {
    navigate("edit-profile", { state: { profileData } });
  };

  return (
    <div className="min-h-screen bg-primary-color flex justify-center items-center">
      <div className="py-10 text-base-color rounded-lg h-full w-full lg:w-[70%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-8">
            <img
              className="h-40 w-40 relative rounded-full"
              src={`${profileData?.image}?t=${new Date().getTime()}`}
              alt=""
            />
            <p className="text-5xl font-semibold">{profileData?.fullName}</p>
          </div>
          {/* < to="edit-profile" className="hover:text-primary-color"> */}
          <button
            onClick={handleEditClick}
            className="bg-[#FE5C8E] text-[#FEF2F5] px-5 py-3 rounded-lg"
          >
            <div className="flex gap-1">
              <EditOutlined style={{ color: "#FAFAFA" }} />
              <p className="text-primary-color">Edit Profile</p>
            </div>
          </button>
        </div>
        <div className="flex flex-col items-center text-white mt-5">
          <Form layout="vertical" className="bg-transparent p-4 w-full">
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item className="text-white ">
              <Input
                value={profileData?.email}
                disabled
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Full Name
            </Typography.Title>
            <Form.Item className="text-white">
              <Input
                readOnly
                value={profileData?.fullName}
                placeholder="Enter your full name"
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            {profileData?.address && (
              <>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Address
                </Typography.Title>
                <Form.Item className="text-white">
                  <Input
                    readOnly
                    value={profileData.address}
                    placeholder="Enter your contact number"
                    className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                  />
                </Form.Item>
              </>
            )}
            {profileData?.phoneNumber && (
              <>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Contact Number
                </Typography.Title>
                <Form.Item className="text-white">
                  <Input
                    readOnly
                    value={profileData?.phoneNumber}
                    placeholder="Enter your contact number"
                    className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                  />
                </Form.Item>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Profile;
