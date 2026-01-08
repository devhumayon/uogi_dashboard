import { ConfigProvider } from "antd";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { mainTheme } from "../../theme";

const Main = () => {
  return (
    <ConfigProvider theme={mainTheme}>
      <ScrollRestoration />
      <div className="bg-primary-color">
        <Outlet />
      </div>
    </ConfigProvider>
  );
};

export default Main;
