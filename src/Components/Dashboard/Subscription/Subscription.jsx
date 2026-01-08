import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
  Collapse,
  ConfigProvider,
} from "antd";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
// import addSubs from "../../../../public/images/";
import { MdOutlineDone } from "react-icons/md";

export default function Subscription() {
  const { Panel } = Collapse;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscription, setSubscription] = useState([
    {
      plan: "Free",
      price: "$0",
      features: [
        "Limited Care Coordination",
        "1:1 Audio conference with MVR for general support ",
        "Appointment reminders",
        "Basic insurance assistance",
      ],
      buttonStatus: "Join for free", // 'active' or 'inactive'
    },
    {
      plan: "Premium",
      price: "$10",
      features: [
        "Personalized Care Coordination",
        "1:1 Video or Audio conference with dedicated MVR",
        "Virtual or In-Person Appointment Attendance",
        "Insurance advocacy & Bill Management and Payment Assistance",
      ],
      buttonStatus: "Get Premium",
    },
  ]);
  const [form] = Form.useForm();
  const [featureList, setFeatureList] = useState([{ feature: "" }]); // Initial feature
  const [activeKey, setActiveKey] = useState([0]); // Track the active panel

  const handleAddQus = () => {
    const newfeatureList = [...featureList, { feature: "" }]; // Add new feature
    setFeatureList(newfeatureList);
    setActiveKey([newfeatureList.length - 1]); // Set the new panel as active
  };

  const handleFeatureChange = (index, value) => {
    const newfeatureList = [...featureList];
    newfeatureList[index].feature = value;
    setFeatureList(newfeatureList);
    // console.log("Updated Feature:", newfeatureList[index].feature); // Log the updated feature
  };
  const handleRemoveFeature = (index) => {
    const newFeatureList = featureList.filter((_, i) => i !== index);
    setFeatureList(newFeatureList);

    // Adjust active key if the removed feature was the active one
    if (index === activeKey[0]) {
      setActiveKey([newFeatureList.length - 1]);
    }
  };

  const handleBuyNow = (plan, price, duration, facilities) => {
    console.log("Plan:", plan);
    console.log("Price:", price);
    console.log("Duration:", duration);
    console.log("Facilities:", facilities);
    // Add further handling logic here, such as navigating to a checkout page
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const formattedFeatures = featureList.map((item) => item.feature);
      // Create a new subscription object
      const newSubscription = {
        plan: values.planName,
        price: values.planPrice,
        features: formattedFeatures,
        duration: values.timeline[0],
        buttonStatus: values.buttonStatus, // Assuming a single timeline value is selected
      };
      console.log(newSubscription);

      setSubscription((prevSubscriptions) => [
        ...prevSubscriptions,
        newSubscription,
      ]);

      // Log the updated subscription array
      console.log("Updated Subscription Array:", subscription);

      // Reset form fields and close the modal
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  return (
    <div className=" min-h-screen py-4 px-4 sm:px-6 md:px-8 rounded-lg">
      <div className="w-full sm:w-[90%] mt-10 mx-auto">
        {" "}
        <div className="flex flex-col sm:flex-row justify-center gap-5 sm:justify-between items-center mb-20">
          <h1 className="text-3xl lg:text-4xl text-secondary-color font-semibold">
            Subscription
          </h1>
          <Button
            type="primary"
            onClick={showModal}
            className="flex items-center gap-1 sm:gap-3 !bg-secondary-color !text-primary-color h-10 font-semibold border-none"
          >
            <GoPlus className="text-xl text-primary-color" />
            <p className="text-xs sm:text-lg py-3">Add subscription</p>
          </Button>
        </div>
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              facilities: ["Boost voucher to popular"],
            }}
            className="p-4 mt-5"
          >
            <Form.Item
              label="Plan Name"
              name="planName"
              rules={[
                { required: true, message: "Please input the plan name!" },
              ]}
              style={{ fontWeight: "500" }}
            >
              <Input
                placeholder="Enter plan name"
                className="font-medium h-12 !bg-transparent !text-base-color  placeholder:text-gray-700 border !border-base-color"
              />
            </Form.Item>

            <Form.Item
              label="Plan Price"
              name="planPrice"
              rules={[
                { required: true, message: "Please input the plan price!" },
              ]}
              style={{ fontWeight: "500" }}
            >
              <Input
                placeholder="Enter plan price"
                type="number"
                className="font-medium h-12 !bg-transparent !text-base-color  placeholder:text-gray-700 border !border-base-color"
              />
            </Form.Item>

            <Form.Item
              label="Features"
              name="features"
              style={{ fontWeight: "500" }}
            >
              <ConfigProvider
                theme={{
                  components: {
                    Collapse: {
                      colorTextHeading: "#222222",
                      colorBorder: "#FEEBEA",
                      colorText: "#222222",
                      borderRadiusLG: 0,
                      headerPadding: "5px 10px",
                      contentBg: "rgb(255,255,255)",
                      headerBg: "rgb(255,255,255)",
                    },
                  },
                }}
              >
                <Collapse
                  accordion
                  activeKey={activeKey}
                  onChange={setActiveKey}
                  className="bg-primary-color mb-5"
                >
                  {featureList.map((faq, index) => (
                    <Panel
                      header={`Feature ${index + 1}`}
                      key={index}
                      className="!text-base-color bg-primary-color flex flex-col gap-1"
                      extra={
                        featureList.length > 1 && (
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveFeature(index)}
                          >
                            Remove
                          </button>
                        )
                      }
                    >
                      <div className="flex flex-col gap-3">
                        <Input
                          value={faq.feature} // Display the current feature value
                          placeholder="Type your feature"
                          onChange={(e) =>
                            handleFeatureChange(index, e.target.value)
                          }
                          className="h-10 !bg-[#FEEBEA] border !border-[#FEEBEA] !text-base-color placeholder:text-gray-600"
                        />
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </ConfigProvider>
              <Button
                block
                onClick={handleAddQus}
                style={{
                  padding: "1px",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#222222",
                  background: "transparent",
                  height: "40px",
                  border: "1px solid #999999",
                }}
              >
                <PlusOutlined />
                Add More Features
              </Button>
            </Form.Item>

            <Form.Item
              label="Timeline"
              name="timeline"
              style={{ fontWeight: "500" }}
              rules={[{ required: true, message: "Please select a timeline!" }]}
            >
              <Checkbox.Group className="font-normal w-full flex flex-col">
                <div className="flex justify-between items-center">
                  <span className="font-normal">07 Days</span>
                  <Checkbox value="07 Days" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-normal">15 Days</span>
                  <Checkbox value="15 Days" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-normal">1 Month</span>
                  <Checkbox value="1 Month" />
                </div>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label="Button Status"
              name="buttonStatus"
              rules={[
                { required: true, message: "Please input the Button Status!" },
              ]}
              style={{ fontWeight: "500" }}
            >
              <Input
                placeholder="Enter Button Status"
                type="text"
                className="font-medium h-12 !bg-transparent !text-base-color  placeholder:text-gray-700 border !border-base-color"
              />
            </Form.Item>

            <Form.Item>
              <Button
                onClick={handleSave}
                className="w-full h-12 !bg-[#F5382C] border !border-[#F5382C] !text-white text-base sm:text-lg font-bold"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div className="flex flex-wrap flex-col md:flex-row justify-center items-center md:items-stretch  gap-20">
          {subscription?.map((sub, index) => (
            <div
              key={index}
              className="w-full min-h-[600px] max-w-full sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[400px] flex flex-col justify-between bg-base-color text-white p-10 rounded-3xl shadow-lg"
            >
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center text-secondary-color font-bold mb-2">
                  {sub.plan}
                </h3>
                <p className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-10">
                  {sub.price}/
                  <span className="text-xl sm:text-2xl lg:text-3xl">
                    monthly
                  </span>
                </p>
                <ul className="mb-10">
                  {sub?.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-[#EDE9E9] -mt-4">
                        <MdOutlineDone className="size-3 text-base-color" />
                      </div>
                      <p className="sm:text-lg lg:text-xl text-[#EDE9E9] mb-5">
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <button
                  onClick={() =>
                    handleBuyNow(sub.plan, sub.price, 30, sub.features)
                  }
                  className="w-full py-3 text-lg sm:text-xl lg:text-2xl rounded-2xl text-white font-bold bg-secondary-color"
                >
                  {sub.buttonStatus}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
