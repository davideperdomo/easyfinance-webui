import axios from 'axios';
import { CreditProduct, CreditProductId, UserId } from '../domain/credit-product';
import { CreditProductRepository } from '../domain/credit-product.repository';

export class ApiCreditProductRepository implements CreditProductRepository {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async create(creditProduct: CreditProduct): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/credit-products`, creditProduct);
    } catch (error) {
      throw new Error('Error saving credit product');
    }
  }

  async getByUserId(userId: UserId): Promise<CreditProduct[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/users/${userId.value}/credit-products`);
      if (response.data) {
        return response.data.map((item: any) => CreditProduct.fromPlainData(item));
      }
      return [];
    } catch (error) {
      throw new Error('Error fetching credit products by user ID');
    }
  }

  async delete(creditProductId: CreditProductId): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/credit-products/${creditProductId.value}`);
    } catch (error) {
      throw new Error('Error deleting credit product');
    }
  }
}
