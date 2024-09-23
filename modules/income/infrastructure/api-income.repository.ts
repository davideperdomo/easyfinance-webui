import axios from 'axios';
import { Income, IncomePlainData, IncomeUserId } from '../domain/income';
import { IncomeRepository } from '../domain/income.repository';

export class ApiIncomeRepository implements IncomeRepository {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async create(income: Income): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/incomes`, income.toPlainData());
    } catch (error) {
      throw new Error('Error creating income');
    }
  }

  async getByUserId(id: IncomeUserId): Promise<Income[] | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/users/${id.value}/incomes`);
      if (response.data) {
        return response.data.map((itm: IncomePlainData) => Income.fromPlainData(itm));
      }
      return null;
    } catch (error) {
      throw new Error('Error fetching income by user ID');
    }
  }
}

