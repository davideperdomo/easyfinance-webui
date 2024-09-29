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

  const menuItems = isAuthenticated
    ? [
        { key: 'home', label: 'Home', onClick: () => router.push('/home') },
        { key: 'finance-management', label: 'Finance Management', onClick: () => router.push('/finance-management') },
        {
          key: 'logout',
          label: (
            <Button type="link" onClick={handleLogout}>
              Logout
            </Button>
          ),
        },
      ]
    : [
        { key: 'login', label: 'Login', onClick: () => router.push('/login') },
        { key: 'sign-up', label: 'Sign Up', onClick: () => router.push('/sign-up') },
      ];

  return <StyledMenu mode="horizontal" items={menuItems} />;
};
