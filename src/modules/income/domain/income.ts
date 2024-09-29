export interface IncomePlainData {
  id: string;
  amount: number;
  frequency: string;
  userId: string;
  name: string;
  associatedAccountId?: string;
  fromDate?: Date;
  toDate?: Date;
}

export class Income {
  constructor(
    public id: IncomeId,
    public amount: Amount,
    public frequency: Frequency,
    public userId: IncomeUserId,
    public name: IncomeName,
    public associatedAccountId?: AssociatedAccountId,
    public fromDate?: FromDate,
    public toDate?: ToDate
  ) {}

  static fromPlainData(data: IncomePlainData): Income {
    return new Income(
      new IncomeId(data.id),
      new Amount(data.amount),
      new Frequency(data.frequency),
			new IncomeUserId(data.userId),
      new IncomeName(data.name),
      data.associatedAccountId ? new AssociatedAccountId(data.associatedAccountId) : undefined,
      data.fromDate ? new FromDate(data.fromDate) : undefined,
      data.toDate ? new ToDate(data.toDate) : undefined
    );
  }

  toPlainData(): IncomePlainData {
    return {
      id: this.id.value,
      amount: this.amount.value,
      frequency: this.frequency.value,
      userId: this.userId.value,
      name: this.name.value,
      associatedAccountId: this.associatedAccountId?.value,
      fromDate: this.fromDate?.value,
      toDate: this.toDate?.value
    };
  }
}

export class IncomeId {
  constructor(public value: string) {}
}

export class Amount {
	value: number;
	
  constructor(value: any) {
    this.value = Number(value);
  }
}

export class Frequency {
  static options = ['Monthly', 'Biweekly', 'Weekly', 'Daily', 'One Time']; // Frequency options

  constructor(public value: string) {
    if (!Frequency.options.includes(value)) {
      throw new Error(`Invalid frequency: ${value}`);
    }
  }
}

export class IncomeUserId {
  constructor(public value: string) {}
}

export class IncomeName {
  constructor(public value: string) {}
}

export class AssociatedAccountId {
  constructor(public value: string) {}
}

export class FromDate {
	value: Date;
	constructor(value: Date | string) {
		this.value = value instanceof Date ? value : new Date(value);
	}
}

export class ToDate {
	value: Date;
	constructor(value: Date | string) {
		this.value = value instanceof Date ? value : new Date(value);
	}
}