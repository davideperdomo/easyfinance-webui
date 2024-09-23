export interface IncomePlainData {
	id: string;
	amount: number;
	frequency: string;
	userId: string;
}

export class Income {
	constructor(
		public id: IncomeId,
		public amount: Amount,
		public frequency: Frequency,
		public userId: IncomeUserId
	) {}

	static fromPlainData(data: IncomePlainData): Income {
		return new Income(
			new IncomeId(data.id),
			new Amount(data.amount),
			new Frequency(data.frequency),
			new IncomeUserId(data.userId)
		);
	}

	toPlainData(): IncomePlainData {
		return {
			id: this.id.value,
			amount: this.amount.value,
			frequency: this.frequency.period,
			userId: this.userId.value
		};
	}
}

export class IncomeId {
	constructor(public value: string) {}
}

export class Amount {
	constructor(public value: number) {}
}

export class Frequency {
	constructor(public period: string) {}
}

export class IncomeUserId {
	constructor(public value: string) {}
}