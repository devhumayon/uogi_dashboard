/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BarsOutlined, BellFilled } from "@ant-design/icons";
import { Dropdown, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import user from "/images/user.png";
import { AllImages } from "../../../public/images/AllImages";
import { useUserProfileQuery } from "../../Redux/api/userApi";
import { getImageUrl } from "../../utils/baseUrl";

const notifications = [
  {
    id: 1,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 2,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 3,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 4,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 5,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
];

const Topbar = ({ collapsed, setCollapsed }) => {
  const { data: userProfile } = useUserProfileQuery();

  const user = userProfile?.data;
  const imageUrl = getImageUrl();
 



 

  //     <Link
  //       to={"/notifications"}
  //       className="w-2/3 mx-auto bg-secondary-color !text-primary-color rounded h-8 py-1"
  //     >
  //       See More
  //     </Link>
  //   </div>
  // );
  return (
    <div className="py-2 mx-[-45px]  flex justify-between items-center bg-[#FFFFFF] pt-4">
      <div className="flex items-center gap-2 text-base-color ml-4 ">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl "
        />
      </div>
      <div className="flex items-center justify-center  mr-5">
        {/* <Dropdown
          overlay={notificationMenu}
          trigger={["click"]}
          placement="bottomRight"
        >
          <BellFilled
            shape="circle"
            size="small"
            className="bg-[#F7F5F5] py-4 px-2 rounded shadow h-6 text-base font-bold text-[#FF9500]"
          />
        </Dropdown> */}
        <Link
          to="profile"
          className="flex items-center justify-center gap-2 bg-transparent text-base-color border-0 rounded-lg h-8 px-2 py-1  mr-5"
        >
          <img
            src={`${user?.image}`}
            alt="profile_pic"
            style={{ width: "30px", height: "30px" }}
            className="rounded"
          />
          <p className="text-base-color text-lg ">{user?.fullName}</p>
        </Link>
      </div>
    </div>
  );
};
export default Topbar;
