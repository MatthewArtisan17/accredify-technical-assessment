import React from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
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
	const location = useLocation();

	const handleMenuClick = (e) => {
		const key = e.key;
		switch (key) {
			case "1":
				navigate("/");
				break;
			case "2":
				navigate("/documents");
				break;
			case "3":
				navigate("/career-goal");
				break;
			case "4":
				navigate("/security");
				break;
			case "5":
				navigate("/settings");
				break;
			default:
				break;
		}
	};

	const getSelectedKey = () => {
		switch (location.pathname) {
			case "/":
				return "1";
			case "/documents":
				return "2";
			case "/career-goal":
				return "3";
			case "/security":
				return "4";
			case "/settings":
				return "5";
			default:
				return "1"; // Default to Home
		}
	};

	return (
		<div>
			<div className='sider-profile-container'>
				<ProfileCircle name={userName} />
			</div>
			<Menu
				className='menu'
				mode='inline'
				defaultSelectedKeys={["1"]}
				selectedKeys={[getSelectedKey()]}
				onClick={handleMenuClick}
				items={items}
			/>
		</div>
	);
};

export default Sidebar;
