import { Income, IncomeId, IncomeUserId } from './income';

export interface IncomeRepository {
  create(income: Income): Promise<void>;
  getByUserId(id: IncomeUserId): Promise<Income[] | null>;
  delete(id: IncomeId): Promise<void>;
}
