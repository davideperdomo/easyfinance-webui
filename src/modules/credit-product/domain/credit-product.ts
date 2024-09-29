import { Debt, DebtPlainData } from "./debt";
import { Interest, InterestPlainData } from "./interest";

export interface CreditProductPlainData {
  id: string;
  type: string;
  amount: number;
  debt: DebtPlainData;
  interest: InterestPlainData;
  userId: string;
  term?: string;
  startDate?: string;
  maturityDate?: string;
  creditLimit?: number;
  latePaymentRate?: number;
  installmentAmount?: number; // Added installmentAmount
}

export class CreditProduct {
  constructor(
    public id: CreditProductId,
    public type: CreditProductType,
    public amount: Amount,
    public debt: Debt,
    public interest: Interest,
    public userId: UserId,
    public term?: Term,
    public startDate?: string,
    public maturityDate?: string,
    public creditLimit?: number,
    public latePaymentRate?: number,
    public installmentAmount?: number
  ) {}

  static fromPlainData(data: CreditProductPlainData): CreditProduct {
    return new CreditProduct(
      new CreditProductId(data.id),
      new CreditProductType(data.type),
      new Amount(data.amount),
      Debt.fromPlainData(data.debt),
      Interest.fromPlainData(data.interest),
      new UserId(data.userId),
      data.term ? new Term(data.term) : undefined,
      data.startDate,
      data.maturityDate,
      data.creditLimit,
      data.latePaymentRate,
      data.installmentAmount // Added installmentAmount
    );
  }

  toPlainData(): CreditProductPlainData {
    return {
      id: this.id.value,
      type: this.type.value,
      amount: this.amount.value,
      debt: this.debt.toPlainData(),
      interest: this.interest.toPlainData(),
      term: this.term?.time,
      userId: this.userId.value,
      startDate: this.startDate,
      maturityDate: this.maturityDate,
      creditLimit: this.creditLimit,
      latePaymentRate: this.latePaymentRate,
      installmentAmount: this.installmentAmount, // Added installmentAmount
    };
  }
}

export class CreditProductId {
  constructor(public value: string) {}
}

export class CreditProductType {
  static options = ['credit-card', 'fixed-term-loan', 'revolving-credit'];
  constructor(public value: string) {
    this.validateOptions();
  }

  private validateOptions() {
    if (!CreditProductType.options.includes(this.value)) {
      throw new Error(`Invalid credit product type: ${this.value}`);
    }
  }
}

export class Amount {
  constructor(public value: number) {}
}

export class Term {
  constructor(public time: string) {}
}

export class UserId {
  constructor(public value: string) {}
}
