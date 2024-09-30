'use client';
import React from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import UserIncomes from './financial-management/user-incomes';
import UserExpenses from './financial-management/user-expenses';
import UserBankAccounts from './financial-management/user-bank-accounts';
import UserCreditProducts from './financial-management/user-credit-producs';

const StyledTabs = styled(Tabs)`
  max-width: 800px;
  margin: auto;
`;

export const FinancialManagement: React.FC = () => {
  const tabItems = [
    { label: 'Incomes', key: '1', children: <UserIncomes /> },
    { label: 'Expenses', key: '2', children: <UserExpenses /> },
    { label: 'Credit Products', key: '3', children: <UserCreditProducts /> },
    { label: 'Investment Products', key: '4', children: <p>Feature not available yet, coming soon.</p> },
    { label: 'Bank Accounts', key: '5', children: <UserBankAccounts /> },
  ];

  return (
    <StyledTabs defaultActiveKey="1" items={tabItems} />
  );
};
