import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../../Redux/api/settingsApi";
import { toast } from "sonner";

const SettingsChangePassword = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onFinish = async (values) => {
    console.log("password Values", values);
    try {
      const data = {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      };
      console.log("Request payload:", data);

      // const token = localStorage.getItem("authToken");
      // if (!token) {
      //   toast.error("Session expired. Please start the reset process again.");
      //   navigate("/forgot-password");
      //   return;
      // }

      const response = await changePassword(data).unwrap();
      console.log("Response:", response);

      if (response.success) {
        toast.success("Password updated successfully!");
        navigate("/signin");
      } else {
        toast.error(response.message || "Failed to update password.");
      }
    } catch (error) {
      console.log("Error updating password:", error);
      toast.error(
        error?.data?.message || "An error occurred while updating the password."
      );
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
    <div>
      <div className="container w-[90%] mx-auto bg-primary-color min-h-[80vh] p-20 flex justify-center items-center">
        <div className="w-full lg:w-[70%]">
          <Form
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full"
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Current password
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your current password!",
                },
              ]}
              name="currentPassword"
              className="text-white "
            >
              <Input.Password
                placeholder="Enter your password"
                className="py-2 px-3 text-xl  !border-base-color 1text-base-color !bg-transparent"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              New password
            </Typography.Title>
            <Form.Item
              rules={[
                { required: true, message: "Please enter your new password!" },
              ]}
              name="newPassword"
              className="text-white"
            >
              <Input.Password
                placeholder="Enter your password"
                className="py-2 px-3 text-xl  !border-base-color 1text-base-color !bg-transparent"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Re-enter new Password
            </Typography.Title>
            <Form.Item
              name="reEnterPassword"
              className="text-white"
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
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
            >
              <Input.Password
                placeholder="Enter your password"
                className="py-2 px-3 text-xl  !border-base-color 1text-base-color !bg-transparent"
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                htmlType="submit"
              >
                Change password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SettingsChangePassword;
