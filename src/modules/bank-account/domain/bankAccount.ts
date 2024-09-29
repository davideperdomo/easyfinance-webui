export interface BankAccountPlainData {
  id: string;
  type: string;
  financialInstitution: string;
  balance: number;
  userId: string;
  associatedIncome?: string;
}

export class BankAccount {
  constructor(
    public id: BankAccountId,
    public type: string,
    public financialInstitution: string,
    public balance: Balance,
    public userId: BankAccountUserId,
    public associatedIncome?: BankAccountId
  ) {}

  static fromPlainData(data: BankAccountPlainData): BankAccount {
    return new BankAccount(
      new BankAccountId(data.id),
      data.type,
      data.financialInstitution,
      new Balance(data.balance),
      new BankAccountUserId(data.userId),
      data.associatedIncome ? new BankAccountId(data.associatedIncome) : undefined
    );
  }

  toPlainData(): BankAccountPlainData {
    return {
      id: this.id.value,
      type: this.type,
      financialInstitution: this.financialInstitution,
      balance: this.balance.amount,
      userId: this.userId.value,
      associatedIncome: this.associatedIncome?.value
    };
  }
}

export class BankAccountId {
  constructor(public value: string) {}
}

export class BankAccountUserId {
  constructor(public value: string) {}
}

export class Balance {
  constructor(public amount: number) {}
}
