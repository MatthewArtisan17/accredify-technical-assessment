import React from "react";
import { useSelector } from "react-redux";
import { List, Card, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "../styles/components/RecentDocuments.css"; // Ensure you create this file for styling

const RecentDocuments = () => {
	const documents = useSelector((state) => state.documents.data || []);
	const loading = useSelector((state) => state.documents.loading);

	if (loading) {
		return (
			<Spin
				tip="Loading..."
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

	return (
		<div className='recent-documents-container'>
			<h2 className="recent-documents-title">Recent Documents</h2>
			<div className='recent-documents-card'>
			</div>
		</div>
	);
};

export default RecentDocuments;