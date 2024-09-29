'use client';
import { Button, Form, Input, Alert, Spin } from 'antd'; // Import Spin from antd
import React, { useState } from 'react'; // Import useState
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../hooks/auth-context';
import { User } from '../modules/user/domain/user';
import { ApiUserRepository } from '../modules/user/infrastructure/api-user.repository';
import { useRouter } from 'next/navigation';

const StyledForm = styled(Form)`
  max-width: 300px;
  margin: auto;
`;

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
const userRepository = new ApiUserRepository(apiUrl);

export const SignUpForm: React.FC = () => {
  const { authentication } = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const [loading, setLoading] = useState<boolean>(false); // State for loading spinner

  const onFinish = async (values: any) => {
    setLoading(true); // Set loading to true
    try {
      const authUser = await authentication.signUp(values.username, values.password);
      const newUser: User = User.fromPlainData({
        id: uuidv4(),
        email: values.username,
        name: values.name,
        authUid: authUser.uid,
      });
      await userRepository.create(newUser);
      router.push('/finance-management');
    } catch (error: unknown) {
      console.error('Sign up error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred during sign up.'); // Set error message
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  return (
    <div>
      {errorMessage && <Alert message={errorMessage} type="error" showIcon closable onClose={() => setErrorMessage(null)} />} {/* Display error alert */}
      <Spin spinning={loading}> {/* Show spinner while loading */}
        <StyledForm
          name="sign-up"
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

          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Sign Up
            </Button>
          </Form.Item>
        </StyledForm>
      </Spin>
    </div>
  );
};
