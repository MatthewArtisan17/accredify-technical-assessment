import React from "react";
import { Layout, Dropdown, Space, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import ProfileCircle from "../components/ProfileCircle";
import LogoutIcon from "../assets/icons/Logout.png";
import { persistor } from "../store";
import { logout, togglePersonal } from "../store/userSlice";
import "../styles/layouts/MainLayout.css";

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
	const user = useSelector((state) => state.user.data);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await persistor.purge();
			dispatch(logout());
			navigate("/login");
		} catch (error) {
			console.error("Error during logout:", error);
		}
	};

	const handleTogglePersonal = () => {
		dispatch(togglePersonal());
	};

	const items = [
		{
			label: (
				<div className='flex flex-row gap-2 my-3'>
					<ProfileCircle name={user?.name} size='48px' />
					<div className='flex flex-col'>
						<p className='font-bold'>{user?.name}</p>
						<p className='text-[#5B6270] text-sm'>Recipient</p>
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
					<Button
						onClick={handleTogglePersonal}
            className="mr-4">
						Toggle Personal
					</Button>
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
