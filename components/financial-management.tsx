'use client';
import React from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import UserIncomes from './financial-management/user-incomes';
import UserExpenses from './financial-management/user-expenses';

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
  max-width: 800px;
  margin: auto;
`;

export const FinancialManagement: React.FC = () => {
  return (
    <StyledTabs defaultActiveKey="1">
      <TabPane tab="Incomes" key="1">
        <UserIncomes />
      </TabPane>
      <TabPane tab="Expenses" key="2">
        <UserExpenses />
      </TabPane>
      <TabPane tab="Credit Products" key="3">
        <p>Feature not available yet, coming soon.</p>
      </TabPane>
      <TabPane tab="Investment Products" key="4">
        <p>Feature not available yet, coming soon.</p>
      </TabPane>
      <TabPane tab="Bank Accounts" key="5">
        <p>Feature not available yet, coming soon.</p>
      </TabPane>
      <TabPane tab="Plan Budget and Allocate Funds" key="8">
        <p>Feature not available yet, coming soon.</p>
      </TabPane>
    </StyledTabs>
  );
};
