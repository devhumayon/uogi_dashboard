import { useEffect, useState } from "react";
import { Layout, Menu, Card, Input, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import profileImage from "/images/profileImage.png";
import { GoDeviceCameraVideo } from "react-icons/go";
import { PiImagesThin } from "react-icons/pi";
import { LuPhone } from "react-icons/lu";
import { CiMenuKebab } from "react-icons/ci";
import { BsEmojiSmile, BsImage, BsPaperclip } from "react-icons/bs";

const { Header, Content, Sider } = Layout;

const Chat = () => {
  // Sample data with 10 conversations
  const [conversations] = useState([
    {
      id: 1,
      user: "Alice",
      lastMessageTime: "10:30 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hello!",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
        {
          id: 2,
          text: "How are you?",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
        {
          id: 3,
          text: "I'm fine, thanks!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 4,
          text: "What about you?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 5,
          text: "Doing great!",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
      ],
    },
    {
      id: 2,
      user: "Bob",
      lastMessageTime: "11:15 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hi!",
          sender: "Bob",
          senderRole: "user",
          unread: false,
        },
        {
          id: 2,
          text: "How's it going?",
          sender: "Bob",
          senderRole: "user",
          unread: false,
        },
        {
          id: 3,
          text: "Pretty good, you?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 4,
          text: "Great!",
          sender: "Bob",
          senderRole: "user",
          unread: false,
        },
        {
          id: 5,
          text: "Good to hear!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 3,
      user: "Charlie",
      lastMessageTime: "09:45 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hey!",
          sender: "Charlie",
          senderRole: "user",
          unread: true,
        },
        {
          id: 2,
          text: "Long time no see.",
          sender: "Charlie",
          senderRole: "user",
          unread: true,
        },
        {
          id: 3,
          text: "Indeed!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 4,
          text: "How have you been?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 5,
          text: "Busy but good.",
          sender: "Charlie",
          senderRole: "user",
          unread: true,
        },
      ],
    },
    {
      id: 4,
      user: "David",
      lastMessageTime: "08:50 AM",
      senderRole: "admin",
      messages: [
        {
          id: 1,
          text: "Good morning!",
          sender: "David",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 2,
          text: "Good morning to you too!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Have a nice day!",
          sender: "David",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 4,
          text: "You too!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 5,
          text: "Take care!",
          sender: "David",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 5,
      user: "Eve",
      lastMessageTime: "10:00 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "How are you?",
          sender: "Eve",
          senderRole: "user",
          unread: true,
        },
        {
          id: 2,
          text: "I'm good. You?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Doing well, thanks!",
          sender: "Eve",
          senderRole: "user",
          unread: true,
        },
        {
          id: 4,
          text: "Great to hear!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 5,
          text: "Let's catch up soon.",
          sender: "Eve",
          senderRole: "user",
          unread: true,
        },
      ],
    },
    {
      id: 6,
      user: "Frank",
      lastMessageTime: "11:30 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "See you later!",
          sender: "Frank",
          senderRole: "user",
          unread: false,
        },
        {
          id: 2,
          text: "Sure, bye!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Take care!",
          sender: "Frank",
          senderRole: "user",
          unread: false,
        },
        {
          id: 4,
          text: "You too!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 5,
          text: "Catch you later!",
          sender: "Frank",
          senderRole: "user",
          unread: false,
        },
      ],
    },
    {
      id: 7,
      user: "Grace",
      lastMessageTime: "09:20 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Bye!",
          sender: "Grace",
          senderRole: "user",
          unread: true,
        },
        {
          id: 2,
          text: "See you!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Catch you later!",
          sender: "Grace",
          senderRole: "user",
          unread: true,
        },
        {
          id: 4,
          text: "Sure!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 8,
      user: "Hank",
      lastMessageTime: "08:00 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "What's up?",
          sender: "Hank",
          senderRole: "user",
          unread: false,
        },
        {
          id: 2,
          text: "Not much, you?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Same here.",
          sender: "Hank",
          senderRole: "user",
          unread: false,
        },
        {
          id: 4,
          text: "Alright.",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 9,
      user: "Ivy",
      lastMessageTime: "09:10 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hello again!",
          sender: "Ivy",
          senderRole: "user",
          unread: true,
        },
        {
          id: 2,
          text: "Hi Ivy!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "How have you been?",
          sender: "Ivy",
          senderRole: "user",
          unread: true,
        },
        {
          id: 4,
          text: "Pretty good, you?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 10,
      user: "Jack",
      lastMessageTime: "11:00 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Long time no see!",
          sender: "Jack",
          senderRole: "user",
          unread: false,
        },
        {
          id: 2,
          text: "Indeed, how have you been?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Busy, but good.",
          sender: "Jack",
          senderRole: "user",
          unread: false,
        },
        {
          id: 4,
          text: "That's good to hear.",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
  ]);

  // State to manage the selected conversation, filter, and search term
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  console.log(selectedConversation);
  //   const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle conversation selection
  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
  };

  // Function to handle filter change
  //   const handleFilterChange = ({ key }) => {
  //     setFilter(key);
  //   };

  // Function to handle search term change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter conversations based on the selected filter and search term
  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch = conversation.user
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // if (filter === "unread") {
    //   return conversation.messages.some((msg) => msg.unread) && matchesSearch;
    // }

    return matchesSearch;
  });

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

  return (
    <Layout style={{ height: "100vh", boxShadow: "0px 0px 2px 1px #00000040" }}>
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              siderBg: "rgb(255, 255, 255)",
            },
            Menu: {
              itemSelectedBg: "rgb(221, 17, 34)",
              itemSelectedColor: "rgb(234, 240, 247)",
            },
          },
        }}
      >
        <Layout className="bg-[#FFFFFF]">
          <Sider
            width={250}
            theme="light"
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="bg-white m-2 overflow-y-auto"
          >
            <div>
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-secondary-color font-semibold mt-3">
                Messages
              </p>
              <Input
                placeholder="Search Conversations"
                prefix={<SearchOutlined />}
                className="bg-gray-200 text-base-color mt-2 px-2 w-full"
                onChange={handleSearch}
              />
            </div>
            <div className="h-full">
              <Menu mode="vertical" className=" text-gray-300">
                {filteredConversations.map((conversation) => (
                  <Menu.Item
                    key={conversation.id}
                    onClick={() => handleConversationSelect(conversation)}
                    className={` py-10 px-4 bg-white border-b border-gray-200 `}
                  >
                    <div className="-mt-6 flex justify-between items-center">
                      <div>
                        <div className="text-xl">{conversation.user}</div>
                        <div className="text-sm">Okay, I got you</div>
                      </div>
                      <div className="text-sm">{` ${conversation.lastMessageTime}`}</div>
                    </div>
                  </Menu.Item>
                ))}
              </Menu>
            </div>
          </Sider>
          <Layout className="p-6 bg-[#FFFFFF]">
            <Header className="bg-[#FFFFFF] p-4  flex justify-between">
              <div className="flex items-center gap-2">
                <img className="h-10 w-10 relative" src={profileImage} alt="" />
                <p className="font-bold text-base sm:text-lg lg:text-xl">
                  {selectedConversation?.user}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-[#EDE9E9]">
                  <GoDeviceCameraVideo className="cursor-pointer text-secondary-color text-xl" />
                </div>
                <div className="p-2 rounded-full bg-[#EDE9E9]">
                  <LuPhone className="cursor-pointer text-secondary-color text-xl" />
                </div>
                <div className="p-2 rounded-full bg-[#EDE9E9]">
                  <PiImagesThin className="cursor-pointer text-secondary-color text-xl" />
                </div>
                <div className="p-2 rounded-full bg-[#EDE9E9]">
                  <CiMenuKebab className="cursor-pointer text-base-color text-xl" />
                </div>
              </div>
            </Header>

            <Content className="bg-[#F3F3F3] flex flex-col gap-5 rounded-none relative">
              {selectedConversation ? (
                <div className="h-full flex flex-col justify-end">
                  <Card className="bg-[#F3F3F3]  mb-10 overflow-y-auto border-none ">
                    {selectedConversation.messages.map((msg) => (
                      <div key={msg.id}>
                        <p
                          className={`p-5 my-2 rounded-md ${
                            msg.sender === "You"
                              ? "w-fit ml-auto text-right text-base-color bg-[#FEEBEA]"
                              : "w-fit text-left text-base-color bg-[#EDE9E9]"
                          }`}
                        >
                          {msg.text}
                        </p>
                        <div
                          className={`flex items-center gap-2 w-full ${
                            msg.sender === "You"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <p
                            className={`font-bold text-xs ${
                              msg.sender === "You" ? "text-right" : "text-left"
                            }`}
                          >
                            {msg.sender}
                          </p>
                          <p
                            className={`font-bold text-xs text-secondary-color ${
                              msg.sender === "You" ? "text-right" : "text-left"
                            }`}
                          >
                            10:40 AM
                          </p>
                        </div>
                      </div>
                    ))}
                  </Card>
                </div>
              ) : (
                <div className="text-center h-full mt-16 text-secondary-color">
                  Select a conversation to view messages
                </div>
              )}

              <div className="">
                {selectedConversation ? (
                  <div className="absolute bottom-0 flex justify-center items-center w-full p-4">
                    <div className="w-full rounded-full bg-red-100 px-4 py-2 flex items-center space-x-4">
                      {/* Emoji Icon */}
                      <BsEmojiSmile className="cursor-pointer text-xl text-gray-500" />

                      {/* Input Field */}
                      <Input
                        placeholder="Send your message..."
                        className="border-none focus:ring-0 outline-none !bg-transparent text-black"
                      />

                      {/* Image Icon */}
                      <BsImage className="cursor-pointer text-xl text-gray-500" />

                      {/* Paperclip Icon */}
                      <BsPaperclip className="cursor-pointer text-xl text-gray-500" />
                    </div>
                  </div>
                ) : (
                  <div className="text-center h-full mt-16 text-[#d1d1d1]"></div>
                )}
              </div>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </Layout>
  );
};

export default Chat;
