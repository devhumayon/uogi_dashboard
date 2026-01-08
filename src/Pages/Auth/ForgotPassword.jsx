import { Button, Form, Input } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { HiArrowLeft } from "react-icons/hi";
import { useState } from "react";
import { useForgetPasswordMutation } from "../../Redux/api/authApi";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [forgetPassword] = useForgetPasswordMutation();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onFinish = async () => {
    const data = { email };
    console.log("Success:", data);

    try {
      const response = await forgetPassword(data).unwrap();
      console.log("response token", response);
      if (response.success === true) {
        localStorage.setItem("otpToken", response?.data?.forgetToken);
        localStorage.setItem("userEmail", email);
        toast.success("An OTP has been sent to your email!");
        navigate("/verify-otp");
      }
    } catch (error) {
      console.error("Error sending reset code:", error);
      if (error.data?.message === "User not found") {
        toast.error("Incorrect Email.");
      }
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
            <div className="mb-8">
              <div className="flex items-center gap-1 mb-4">
                <Link to="/signin">
                  <HiArrowLeft className="text-xl md:text-2xl lg:text-3xl" />
                </Link>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-medium ">
                  Forget password
                </h1>
              </div>
              <p className="md:text-lg lg:text-xl mb-2 ">
                Please enter your email address to reset your password
              </p>
            </div>

            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Email is Required",
                  },
                ]}
                name="email"
                className="text-base-color"
              >
                <Input
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="py-2 px-3 text-xl  !border-base-color 1text-base-color !bg-transparent"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-6 border border-secondary-color hover:border-secondary-color text-xl text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                  htmlType="submit"
                >
                  Send OTP
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
