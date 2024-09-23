// Value Objects
export class ExpenseId {
	constructor(public value: string) {}
}

export class Category {
	constructor(public name: string) {}
}

export class Amount {
	constructor(public value: number) {}
}

export class Frequency {
	constructor(public period: string) {}
}

export class ExpenseUserId {
	constructor(public value: string) {}
}

// Plain Data Interface
export interface ExpensePlainData {
	id: string;
	category: string;
	amount: number;
	frequency: string;
	userId: string;
}

// Aggregate Root Class
export class Expense {
	constructor(
		public id: ExpenseId,
		public category: Category,
		public amount: Amount,
		public frequency: Frequency,
		public userId: ExpenseUserId
	) {}

	static fromPlainData(data: ExpensePlainData): Expense {
		return new Expense(
			new ExpenseId(data.id),
			new Category(data.category),
			new Amount(data.amount),
			new Frequency(data.frequency),
			new ExpenseUserId(data.userId)
		);
	}

	toPlainData(): ExpensePlainData {
		return {
			id: this.id.value,
			category: this.category.name,
			amount: this.amount.value,
			frequency: this.frequency.period,
			userId: this.userId.value
		};
	}
}


