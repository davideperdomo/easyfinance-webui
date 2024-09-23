import axios from 'axios';
import { Expense, ExpensePlainData, ExpenseUserId } from '../domain/expense';
import { ExpenseRepository } from '../domain/expense.repository';

export class ApiExpenseRepository implements ExpenseRepository {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async create(expense: Expense): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/expenses`, expense.toPlainData());
    } catch (error) {
      throw new Error('Error creating expense');
    }
  }

  async getByUserId(id: ExpenseUserId): Promise<Expense[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/users/${id.value}/expenses`);
      if (response.data) {
        return response.data.map((itm: ExpensePlainData) => Expense.fromPlainData(itm));
      }
      return [];
    } catch (error) {
      throw new Error('Error fetching expenses by user ID');
    }
  }
}
