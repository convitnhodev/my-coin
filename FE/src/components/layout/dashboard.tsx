import React from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import SiderDashboard from "../dasboard/sider";

const { Content, Footer } = Layout;

const LayoutDashboard: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <SiderDashboard />
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "53.7rem",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          My Coin ©{new Date().getFullYear()} Created by @NVHAI248
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutDashboard;
