// src/pages/LoginPage.jsx
import React, { useState } from "react";
import LoginLayout from "../layouts/LoginLayout";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        setTimeout(() => {
            navigate("/");
            setLoading(false);
        }, 1000);
    };

    return (
        <LoginLayout>
            <h1 className="text-3xl font-bold mb-4 text-center">Log In</h1>
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                autoComplete="off"
                className="h-fit"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </LoginLayout>
    );
};

export default LoginPage;