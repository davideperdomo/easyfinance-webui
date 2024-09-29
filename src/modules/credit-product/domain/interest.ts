export interface InterestPlainData {
  rate: number;
  frequency: string;
  type: string;
}

export class Interest {
  constructor(
    public rate: InterestRate,
    public frequency: InterestFrequency,
    public type: InterestType
  ) {}

  static fromPlainData(data: InterestPlainData): Interest {
    return new Interest(
      new InterestRate(data.rate),
      new InterestFrequency(data.frequency),
      new InterestType(data.type)
    );
  }

  toPlainData(): InterestPlainData {
    return {
      rate: this.rate.value,
      frequency: this.frequency.value,
      type: this.type.value,
    };
  }
}

export class InterestRate {
  constructor(public value: number) {}
}

export class InterestFrequency {
  static options = ['monthly', 'yearly', 'daily'] as const;
  constructor(public value: string) {
    this.validateValue(value);
  }

  private validateValue(value: string) {
    if (!InterestFrequency.options.includes(value as any)) {
      throw new Error('Invalid interest frequency');
    }
  }
}

export class InterestType {
  static options = ['simple', 'compound'] as const;
  constructor(public value: string) {
    this.validateValue(value);
  }

  private validateValue(value: string) {
    if (!InterestType.options.includes(value as any)) {
      throw new Error('Invalid interest type');
    }
  }
}
