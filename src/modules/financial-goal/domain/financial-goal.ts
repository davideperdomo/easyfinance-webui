export interface FinancialGoalPlainData {
  id: string;
  name: string;
  goalAmount: number;
  goalTerm?: string;
  calculationCriteria: string;
  monthlyPercentage?: number;
  monthlyAmount: number;
  userId: string;
  startDate: string;
}

export class FinancialGoal {
  constructor(
    public id: FinancialGoalId,
    public name: FinancialGoalName,
    public goalAmount: Amount,
    public calculationCriteria: FinancialGoalCalculationCriteria,
    public monthlyAmount: Amount,
    public userId: UserId,
    public startDate: FinancialGoalStartDate,
    public goalTerm?: FinancialGoalTerm,
    public monthlyPercentage?: FinancialMonthlyPercentage,
  ) {}

  static fromPlainData(data: FinancialGoalPlainData): FinancialGoal {
    return new FinancialGoal(
      new FinancialGoalId(data.id),
      new FinancialGoalName(data.name),
      new Amount(data.goalAmount),
      new FinancialGoalCalculationCriteria(data.calculationCriteria),
      new Amount(data.monthlyAmount),
      new UserId(data.userId),
      new FinancialGoalStartDate(new Date(data.startDate)),
      data.goalTerm ? new FinancialGoalTerm(data.goalTerm) : undefined,
      data.monthlyPercentage ? new FinancialMonthlyPercentage(data.monthlyPercentage) : undefined,
    );
  }

  toPlainData(): FinancialGoalPlainData {
    return {
      id: this.id.value,
      name: this.name.value,
      goalAmount: this.goalAmount.value,
      goalTerm: this.goalTerm?.time,
      calculationCriteria: this.calculationCriteria.value,
      monthlyPercentage: this.monthlyPercentage?.value,
      monthlyAmount: this.monthlyAmount.value,
      userId: this.userId.value,
      startDate: this.startDate.value.toISOString(),
    };
  }
}

export class FinancialGoalId {
  constructor(public value: string) {}
}

export class FinancialGoalName {
  constructor(public value: string) {}
}

export class FinancialGoalCalculationCriteria {
  static options = ['percentage', 'date'];
  static criterias = {
    percentage: 'percentage',
    date: 'date'
  } as const; 
  
  constructor(public value: string) {
    this.validate(value);
  }
  validate(value: string): void {
    if (!FinancialGoalCalculationCriteria.options.includes(value)) {
      throw new Error('Invalid calculation criteria');
    }
  }
}

export class Amount {
  constructor(public value: number) {}
}

export class FinancialGoalTerm {
  constructor(public time: string) {}
}

export class UserId {
  constructor(public value: string) {}
}

export class FinancialMonthlyPercentage {
  constructor(public value: number) {}
}

export class FinancialGoalStartDate {
  constructor(public value: Date) {}
}