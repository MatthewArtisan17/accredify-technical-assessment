// src/components/Sidebar.jsx
import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import HomeIcon from "../assets/icons/Home.png";
import DocumentIcon from "../assets/icons/Docs.png";
import LightbulbIcon from "../assets/icons/Lightbulb.png";
import SecurityIcon from "../assets/icons/Security.png";
import SettingsIcon from "../assets/icons/Settings.png";
import ProfileCircle from "../components/ProfileCircle";
import "../styles/layouts/Sidebar.css";

const getItem = (key, icon) => {
	return {
		key,
		icon,
	};
};

const items = [
	getItem("1", <img src={HomeIcon} alt='Home' />),
	getItem("2", <img src={DocumentIcon} alt='Documents' />),
	getItem("3", <img src={LightbulbIcon} alt='Career Goal' />),
	getItem("4", <img src={SecurityIcon} alt='Security' />),
	getItem("5", <img src={SettingsIcon} alt='Settings' />),
  ];

const Sidebar = ({ userName }) => {
	const navigate = useNavigate();

	const handleMenuClick = (e) => {
		const key = e.key;
		switch (key) {
			case '1':
				navigate('/');
				break;
			case '2':
				navigate('/documents');
				break;
			case '3':
				navigate('/career-goal');
				break;
			case '4':
				navigate('/security');
				break;
			case '5':
				navigate('/settings');
				break;
			default:
				break;
		}
	};

	return (
		<div>
			<div className='sider-profile-container'>
				<ProfileCircle name={userName} />
			</div>
			<Menu className='menu' mode='inline' defaultSelectedKeys={["1"]} onClick={handleMenuClick} items={items} />
		</div>
	);
};

export default Sidebar;
