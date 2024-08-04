// src/components/MainLayout.jsx
import React from "react";
import { Layout, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import ProfileCircle from "../components/ProfileCircle";
import LogoutIcon from "../assets/icons/Logout.png";
import "../styles/layouts/MainLayout.css";

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
	const user = useSelector((state) => state.user.data);
	const navigate = useNavigate();

	const handleLogout = () => {
		navigate("/login");
	};

	const items = [
		{
			label: (
				<div className='flex flex-row gap-2 my-3'>
					<ProfileCircle name={user?.name} size='48px' />
					<div className='flex flex-col'>
						<p className="font-bold">{user?.name}</p>
						<p className="text-[#5B6270] text-sm">Recipient</p>
					</div>
				</div>
			),
		},
		{
			type: "divider",
		},
		{
			label: (
				<div className='flex flex-row gap-2 items-center text-[#5B6270] text-sm my-2'>
					<img src={LogoutIcon} alt='Logout' className='w-4 h-4' />
					Log Out
				</div>
			),
			key: "0",
			onClick: handleLogout,
		},
	];

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider className='sider' defaultCollapsed collapsedWidth={60}>
				<Sidebar userName={user?.name} />
			</Sider>
			<Layout className='site-layout'>
				<Header className='header'>
					<Dropdown
						menu={{
							items,
						}}
						trigger={["click"]}>
						<a onClick={(e) => e.preventDefault()}>
							<Space>
								<ProfileCircle name={user?.name} size='24px' />
								{user?.name}
								<DownOutlined />
							</Space>
						</a>
					</Dropdown>
				</Header>
				<Content className='content'>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainLayout;