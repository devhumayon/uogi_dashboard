import {
  CalendarOutlined,
  DownOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
} from "antd";
import Dragger from "antd/es/upload/Dragger";

const AddMVR = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div
      className="  min-h-screen rounded p-6"
      style={{ boxShadow: "0px 0px 3px 1px #00000040" }}
    >
      <div className="w-full sm:w-[90%] md:w-[90%] lg:w-[80%] xl:w-[70%] mx-auto">
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-semibold">
            ADD MVR
          </h1>
        </div>
        <div className="mt-10">
          <div className="flex flex-col items-center text-white mt-5">
            <Form
              onFinish={onFinish}
              layout="vertical"
              className="bg-transparent w-full p-2"
            >
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Category
              </Typography.Title>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      colorBgContainer: "rgba(0,0,0,0)",
                      fontSize: 20,
                      optionSelectedColor: "#FAFAFA",
                      optionSelectedBg: "#F5382C",
                      optionActiveBg: "#F5382C",
                      optionActiveColor: "#FAFAFA",
                      colorBorder: "#222222",
                      colorBgElevated: "#FAFAFA",
                      selectorBg: "#FAFAFA",
                      colorText: "#222222",
                      colorTextPlaceholder: "rgb(0, 0, 0,0.5)",
                      hoverBorderColor: "#222222",
                    },
                  },
                }}
              >
                <Form.Item
                  name="category"
                  className="text-white"
                  rules={[
                    {
                      required: true,
                      message: "Category is required",
                    },
                  ]}
                >
                  <Select
                    placeholder="Category"
                    suffixIcon={
                      <DownOutlined className="text-[#222222] text-xl mt-1" />
                    }
                    className="h-14 py-1 px-1 text-lg bg-primary-color text-gray-200 placeholder:text-gray-500 hover:bg-transparent focus:bg-transparent"
                  >
                    <Select.Option value="doctor">Doctor</Select.Option>
                    <Select.Option value="nurse">Nurse</Select.Option>
                  </Select>
                </Form.Item>
              </ConfigProvider>

              <Typography.Title level={5} style={{ color: "#222222" }}>
                Expertise
              </Typography.Title>
              <Form.Item
                rules={[{ required: true, message: "Expertise is Required" }]}
                name="expertise"
                className="text-white "
              >
                <Input
                  placeholder="Enter MVR expertise in relevant field"
                  className="font-medium h-12 !bg-transparent !text-base-color  placeholder:text-gray-700 border !border-base-color"
                />
              </Form.Item>

              <Typography.Title level={5} style={{ color: "#222222" }}>
                Name
              </Typography.Title>
              <Form.Item
                rules={[{ required: true, message: "Name is Required" }]}
                name="name"
                className="text-white "
              >
                <Input
                  placeholder="Enter MVR Name"
                  className="font-medium h-12 !bg-transparent !text-base-color  placeholder:text-gray-700 border !border-base-color"
                />
              </Form.Item>

              <Typography.Title level={5} style={{ color: "#222222" }}>
                Email
              </Typography.Title>
              <Form.Item
                rules={[{ required: true, message: "Email is Required" }]}
                name="email"
                type="email"
                className="text-white "
              >
                <Input
                  placeholder="Enter MVR Email"
                  className="font-medium h-12 !bg-transparent !text-base-color  placeholder:text-gray-700 border !border-base-color"
                />
              </Form.Item>

              <Typography.Title level={5} style={{ color: "#222222" }}>
                Contact number
              </Typography.Title>
              <Form.Item
                rules={[{ required: true, message: "Number is Required" }]}
                name="number"
                className="text-white "
              >
                <Input
                  placeholder="Enter MVR Contact number"
                  className="font-medium h-12 !bg-transparent !text-base-color  placeholder:text-gray-700 border !border-base-color"
                />
              </Form.Item>

              <Typography.Title level={5} style={{ color: "#222222" }}>
                Date Of Birth
              </Typography.Title>
              <Form.Item
                rules={[{ required: true, message: "Date is Required" }]}
                name="DOB"
                className="text-white"
              >
                <DatePicker
                  suffixIcon={
                    <CalendarOutlined className="text-[#222222] text-xl mt-1" />
                  }
                  placeholder="Enter your Date Of Birth"
                  className="w-full py-2 px-2 text-lg bg-primary-color border-gray-500 text-base-color placeholder:text-gray-500 hover:bg-transparent hover:border-base-color focus:bg-transparent focus:border-secondary-color"
                />
              </Form.Item>

              <Typography.Title level={5} style={{ color: "#222222" }}>
                Gender
              </Typography.Title>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      colorBgContainer: "rgba(0,0,0,0)",
                      fontSize: 20,
                      optionSelectedColor: "#FAFAFA",
                      optionSelectedBg: "#F5382C",
                      optionActiveBg: "#F5382C",
                      optionActiveColor: "#FAFAFA",
                      colorBorder: "#222222",
                      colorBgElevated: "#FAFAFA",
                      selectorBg: "#FAFAFA",
                      colorText: "#222222",
                      colorTextPlaceholder: "rgb(0, 0, 0,0.5)",
                      // activeOutlineColor: "#FCC1BE",
                      // activeBorderColor: "#FCC1BE",
                      hoverBorderColor: "#222222",
                    },
                  },
                }}
              >
                <Form.Item
                  rules={[{ required: true }]}
                  name="gender"
                  className="text-white"
                >
                  <Select
                    placeholder="Select MVR Gender"
                    suffixIcon={
                      <DownOutlined className="text-[#222222] text-xl  mt-1" />
                    }
                    className="h-14 py-1 px-1 text-lg bg-primary-color text-gray-200 placeholder:text-gray-500 hover:bg-transparent focus:bg-transparent "
                  >
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female </Select.Option>
                    <Select.Option value="other">Other </Select.Option>
                  </Select>
                </Form.Item>
              </ConfigProvider>

              {/* Attach Medical Documents Input */}

              <Typography.Title level={4} style={{ color: "#222222" }}>
                Attach Health Documents
              </Typography.Title>
              <Form.Item
                name=" medicalDocuments"
                className="text-base-color"
                rules={[
                  {
                    required: true,
                    message: " Health Documents is Required",
                  },
                ]}
              >
                <Dragger>
                  <div className=" flex items-center justify-center gap-x-3 py-8">
                    <UploadOutlined className="text-5xl" />
                    <p className="text-xl">Add Your Documents</p>
                  </div>
                </Dragger>
              </Form.Item>

              <Form.Item>
                <Button
                  className="w-full py-6 border !border-secondary-color  text-xl !text-primary-color !bg-secondary-color font-semibold rounded mt-14"
                  htmlType="submit"
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMVR;
