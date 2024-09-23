import { Button, Form, Input, List, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Expense, ExpensePlainData, ExpenseUserId } from '../../modules/expense/domain/expense';
import { ApiExpenseRepository } from '../../modules/expense/infrastructure/api-expense.repository';

const expenseRepository = new ApiExpenseRepository('http://localhost:8080/api');

const UserExpenses: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpensePlainData[]>([]);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const expense = Expense.fromPlainData({
        id: uuidv4(),
        amount: values.amount,
        category: values.category,
        frequency: values.frequency,
        userId: 'uuid-atrtgd-retd'
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
    const userId = new ExpenseUserId('uuid-atrtgd-retd');
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
    <div>
      <h2>User Expenses</h2>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please input the amount!' }]}>
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
      <List
        header={<h4>Expenses</h4>}
        bordered
        dataSource={expenses}
        renderItem={item => {
          return <List.Item>
            {item.id}: ${item.amount} {item.category}
          </List.Item>
        }}
      />
    </div>
  );
};

export default UserExpenses;
