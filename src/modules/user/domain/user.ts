export interface UserPlainData {
	id: string;
	name: string;
	email: string;
	authUid: string;
}

export class User {
	constructor(
		public id: UserId,
		public name: Name,
		public email: Email,
		public authUid: AuthUid
	) {}

	static fromPlainData(data: UserPlainData): User {
		return new User(
			new UserId(data.id),
			new Name(data.name),
			new Email(data.email),
			new AuthUid(data.authUid)
		);
	}

	toPlainData(): UserPlainData {
		return {
			id: this.id.value,
			name: this.name.value,
			email: this.email.value,
			authUid	: this.authUid.value
		};
	}
}

export class UserId {
	constructor(public value: string) {}
}

export class Name {
	constructor(public value: string) {}
}

export class Email {
	constructor(public value: string) {}
}

export class AuthUid {
	constructor(public value: string) {}
}
