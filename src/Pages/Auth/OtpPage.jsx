import { Button, Form } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { AllImages } from "../../../public/images/AllImages";
import { HiArrowLeft } from "react-icons/hi";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../Redux/api/authApi";
import { toast } from "sonner";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const [verifyOtp] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();

  const handleOTPSubmit = async () => {
    if (otp.length < 6) {
      alert("Please fill in all OTP fields");
      return;
    }

    const token = localStorage.getItem("otpToken");
    if (!token) {
      alert("Error!. Please start the reset process again.");
      navigate("/forgot-password");
      return;
    }

    try {
      const data = { token, otp };
      console.log("Success:", data);
      const response = await verifyOtp(data).unwrap();
      console.log("OTP verification response:", response);

      if (response.success === true) {
        localStorage.setItem(
          "verifiedOtpToken",
          response?.data?.forgetOtpMatchToken
        );
        toast.success("OTP verified successfully!");
        navigate("/reset-password");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      if (error.data?.message === "Invalid OTP") {
        toast.error("Invalid OTP. Please try again.");
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    }
  };

  const handleResendOtp = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      toast.error("Email not found. Please start the reset process again.");
      navigate("/forgot-password");
      return;
    }

    const data = { email };
    try {
      const response = await resendOtp(data).unwrap();
      if (response.success === true) {
        toast.success("An OTP has been sent to your email!");
      }
    } catch (error) {
      // console.error("Error sending reset code:", error);
      if (error.data?.message === "User not found") {
        toast.error("Incorrect Email.");
      } else {
        toast.error("Failed to resend OTP. Please try again.");
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
                <Link to="/forgot-password">
                  <HiArrowLeft className="text-xl md:text-2xl lg:text-3xl" />
                </Link>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-medium mb-2">
                  Enter verification code
                </h1>
              </div>
            </div>

            <Form layout="vertical" className="bg-transparent w-full">
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[55px] h-[45px] !sm:w-[76px] sm:h-[64px] text-[20px] sm:text-[30px] bg-transparent border border-base-color
                      hover:border-base-color focus:bg-transparent focus:border-base-color rounded-lg mr-[10px] sm:mr-[20px] text-secondary-color"
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>
              <div className="flex justify-between py-1">
                <p>Didn’t receive code?</p>
                <Link
                  href="/otp-verification"
                  className="!text-[#F66E10] !underline font-semibold"
                  onClick={handleResendOtp}
                >
                  Resend
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-6 border border-secondary-color hover:border-secondary-color text-xl text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                  onClick={handleOTPSubmit}
                >
                  Verify
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OtpPage;
