import { Button, Form, Input, List, message, Select, Spin } from 'antd';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Income, IncomeId } from '../../modules/income/domain/income';
import { ApiIncomeRepository } from '../../modules/income/infrastructure/api-income.repository';
import { useUser } from '../../hooks/user-context';
import { useIncomes } from '../../hooks/use-incomes-hook';
import { DeleteOutlined } from '@ant-design/icons';
import { useBankAccounts } from '../../hooks/use-bank-accounts';

const incomeRepository = new ApiIncomeRepository('http://localhost:8080/api');

const UserIncomes: React.FC = () => {
  const { user } = useUser();
  const { incomes, isLoading, getIncomes } = useIncomes();
  const { bankAccounts, isLoading: isBankAccountsLoading } = useBankAccounts();
  const [form] = Form.useForm();

  const handleDelete = async (id: string) => {
    try {
      const incomeId = new IncomeId(id);
      await incomeRepository.delete(incomeId);
      message.success('Income deleted successfully!');
      getIncomes();
    } catch (error) {
      message.error('Failed to delete income.');
    }
  };

  const onFinish = async (values: any) => {
    try {
      if (!user?.id) {
        throw new Error('User is not defined.');
      }
      const income = Income.fromPlainData({
        id: uuidv4(),
        amount: Number(values.amount),
        frequency: values.frequency,
        userId: user?.id.value,
        name: values.name,
        associatedAccountId: values.associatedAccount
      });
      await incomeRepository.create(income);
      message.success('Income created successfully!');
      form.resetFields();
      getIncomes();
    } catch (error) {
      message.error('Failed to create income.');
    }
  };

  return (
    <Spin spinning={isLoading || !user || isBankAccountsLoading}>
      <List
        header={<h4>Incomes</h4>}
        bordered
        dataSource={incomes}
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
              <strong>{item.name}</strong> - <span style={{ color: 'green' }}>${item.amount}</span> <em>({item.frequency})</em>
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
        <Form.Item name="frequency" label="Frequency">
          <Select>
            <Select.Option value="Monthly">Monthly</Select.Option>
            <Select.Option value="Biweekly">Biweekly</Select.Option>
            <Select.Option value="Weekly">Weekly</Select.Option>
            <Select.Option value="Daily">Daily</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="associatedAccount" label="Associated Account">
          <Select>
            {bankAccounts.map(account => (
              <Select.Option key={account.id} value={account.id}>
                {account.type} - ${account.balance} ({account.financialInstitution})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create Income</Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UserIncomes;
