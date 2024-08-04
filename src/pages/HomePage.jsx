import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAsync } from "../store/userSlice";
import { fetchDocumentsAsync } from "../store/documentSlice";
import { fetchCareerGoalAsync } from "../store/careerGoalSlice";

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
		<div>
			<div className='bg-white p-4 rounded-lg shadow-md border border-gray-300'>
				<h1 className='text-2xl font-bold mb-4'>Welcome, {user?.name}</h1>
				<p className='text-gray-600'>Email: {user?.email}</p>
				<img
					className='w-32 h-32 rounded-full mb-4'
					src={user?.profile_picture_url}
					alt={user?.name}
				/>
			</div>
			<div className='grid gap-4 mb-4'>
				{documents.length > 0 ? (
					documents.map((doc) => (
						<div
							key={doc.id}
							className='bg-white p-4 rounded-lg shadow-md border border-gray-300'>
							<h3 className='text-xl font-semibold'>{doc.document_name}</h3>
							<p className='text-gray-600'>Issuer: {doc.issuer_name}</p>
							<p className='text-gray-600'>
								Received on:{" "}
								{doc.received_on
									? new Date(doc.received_on).toLocaleDateString()
									: "N/A"}
							</p>
							<p className='text-gray-600'>
								Expires on:{" "}
								{doc.expire_at
									? new Date(doc.expire_at).toLocaleDateString()
									: "N/A"}
							</p>
						</div>
					))
				) : (
					<p>No documents available</p>
				)}
			</div>
			{careerGoal && (
				<div className='bg-white p-4 rounded-lg shadow-md border border-gray-300'>
					<h2 className='text-xl font-bold mb-4'>Career Goal</h2>
					<p>Your Progress</p>
					<p>{careerGoal.progress}%</p>
					<p>I want to become a</p>
					<p className='font-bold'>{careerGoal.name}</p>
				</div>
			)}
		</div>
	);
};

export default HomePage;
