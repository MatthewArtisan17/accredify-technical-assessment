import React from "react";
import { Layout } from "antd";
import "../styles/layouts/LoginLayout.css";

const LoginLayout = ({ children }) => {
    return (
        <Layout className="login-layout">
            <div className="login-content">
                {children}
            </div>
        </Layout>
    );
};

export default LoginLayout;