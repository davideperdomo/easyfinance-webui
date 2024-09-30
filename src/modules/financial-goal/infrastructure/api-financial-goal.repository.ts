import axios from 'axios';
import { FinancialGoal, FinancialGoalId, UserId } from '../domain/financial-goal';
import { FinancialGoalRepository, FinancialGoalCalculateParams } from '../domain/financial-goal.repository';

export class ApiFinancialGoalRepository implements FinancialGoalRepository {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async calculate(params: FinancialGoalCalculateParams): Promise<FinancialGoal> {
    try {
      const response = await axios.post(`${this.baseUrl}/financial-goals/calculate`, params);
      return FinancialGoal.fromPlainData(response.data);
    } catch (error) {
      throw new Error('Error calculating financial goal');
    }
  }
}
