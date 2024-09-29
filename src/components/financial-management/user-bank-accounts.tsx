import { Button, Form, Input, List, message, Spin } from 'antd';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BankAccount, BankAccountId, BankAccountPlainData } from '../../modules/bank-account/domain/bankAccount';
import { ApiBankAccountRepository } from '../../modules/bank-account/infrastructure/api-bank-account.repository';
import { useUser } from '../../hooks/user-context';
import { useBankAccounts } from '../../hooks/use-bank-accounts';
import { DeleteOutlined } from '@ant-design/icons';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
const bankAccountRepository = new ApiBankAccountRepository(apiUrl);

const UserBankAccounts: React.FC = () => {
  const { user } = useUser();
  const { bankAccounts, isLoading, getBankAccounts } = useBankAccounts();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      if (!user?.id) {
        throw new Error('User is not defined.');
      }
      const bankAccount = BankAccount.fromPlainData({
        id: uuidv4(),
        type: values.type,
        financialInstitution: values.financialInstitution,
        balance: Number(values.balance),
        userId: user?.id.value,
      });
      await bankAccountRepository.save(bankAccount);
      message.success('Bank account created successfully!');
      form.resetFields();
      getBankAccounts();
    } catch (error) {
      message.error('Failed to create bank account.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const bankAccountId = new BankAccountId(id);
      await bankAccountRepository.delete(bankAccountId);
      message.success('Bank account deleted successfully!');
      getBankAccounts();
    } catch (error) {
      message.error('Failed to delete bank account.');
    }
  };

  return (
    <Spin spinning={isLoading || !user }>
      <List
        header={<h4>Bank Accounts</h4>}
        bordered
        dataSource={bankAccounts}
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
              {item.type}: <span style={{ color: 'green' }}>${item.balance}</span> {item.financialInstitution}
            </List.Item>
          );
        }}
      />
      <p />
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please input the type!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="financialInstitution" label="Financial Institution" rules={[{ required: true, message: 'Please input the financial institution!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="balance" label="Balance" rules={[{ required: true, message: 'Please input the balance!' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create Bank Account</Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UserBankAccounts;
