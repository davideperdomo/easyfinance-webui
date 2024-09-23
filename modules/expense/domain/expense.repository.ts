 
import { Expense, ExpenseUserId } from '../domain/expense';

export interface ExpenseRepository {
  create(expense: Expense): Promise<void>;
  getByUserId(userId: ExpenseUserId): Promise<Expense[]>;
}
