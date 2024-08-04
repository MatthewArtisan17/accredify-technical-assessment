import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAsync } from "../store/userSlice";
import { fetchDocumentsAsync } from "../store/documentSlice";
import { fetchCareerGoalAsync } from "../store/careerGoalSlice";
import '../styles/HomePage.css';

import HomeIcon from '../assets/icons/Home.png';
import DocumentIcon from '../assets/icons/Docs.png';
import LightbulbIcon from '../assets/icons/Lightbulb.png';
import SecurityIcon from '../assets/icons/Security.png';
import SettingsIcon from '../assets/icons/Settings.png';

import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;


const getItem = (key, icon) => {
	return {
		key,
		icon,
	};
};

const items = [
	getItem("1", <img src={HomeIcon} alt="Home" />),
	getItem("2", <img src={DocumentIcon} alt="Home" />),
	getItem("3", <img src={LightbulbIcon} alt="Home" />),
  getItem("4", <img src={SecurityIcon} alt="Home" />),
  getItem("5", <img src={SettingsIcon} alt="Home" />),
];

const HomePage = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.data);
	const documents = useSelector((state) => state.documents.data || []);
	const careerGoal = useSelector((state) => state.careerGoal.data);
	const userLoading = useSelector((state) => state.user.loading);
	const documentsLoading = useSelector((state) => state.documents.status === "loading");
	const careerGoalLoading = useSelector((state) => state.careerGoal.status === "loading");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchUserAsync());
				await dispatch(fetchDocumentsAsync());
				await dispatch(fetchCareerGoalAsync());
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [dispatch]);

	if (loading || userLoading || documentsLoading || careerGoalLoading) {
		return <p className='text-lg font-semibold'>Loading...</p>;
	}

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider className="sider" defaultCollapsed collapsedWidth={60}>
        <div className="sider-profile-container">
          <div className="sider-profile"></div>
        </div>
				<Menu className="menu" mode='inline' defaultSelectedKeys={["1"]} items={items} />
			</Sider>
			<Layout className="site-layout">
				<Header className='header' />
        <Content className="content"></Content>
			</Layout>
		</Layout>
		// <div>
		//   <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
		//     <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>
		//     <p className="text-gray-600">Email: {user?.email}</p>
		//     <img className="w-32 h-32 rounded-full mb-4" src={user?.profile_picture_url} alt={user?.name} />
		//   </div>
		//   <div className="grid gap-4 mb-4">
		//     {documents.length > 0 ? (
		//       documents.map((doc) => (
		//         <div key={doc.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
		//           <h3 className="text-xl font-semibold">{doc.document_name}</h3>
		//           <p className="text-gray-600">Issuer: {doc.issuer_name}</p>
		//           <p className="text-gray-600">Received on: {doc.received_on ? new Date(doc.received_on).toLocaleDateString() : 'N/A'}</p>
		//           <p className="text-gray-600">Expires on: {doc.expire_at ? new Date(doc.expire_at).toLocaleDateString() : 'N/A'}</p>
		//         </div>
		//       ))
		//     ) : (
		//       <p>No documents available</p>
		//     )}
		//   </div>
		//   {careerGoal && (
		//     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
		//       <h2 className="text-xl font-bold mb-4">Career Goal</h2>
		//       <p>Your Progress</p>
		//       <p>{careerGoal.progress}%</p>
		//       <p>I want to become a</p>
		//       <p className="font-bold">{careerGoal.name}</p>
		//     </div>
		//   )}
		// </div>
	);
};

export default HomePage;
