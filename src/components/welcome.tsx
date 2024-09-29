'use client';
import React from 'react';
import { Typography, Layout } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

const Welcome: React.FC = () => {
  return (
    <Layout>
      <Content style={{ padding: '50px', textAlign: 'center' }}>
        <Title level={1}>Welcome to EasyFinance, your personal financial assistant!</Title>
      </Content>
    </Layout>
  );
};

export default Welcome;