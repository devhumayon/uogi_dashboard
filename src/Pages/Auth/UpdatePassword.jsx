import { Button, Form, Input, Typography } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { HiArrowLeft } from "react-icons/hi";
import { MdOutlineLock } from "react-icons/md";
import { useResetPasswordMutation } from "../../Redux/api/authApi";
import { toast } from "sonner";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

  const onFinish = async (values) => {
    try {
      const data = {
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      };
      console.log("Request payload:", data);

      const token = localStorage.getItem("verifiedOtpToken");
      if (!token) {
        toast.error("Session expired. Please start the reset process again.");
        navigate("/forgot-password");
        return;
      }

      const response = await resetPassword(data).unwrap();
      console.log("Response:", response);

      if (response.success) {
        toast.success("Password updated successfully!");
        navigate("/signin");
      }
    } catch (error) {
      console.log("Error updating password:", error);
      // if (error.response) {
      //   console.error("Validation error details:", error.response.data);
      //   toast.error(
      //     error.response.data.message ||
      //       "Failed to update password. Please try again."
      //   );
      // } else {
      //   toast.error("An unexpected error occurred. Please try again.");
      // }
    }
  };

  return (
    <div className="text-base-color">
      <div className="max-w-[1350px] w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-10 min-h-screen py-10">
        <div className="">
          <img src={AllImages.logo} alt="logo" className="mx-auto" />
        </div>
        <div className="w-full flex flex-col justify-center items-center min-h-[80vh] p-5 md:p-8 lg:p-10 xl:p-16 bg-[#FEF2F599] lg:w-full mx-auto rounded-lg border border-[#FE5C8E]">
          <div className="w-full">
            {/* -------- update Password Page Header ------------ */}
            <div className="mb-8">
              <div className="flex items-center gap-1 mb-4">
                <Link to="/verify-otp">
                  <HiArrowLeft className="text-xl md:text-2xl lg:text-3xl" />
                </Link>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">
                  Set a new password
                </h1>
              </div>
              <p className="md:text-lg lg:text-xl mb-2 ">
                Your password must be 8-10 character long.
              </p>
            </div>
            {/* -------- Form Start ------------ */}
            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <Typography.Title level={4} style={{ color: "#222222" }}>
                Password
              </Typography.Title>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "New Password is Required",
                  },
                ]}
                name="password"
                className="text-base-color"
              >
                <Input.Password
                  prefix={<MdOutlineLock />}
                  placeholder="Enter new password"
                  className="py-2 px-3 text-xl  !border-base-color 1text-base-color !bg-transparent"
                />
              </Form.Item>
              <Typography.Title level={4} style={{ color: "#222222" }}>
                Confirm Password
              </Typography.Title>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
                className="text-base-color"
              >
                <Input.Password
                  prefix={<MdOutlineLock />}
                  placeholder="Enter your password"
                  className="py-2 px-3 text-xl  !border-base-color 1text-base-color !bg-transparent"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-6 border border-secondary-color hover:border-secondary-color text-xl text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                  htmlType="submit"
                >
                  Update password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdatePassword;
