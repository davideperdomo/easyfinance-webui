import { Button, Form, Input, List, message, Spin, Select } from 'antd';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CreditProduct, CreditProductId, CreditProductPlainData, CreditProductType } from '../../modules/credit-product/domain/credit-product';
import { ApiCreditProductRepository } from '../../modules/credit-product/infrastructure/api-credit-product.repository';
import { useUser } from '../../hooks/user-context';
import { useCreditProducts } from '../../hooks/use-credit-product';
import { DeleteOutlined } from '@ant-design/icons';
import { InterestType } from '../../modules/credit-product/domain/interest';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
const creditProductRepository = new ApiCreditProductRepository(apiUrl);

const UserCreditProducts: React.FC = () => {
  const { user } = useUser();
  const { creditProducts, isLoading, getCreditProducts } = useCreditProducts();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      if (!user?.id) {
        throw new Error('User is not defined.');
      }
      const creditProduct = CreditProduct.fromPlainData({
        id: uuidv4(),
        type: values.type,
        amount: Number(values.amount),
        debt: {
          total: Number(values.debtTotal),
          capital: Number(values.debtCapital),
          interest: Number(values.debtInterest),
          late: Number(values.debtLate),
        },
        interest: {
          rate: Number(values.interestRate),
          frequency: values.interestFrequency,
          type: values.interestType,
        },
        userId: user?.id.value,
      });
      await creditProductRepository.create(creditProduct);
      message.success('Credit product created successfully!');
      form.resetFields();
      getCreditProducts();
    } catch (error) {
      message.error('Failed to create credit product.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const creditProductId = new CreditProductId(id);
      await creditProductRepository.delete(creditProductId);
      message.success('Credit product deleted successfully!');
      getCreditProducts();
    } catch (error) {
      message.error('Failed to delete credit product.');
    }
  };

  return (
    <Spin spinning={isLoading || !user}>
      <List
        header={<h4>Credit Products</h4>}
        bordered
        dataSource={creditProducts}
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
              {item.type}: <span style={{ color: 'green' }}>${item.amount}</span>
            </List.Item>
          );
        }}
      />
      <p />
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select the type!' }]}>
          <Select>
            {CreditProductType.options.map(option => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please input the amount!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="debtTotal" label="Debt Total" rules={[{ required: true, message: 'Please input the total debt!' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="debtCapital" label="Debt Capital" rules={[{ required: true, message: 'Please input the capital debt!' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="debtInterest" label="Debt Interest" rules={[{ required: true, message: 'Please input the interest debt!' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="debtLate" label="Debt Late" rules={[{ required: true, message: 'Please input the late debt!' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="interestRate" label="Interest Rate" rules={[{ required: true, message: 'Please input the interest rate!' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="interestFrequency" label="Interest Frequency" rules={[{ required: true, message: 'Please select the interest frequency!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="interestType" label="Interest Type" rules={[{ required: true, message: 'Please select the interest type!' }]}>
          <Select>
            {InterestType.options.map((option: string) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create Credit Product</Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UserCreditProducts;
