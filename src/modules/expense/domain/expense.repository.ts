import { Expense, ExpenseUserId, ExpenseId } from './expense';

export interface ExpenseRepository {
  create(expense: Expense): Promise<void>;
  getByUserId(userId: ExpenseUserId): Promise<Expense[]>;
  delete(id: ExpenseId): Promise<void>;
}
