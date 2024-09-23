'use client';
import React from 'react';
import { Menu, Button } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/auth-context';

const StyledMenu = styled(Menu)`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Header: React.FC = () => {
  const router = useRouter();
  const { authentication, refreshAuthUser } = useAuth();
  const isAuthenticated = authentication.isAuthenticated();

  const handleLogout = async () => {
    await authentication.logout();
    await refreshAuthUser();
    router.push('/login');
  };

  return (
    <StyledMenu mode="horizontal">
      <Menu.Item key="home" onClick={() => router.push('/home')}>
        Home
      </Menu.Item>
      {!isAuthenticated && (
        <>
          <Menu.Item key="login" onClick={() => router.push('/login')}>
            Login
          </Menu.Item>
          <Menu.Item key="sign-up" onClick={() => router.push('/sign-up')}>
            Sign Up
          </Menu.Item>
        </>
      )}
      {isAuthenticated && (
        <>
          <Menu.Item key="finance-management" onClick={() => router.push('/finance-management')}>
            Finance Management
          </Menu.Item>
          <Menu.Item key="logout">
            <Button type="link" onClick={handleLogout}>
              Logout
            </Button>
          </Menu.Item>
        </>
      )}
    </StyledMenu>
  );
};
