import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import Main from "../Layout/Main";
import DashboardLayout from "../Layout/DashboardLayout";

import Dashboard from "../Dashboard/Dashboard";
import AllUsers from "../Dashboard/Users/Users";

import Profile from "../../Pages/Profile/Profile";
import EditProfile from "../../Pages/Profile/EditProfile";

import SignIn from "../../Pages/Auth/SignIn";
import UpdatePassword from "../../Pages/Auth/UpdatePassword";

import OtpPage from "../../Pages/Auth/OtpPage";
import SettingsChangePassword from "../Dashboard/settings/SettingsChangePassword";

import Logout from "../Dashboard/Logout";

import TermsOfService from "../Dashboard/settings/TermsOfService";
import AboutUs from "../Dashboard/settings/AboutUs";
import PrivacyPolicy from "../Dashboard/settings/PrivacyPolicy";

import Notifications from "../Dashboard/Notifications";
import Services from "../Dashboard/Services/Services";
import ServiceDetails from "../Dashboard/Services/ServiceDetails";
import Business from "../Dashboard/Business/Business";
import Deposit from "../Dashboard/Earning/Deposite";
import Withdraw from "../Dashboard/Earning/Withdraw";
import PolicyScreen from "../Dashboard/PolicyScreen/PolicyScreen";
import Earning from "../Dashboard/Earning/Earning";
import BusinessDetails from "../Dashboard/Business/BusinessDetails";
import ProtectedRoute from "../../utils/ProtectedRoute";
import Categories from "../Dashboard/Categories/Categories";
import CategoryDetails from "../Dashboard/Categories/CategoryDetails";

//

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <OtpPage />,
      },
      {
        path: "/reset-password",
        element: <UpdatePassword />,
      },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <AllUsers />,
          },
          {
            path: "business",
            element: <Business />,
          },
          {
            path: "business/:id",
            element: <BusinessDetails />,
          },
          {
            path: "services",
            element: <Services />,
          },
          {
            path: "services/:id",
            element: <ServiceDetails />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "category/:id",
            element: <CategoryDetails />,
          },
          {
            path: "earning",
            element: <Earning />,
          },
          {
            path: "deposit",
            element: <Deposit />,
          },
          {
            path: "withdraw",
            element: <Withdraw />,
          },
          {
            path: "policy-screen",
            element: <PolicyScreen />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "profile/edit-profile",
            element: <EditProfile />,
          },
          {
            path: "privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "terms-of-service",
            element: <TermsOfService />,
          },
          {
            path: "about-us",
            element: <AboutUs />,
          },
          // {
          //   path: "settings/forgot-password",
          //   element: <SettingsForgotPassword />,
          // },
          {
            path: "settings/change-password",
            element: <SettingsChangePassword />,
          },
          // {
          //   path: "settings/update-password",
          //   element: <SettingsUpdatePassword />,
          // },
          // {
          //   path: "settings/otp-page",
          //   element: <SettingsOtpPage />,
          // },
          {
            path: "logout",
            element: <Logout />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
        ],
      },
    ],
  },
]);

export default router;
