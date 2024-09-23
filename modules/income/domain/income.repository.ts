import { Income, IncomeUserId } from '../domain/income';

export interface IncomeRepository {
  create(income: Income): Promise<void>;
  getByUserId(id: IncomeUserId): Promise<Income[] | null>;
}
