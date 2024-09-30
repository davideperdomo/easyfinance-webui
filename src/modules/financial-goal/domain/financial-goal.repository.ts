import { FinancialGoal, FinancialGoalId, UserId } from "./financial-goal";

export interface FinancialGoalCalculateParams {
  id: string;
  userId: string;
  name: string;
  criteria: string;
  goalAmount: number;
  monthlyPercentage?: number;
  goalTermDate?: string;
}

export interface FinancialGoalRepository {
  calculate(params: FinancialGoalCalculateParams): Promise<FinancialGoal>;
}