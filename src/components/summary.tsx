'use client';
import React, { useEffect, useState } from 'react';
import { Statistic, Spin, Alert, Row, Col } from 'antd';
import { ApiUserRepository } from '../modules/user/infrastructure/api-user.repository';
import { UserId } from '../modules/user/domain/user';
import { UserFinanceSummary } from '../modules/user/domain/userFinanceSummary';
import { useUser } from '../hooks/user-context';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
const apiUserRepository = new ApiUserRepository(apiUrl);

const Summary: React.FC = () => {
  const { user } = useUser();
  const [financeSummary, setFinanceSummary] = useState<UserFinanceSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFinanceSummary = async () => {
    try {
      if (!user?.id) {
        throw new Error('User is not defined.');
      }
      const userId = new UserId(user.id.value);
      const summary = await apiUserRepository.getFinanceSummary(userId);
      setFinanceSummary(summary);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error fetching finance summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchFinanceSummary();
    }
  }, [user?.id]);

  if (error) {
    return <Alert message={error} type="error" showIcon />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '800px', margin: 'auto' }}>
      <Spin spinning={loading || !user}>
        <Statistic title="Monthly Income" value={financeSummary?.totalIncome} prefix="$" />
        <Statistic title="Monthly Expenses" value={financeSummary?.totalExpense} prefix="$" />
        <Statistic title="Monthly Balance" value={financeSummary?.balance} prefix="$" />
      </Spin>
    </div>
  );
};

export default Summary;
