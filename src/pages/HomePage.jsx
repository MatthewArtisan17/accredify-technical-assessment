import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAsync } from "../store/userSlice";
import { fetchDocumentsAsync } from "../store/documentSlice";
import { fetchCareerGoalAsync } from "../store/careerGoalSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import CareerGoal from "../components/CareerGoal";
import RecentDocuments from "../components/RecentDocuments";
import "../styles/pages/HomePage.css";

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
				if (!user || !documents.length || !careerGoal) {
					await dispatch(fetchUserAsync());
					await dispatch(fetchDocumentsAsync());
					await dispatch(fetchCareerGoalAsync());
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [dispatch, user, documents, careerGoal]);

	if (loading || userLoading || documentsLoading || careerGoalLoading) {
		return (
			<Spin
				tip='Loading...'
				indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
				fullscreen
			/>
		);
	}

	const showCareerGoal = user?.current_organisation?.is_personal !== true;

	return (
		<div className='homepage-content'>
			<div className='homepage-title'>
				<h2 className='font-bold text-[28px]'>Hi, {user?.name} 👋</h2>
				<p className='text-[16px] text-[#5B6270]'>
					Manage your documents{ showCareerGoal && " issued by SMU Academy or track your career goal"}. 
				</p>
			</div>
			<div className='homepage-main-content'>
				{showCareerGoal && <CareerGoal />}
				<RecentDocuments />
			</div>
		</div>
	);
};

export default HomePage;