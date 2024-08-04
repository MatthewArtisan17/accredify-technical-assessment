// src/components/MainLayout.jsx
import React from "react";
import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import HomeIcon from '../assets/icons/Home.png';
import DocumentIcon from '../assets/icons/Docs.png';
import LightbulbIcon from '../assets/icons/Lightbulb.png';
import SecurityIcon from '../assets/icons/Security.png';
import SettingsIcon from '../assets/icons/Settings.png';
import '../../src/styles/components/MainLayout.css'

const { Header, Content, Sider } = Layout;

const getItem = (key, icon) => {
  return {
    key,
    icon,
  };
};

const items = [
  getItem("1", <img src={HomeIcon} alt="Home" />),
  getItem("2", <img src={DocumentIcon} alt="Documents" />),
  getItem("3", <img src={LightbulbIcon} alt="Career Goal" />),
  getItem("4", <img src={SecurityIcon} alt="Security" />),
  getItem("5", <img src={SettingsIcon} alt="Settings" />),
];

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider className="sider" defaultCollapsed collapsedWidth={60}>
        <div className="sider-profile-container">
          <div className="sider-profile"></div>
        </div>
        <Menu className="menu" mode="inline" defaultSelectedKeys={["1"]} items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header className="header" />
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;