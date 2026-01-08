/* eslint-disable react/no-unescaped-entities */
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Collapse, ConfigProvider } from "antd";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

const { Panel } = Collapse;

const FAQ = () => {
  const editor = useRef(null);
  // State to hold the FAQ list and active panel key
  const [faqList, setFaqList] = useState([{ question: "", answer: "" }]); // Initial Q/A pair
  const [activeKey, setActiveKey] = useState([0]); // Track the active panel

  // Function to save all Q/A pairs
  const handleOnSave = () => {
    console.log(faqList); // This will log all Q/A pairs
  };

  // Function to add a new Q/A pair
  const handleAddQus = () => {
    const newFaqList = [...faqList, { question: "", answer: "" }]; // Add new Q/A pair
    setFaqList(newFaqList);
    setActiveKey([newFaqList.length - 1]); // Set the new panel as active
  };

  // Function to update question text
  const handleQuestionChange = (index, value) => {
    const newFaqList = [...faqList];
    newFaqList[index].question = value;
    setFaqList(newFaqList);
  };

  // Function to update answer text
  const handleAnswerChange = (index, value) => {
    const newFaqList = [...faqList];
    newFaqList[index].answer = value;
    setFaqList(newFaqList);
  };

  // Function to remove a Q/A pair
  const handleRemoveQus = (index) => {
    if (faqList.length > 1) {
      const newFaqList = faqList.filter((_, i) => i !== index); // Remove the item at the given index
      setFaqList(newFaqList);
      setActiveKey([Math.max(0, index - 1)]); // Set the previous panel as active or default to the first one
    }
  };

  return (
    <div className="min-h-screen  py-1 px-6 rounded-lg">
      <div className="p-2 rounded flex flex-col gap-5 w-full sm:w-[90%] md:w-[90%] lg:w-[80%] xl:w-[70%] mx-auto">
        <div>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold py-4 text-secondary-color">
            FAQ
          </h1>
        </div>
        {/* Q/A Portions */}
        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                colorTextHeading: "#222222",
                colorBorder: "#FEEBEA",
                colorText: "#222222",
                borderRadiusLG: 0,
                headerPadding: "12px 20px",
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
            className="bg-primary-color"
          >
            {faqList.map((faq, index) => (
              <Panel
                header={`Question ${index + 1}`}
                key={index}
                className="!text-base-color bg-primary-color flex flex-col gap-1"
                extra={
                  faqList.length > 1 && (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveQus(index)}
                    >
                      Remove
                    </button>
                  )
                }
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3">
                    <p className="text-base-color text-xl font-medium">{`Question ${
                      index + 1
                    }`}</p>
                    <Input
                      placeholder="Type your question"
                      value={faq.question}
                      onChange={(e) =>
                        handleQuestionChange(index, e.target.value)
                      }
                      className="h-10 !bg-[#FEEBEA] border !border-[#FEEBEA] !text-base-color placeholder:text-gray-600"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-base-color text-xl font-medium">
                      Answer
                    </p>
                    <JoditEditor
                      ref={editor}
                      value={faq.answer}
                      config={{ height: 300, theme: "light", readonly: false }}
                      onBlur={(newContent) =>
                        handleAnswerChange(index, newContent)
                      }
                    />
                  </div>
                </div>
              </Panel>
            ))}
          </Collapse>
        </ConfigProvider>
        <div>
          <Button
            block
            onClick={handleAddQus}
            style={{
              padding: "1px",
              fontSize: "24px",
              fontWeight: "500",
              color: "#222222",
              background: "transparent",
              height: "40px",
              border: "1px solid #999999",
            }}
          >
            <PlusOutlined />
            Add More Questions
          </Button>
          <Button
            block
            onClick={handleOnSave}
            style={{
              marginTop: "16px",
              padding: "1px",
              fontSize: "24px",
              fontWeight: "500",
              color: "#FAFAFA",
              background: "#F5382C",
              height: "40px",
              border: "none",
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;
