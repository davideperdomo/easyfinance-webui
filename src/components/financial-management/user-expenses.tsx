import { Button, Form, Input, List, message, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Expense, ExpensePlainData, ExpenseUserId, ExpenseId } from '../../modules/expense/domain/expense';
import { ApiExpenseRepository } from '../../modules/expense/infrastructure/api-expense.repository';
import { useUser } from '../../hooks/user-context';
import { DeleteOutlined } from '@ant-design/icons';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
const expenseRepository = new ApiExpenseRepository(apiUrl);

const UserExpenses: React.FC = () => {
  const { user } = useUser();
  const [expenses, setExpenses] = useState<ExpensePlainData[]>([]);
  const [form] = Form.useForm();

  const handleDelete = async (id: string) => {
    try {
      const expenseId = new ExpenseId(id);
      await expenseRepository.delete(expenseId);
      message.success('Expense deleted successfully!');
      getExpenses();
    } catch (error) {
      message.error('Failed to delete expense.');
    }
  };

  const onFinish = async (values: any) => {
    try {
      if (!user?.id) {
        throw new Error('User is not defined.');
      }
      const expense = Expense.fromPlainData({
        id: uuidv4(),
        amount: Number(values.amount),
        category: values.category,
        frequency: values.frequency,
        userId: user.id.value,
        name: values.name
      });
      await expenseRepository.create(expense);
      message.success('Expense created successfully!');
      form.resetFields();
      getExpenses();
    } catch (error) {
      message.error('Failed to create expense.');
    }
  };

  const getExpenses = async () => {
    if (!user?.id) {
      throw new Error('User is not defined.');
    }
    const userId = new ExpenseUserId(user.id.value);
    const expenses = await expenseRepository.getByUserId(userId);
    if (expenses) {
      setExpenses(expenses.map(expense => expense.toPlainData()));
    }
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      await getExpenses();
    };
    fetchExpenses();
  }, [expenseRepository]);

  return (
    <Spin spinning={!user}>
      <List
        header={<h4>Expenses</h4>}
        bordered
        dataSource={expenses}
        renderItem={item => {
          return (
            <List.Item
              actions={[
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(item.id)}
                />
              ]}
            >
              <strong>{item.name}</strong> - <span style={{ color: 'red' }}>${item.amount}</span> <em>({item.category})</em>
            </List.Item>
          );
        }}
      />
      <p />
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please input the amount!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Select>
            <Select.Option value="Food">Food</Select.Option>
            <Select.Option value="Transport">Transport</Select.Option>
            <Select.Option value="Entertainment">Entertainment</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
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
          <Button type="primary" htmlType="submit">Create Expense</Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UserExpenses;
