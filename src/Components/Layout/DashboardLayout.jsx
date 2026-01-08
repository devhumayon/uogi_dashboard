import Topbar from "../Shared/Topbar";

// import logo from "/images/logo.png";
import dashboardLogo from "../../../public/images/dashboard-logo/dashboard.svg";
import user from "../../../public/images/dashboard-logo/user.svg";
import business from "../../../public/images/dashboard-logo/business.svg";
import service from "../../../public/images/dashboard-logo/beauty.svg";
import income from "../../../public/images/dashboard-logo/income.svg";
// import policyScreen from "../../../public/images/dashboard-logo/policyScreen.svg";
import setting from "../../../public/images/dashboard-logo/setting.svg";
import profile from "../../../public/images/dashboard-logo/profile.svg";
import logout from "../../../public/images/dashboard-logo/logout.svg";

import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ConfigProvider, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { AllImages } from "../../../public/images/AllImages";
import { MdOutlineCategory } from "react-icons/md";

const DashboardLayout = () => {
  const location = useLocation();
  const pathSegment = location.pathname.split("/").pop();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Use effect to handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/signin", { replace: true });
  };

  const adminMenuItems = [
    {
      key: "dashboard",
      icon: <img src={dashboardLogo} alt="dashboard" width={20} />,
      label: <NavLink to="dashboard">Dashboard</NavLink>,
    },
    {
      key: "users",
      icon: <img src={user} alt="dashboard" width={20} />,
      label: <NavLink to="users">User</NavLink>,
    },
    {
      key: "business",
      icon: <img src={business} alt="dashboard" width={20} />,
      label: <NavLink to="business">Business</NavLink>,
    },
    {
      key: "services",
      icon: <img src={service} alt="services" width={16} height={16} />,
      label: <NavLink to="services">Services</NavLink>,
    },
    {
      key: "categories",
      icon: <MdOutlineCategory width={14} height={14} />,
      label: <NavLink to="categories">Categories</NavLink>,
    },
    {
      key: "earning",
      icon: <img src={income} alt="earning" width={16} height={16} />,
      label: <NavLink to="earning">Earning</NavLink>,
    },
    // {
    //   key: "earning",
    //   label: <span className="text-base-color"> Earning</span>,
    //   icon: <img src={income} alt="erning" width={16} height={16} />,
    //   children: [
    //     {
    //       key: "deposit",
    //       icon: <span>&#8226;</span>,
    //       label: <NavLink to="deposit">Deposit</NavLink>,
    //     },
    //     {
    //       key: "withdraw",
    //       icon: <span>&#8226;</span>,
    //       label: <NavLink to="withdraw">Withdraw</NavLink>,
    //     },
    //   ],
    // },
    // {
    //   key: "policy-screen",
    //   icon: <img src={policyScreen} alt="dashboard" width={16} height={16} />,
    //   label: <NavLink to="policy-screen">Policy Screen</NavLink>,
    // },
    {
      key: "profile",
      icon: <img src={profile} alt="dashboard" width={16} height={16} />,
      label: <NavLink to="profile">Profile</NavLink>,
    },
    {
      key: "settings",
      label: <span className="text-base-color"> Settings</span>,
      icon: <img src={setting} alt="dashboard" width={16} height={16} />,
      children: [
        {
          key: "change-password",
          icon: <span>&#8226;</span>,
          label: (
            <NavLink to="settings/change-password">Change Password</NavLink>
          ),
        },
        {
          key: "about-us",
          icon: <span>&#8226;</span>,
          label: <NavLink to="about-us">About Us</NavLink>,
        },
        {
          key: "terms-of-service",
          icon: <span>&#8226;</span>,
          label: <NavLink to="terms-of-service">Terms & Condition</NavLink>,
        },
        {
          key: "privacy-policy",
          icon: <span>&#8226;</span>,
          label: <NavLink to="privacy-policy">Privacy Policy</NavLink>,
        },
      ],
    },
    {
      key: "logout",
      icon: (
        <img
          src={logout}
          alt="dashboard"
          width={16}
          height={16}
          style={{ color: "#222222", fontSize: "16px" }}
        />
      ),
      label: (
        <div>
          <NavLink onClick={handleLogout} to="/signin">
            Logout
          </NavLink>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen !bg-white ">
      <Layout className="!relative !bg-white">
        <Sider
          width={270}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "#FFEBF1",
            // boxShadow: "0px 0px 5px #00000040",
            position: "sticky",
            top: 10,
            height: "98vh",
            overflowY: "auto",
          }}
          className="!rounded-3xl ml-3"
        >
          <Link to="/">
            <img
              src={AllImages.logo}
              alt="logo"
              width={150}
              height={150}
              className="mx-auto my-7"
            />
          </Link>

          <ConfigProvider
            theme={{
              token: {
                colorBgBase: "#FFC0D3",
                colorInfo: "#FFC0D3",
              },
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={pathSegment}
              style={{
                backgroundColor: "transparent",
                border: "none",
                paddingLeft: "6px",
                paddingRight: "6px",
              }}
              items={adminMenuItems}
            />
          </ConfigProvider>
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#ffffff",
              position: "sticky",
              top: 0,
              zIndex: 99999,
            }}
          >
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content>
            <div className="px-2 py-4 bg-white xl:px-5 xl:py-5">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
