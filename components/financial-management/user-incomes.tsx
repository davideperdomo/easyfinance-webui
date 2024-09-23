import { Button, Form, Input, List, message, Select, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Income, IncomePlainData, IncomeUserId } from '../../modules/income/domain/income';
import { ApiIncomeRepository } from '../../modules/income/infrastructure/api-income.repository';
import { useUser } from '../../hooks/user-context';

const incomeRepository = new ApiIncomeRepository('http://localhost:8080/api');

const UserIncomes: React.FC = () => {
  const { user } = useUser();
  const [incomes, setIncomes] = useState<IncomePlainData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      if (!user?.id) {
        throw new Error('User is not defined.');
      }
      const income = Income.fromPlainData({
        id: uuidv4(),
        amount: values.amount,
        frequency: values.frequency,
        userId: user?.id.value
      });
      await incomeRepository.create(income);
      message.success('Income created successfully!');
      form.resetFields();
      getIncomes();
    } catch (error) {
      message.error('Failed to create income.');
    }
  };

  const getIncomes = async () => {
    setIsLoading(true);
    const userId = user?.id;
    if (!userId) {
      throw new Error('User is not defined.');
    }
    const incomes = await incomeRepository.getByUserId(userId);
    if (incomes) {
      setIncomes( incomes.map(income => income.toPlainData()) );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchIncomes = async () => {
      await getIncomes();
    };
    if(user?.id) {
      fetchIncomes();
    };
  }, [user?.id]);

  return (
    <Spin spinning={isLoading || !user}>
      <h2>User Incomes</h2>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please input the amount!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="frequency" label="Frequency">
          <Select>
            <Select.Option value="Monthly">Monthly</Select.Option>
            <Select.Option value="Biweekly">Biweekly</Select.Option>
            <Select.Option value="Weekly">Weekly</Select.Option>
            <Select.Option value="Daily">Daily</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create Income</Button>
        </Form.Item>
      </Form>
      <List
        header={<h4>Incomes</h4>}
        bordered
        dataSource={incomes}
        renderItem={item => {
          return <List.Item>
            {item.id}: ${item.amount} {item.frequency}
          </List.Item>
        }}
      />
    </Spin>
  );
};

export default UserIncomes;
