export interface DebtPlainData {
  total: number;
  capital: number;
  interest: number;
  late: number;
}

export class Debt {
  constructor(
    public total: DebtAmount,
    public capital: DebtAmount,
    public interest: DebtAmount,
    public late: DebtAmount
  ) {}

  static fromPlainData(data: DebtPlainData): Debt {
    return new Debt(
      new DebtAmount(data.total),
      new DebtAmount(data.capital),
      new DebtAmount(data.interest),
      new DebtAmount(data.late)
    );
  }

  toPlainData(): DebtPlainData {
    return {
      total: this.total.value,
      capital: this.capital.value,
      interest: this.interest.value,
      late: this.late.value,
    };
  }
}

export class DebtAmount {
  constructor(public value: number) {}
}
