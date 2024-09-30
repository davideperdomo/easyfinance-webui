'use client';
import { Button, Form, Input, List, message, Select, Spin, Typography, Descriptions } from 'antd';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FinancialGoal, FinancialGoalCalculationCriteria } from '../modules/financial-goal/domain/financial-goal';
import { ApiFinancialGoalRepository } from '../modules/financial-goal/infrastructure/api-financial-goal.repository';
import { useUser } from '../hooks/user-context';
import styled from 'styled-components';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
const financialGoalRepository = new ApiFinancialGoalRepository(apiUrl);

const StyledContainer = styled.div`
  max-width: 800px;
  margin: auto;
`;

const formatFromPercentage = (value: string): number => {
  const number = parseFloat(value);
  if (isNaN(number) || number < 0 || number > 100) {
    throw new Error('Invalid percentage value');
  }
  return number/100;
};

const formatToPercentage = (value?: number): string => {
  return `${((value ?? 0) * 100).toFixed(2)}%`;
};

const formatToDate = (value?: Date | string): string => {
  if (value instanceof Date) {
    return value.toISOString().split('T')[0] ?? '';
  }
  return value?.split('T')[0] ?? '';
};


export const FinancialGoals: React.FC = () => {
  const { user } = useUser();
  const [currentFinancialGoal, setCurrentFinancialGoal] = useState<FinancialGoal>();
  const [criteria, setCriteria] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  
  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);
      if (!user?.id) {
        throw new Error('User is not defined.');
      }
      console.log({values});
      
      const params = {
        id: uuidv4(),
        userId: user.id.value,
        name: values.name,
        criteria: values.criteria,
        goalAmount: Number(values.goalAmount),
        monthlyPercentage: values?.monthlyPercentage 
          ? formatFromPercentage(values.monthlyPercentage) 
          : undefined,
        goalTermDate: values?.goalTermDate,
      };
      const financialGoal = await financialGoalRepository.calculate(params);
      setCurrentFinancialGoal(financialGoal);
      message.success('Financial goal calculated successfully!');
      //form.resetFields();
    } catch (error) {
      console.log(error);
      message.error('Failed to calculate financial goal.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledContainer>
      <Typography.Text type="secondary">Financial Goal Feature is in Beta!</Typography.Text>
      <Typography.Title level={2}>Financial Goal</Typography.Title>
      <Spin spinning={isLoading || !user}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="goalAmount" label="Goal Amount" rules={[{ required: true, message: 'Please input the goal amount!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="criteria" label="Calculation Criteria" rules={[{ required: true, message: 'Please select the criteria!' }]}>
            <Select onChange={(value) => setCriteria(value)}>
              {FinancialGoalCalculationCriteria.options.map((option: string) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {criteria && criteria === FinancialGoalCalculationCriteria.criterias.percentage && (
            <Form.Item name="monthlyPercentage" label="Monthly Percentage %">
              <Input type="number" />
            </Form.Item>
          )}
          {criteria && criteria === FinancialGoalCalculationCriteria.criterias.date && (
            <Form.Item name="goalTermDate" label="Goal Term Date">
              <Input type="date" />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">Calculate Financial Goal</Button>
          </Form.Item>
        </Form>
        {currentFinancialGoal && (
          <Descriptions title="Current Financial Goal" bordered column={1}>
            <Descriptions.Item label="Start Date">{formatToDate(currentFinancialGoal.startDate.value)}</Descriptions.Item>
            <Descriptions.Item label="Goal Term">{formatToDate(currentFinancialGoal.goalTerm?.time)}</Descriptions.Item>
            <Descriptions.Item label="Monthly Percentage">{formatToPercentage(currentFinancialGoal.monthlyPercentage?.value)}</Descriptions.Item>
            <Descriptions.Item label="Monthly Amount">{currentFinancialGoal.monthlyAmount.value}</Descriptions.Item>
          </Descriptions>
        )}
      </Spin>
    </StyledContainer>
  );
};
