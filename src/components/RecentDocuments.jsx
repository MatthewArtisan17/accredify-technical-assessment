import React from "react";
import { useSelector } from "react-redux";
import { Spin, Table, Dropdown } from "antd";
import { LoadingOutlined, MoreOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/components/RecentDocuments.css";
import DocumentIcon from "../assets/icons/Document.png";
import moment from "moment";

const menu = [
    { label: "View" },
    { type: "divider" },
    { label: "Delete" },
];

const columns = [
    {
        title: "Document Name",
        dataIndex: "document_name",
        key: "document_name",
        render: (text) => (
            <div className='flex flex-row gap-4'>
                <img src={DocumentIcon} alt='Document' width={24} height={24} />
                {text}
            </div>
        ),
    },
    {
        title: "Received On",
        dataIndex: "received_on",
        key: "received_on",
        render: (text) => <p>{moment(text).format("DD MMM YYYY")}</p>,
    },
    {
        title: "",
        dataIndex: "actions",
        key: "actions",
        render: (text) => (
            <Dropdown menu={{ items: menu }} trigger={["click"]}>
                <MoreOutlined />
            </Dropdown>
        ),
    },
];

const RecentDocuments = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const documents = useSelector((state) => state.documents.data || []);
    const loading = useSelector((state) => state.documents.loading);

    const handleViewAllClick = () => {
        navigate("/documents");
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

    return (
        <div className='recent-documents-container'>
            <div className='flex justify-between items-center'>
                <h2 className='recent-documents-title'>Recent Documents</h2>
                {location.pathname !== "/documents" && (
                    <p
                        className='text-[#493DF5] font-bold text-[14px] cursor-pointer hover:underline'
                        onClick={handleViewAllClick}
                    >
                        View All Documents
                    </p>
                )}
            </div>
            <div className='recent-documents-card'>
                <Table columns={columns} dataSource={documents} style={{ width: "100%" }} />
            </div>
        </div>
    );
};

export default RecentDocuments;