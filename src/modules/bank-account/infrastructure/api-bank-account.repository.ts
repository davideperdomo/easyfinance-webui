import axios from 'axios';
import { BankAccount, BankAccountId, BankAccountUserId } from '../domain/bankAccount';
import { BankAccountRepository } from '../domain/bankAccount.repository';

export class ApiBankAccountRepository implements BankAccountRepository {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async save(bankAccount: BankAccount): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/bank-accounts`, bankAccount.toPlainData());
    } catch (error) {
      throw new Error('Error saving bank account');
    }
  }

  async findByUserId(userId: BankAccountUserId): Promise<BankAccount[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/users/${userId.value}/bank-accounts`);
      if (response.data) {
        return response.data.map((item: any) => BankAccount.fromPlainData(item));
      }
      return [];
    } catch (error) {
      throw new Error('Error fetching bank accounts by user ID');
    }
  }

  async delete(bankAccountId: BankAccountId): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/bank-accounts/${bankAccountId.value}`);
    } catch (error) {
      throw new Error('Error deleting bank account');
    }
  }
}
