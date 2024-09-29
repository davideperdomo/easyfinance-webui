export class UserFinanceSummary {
  constructor(
    public userId: string,
    public totalIncome: number,
    public totalExpense: number,
    public balance: number
  ) {}

  static fromPlainData(data: {
    userId: string;
    totalIncome: number;
    totalExpense: number;
    balance: number;
  }): UserFinanceSummary {
    return new UserFinanceSummary(
      data.userId,
      Number(data.totalIncome),
      Number(data.totalExpense),
      Number(data.balance)
    );
  }
}