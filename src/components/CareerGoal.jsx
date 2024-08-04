import React from "react";
import { useSelector } from "react-redux";
import { Progress } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import "../styles/components/CareerGoal.css";

const CareerGoal = () => {
	const careerGoal = useSelector((state) => state.careerGoal.data);
	const loading = useSelector((state) => state.careerGoal.loading);

	const getArticle = (word) => {
		if (!word) return "";
		const firstLetter = word[0].toLowerCase();
		const vowels = ["a", "e", "i", "o", "u"];
		return vowels.includes(firstLetter) ? "an" : "a";
	};

	if (loading) {
		return (
			<Spin
				tip='Loading...'
				indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
				}}
			/>
		);
	}

	const article = getArticle(careerGoal?.name);

	return (
		<div>
			<h2 className='career-goal-title'>Career Goal</h2>
			<div className='career-goal-card'>
				<p className='font-bold text-sm text-[#5B6270]'>Your Progress</p>
				<Progress
					type='circle'
					percent={careerGoal?.progress}
					strokeColor='#493DF5'
					strokeWidth={8}
					size={180}
				/>
				<div className='text-center'>
					<p>I want to become {article}:</p>
					<p className='career-goal-name'>{careerGoal?.name || "N/A"}</p>
				</div>
				<Link to='/career-goal' className='career-goal-view-insights'>
					View Insights
				</Link>
			</div>
		</div>
	);
};

export default CareerGoal;
