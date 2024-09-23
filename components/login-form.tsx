'use client';
import React, { useState } from 'react'; // Import useState
import { Form, Input, Button, Alert, Spin } from 'antd'; // Import Alert and Spin from antd
import styled from 'styled-components';
import { useAuth } from '../hooks/auth-context'; // Import useAuth
import { useRouter } from 'next/navigation';

const StyledForm = styled(Form)`
  max-width: 300px;
  margin: auto;
`;

export const LoginForm: React.FC = () => {
  const { authentication, refreshAuthUser } = useAuth(); // Get authentication methods from AuthContext
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const [loading, setLoading] = useState<boolean>(false); // State for loading spinner

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await authentication.login(values.username, values.password);
      await refreshAuthUser();
      router.push('/finance-management');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred during login.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {errorMessage && <Alert message={errorMessage} type="error" showIcon closable onClose={() => setErrorMessage(null)} />} {/* Display error alert */}
      <Spin spinning={loading}> {/* Show spinner while loading */}
        <StyledForm
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </StyledForm>
      </Spin>
    </div>
  );
};
