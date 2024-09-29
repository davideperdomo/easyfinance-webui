import { BankAccount, BankAccountUserId, BankAccountId } from './bankAccount';

export interface BankAccountRepository {
  save(bankAccount: BankAccount): Promise<void>;
  findByUserId(userId: BankAccountUserId): Promise<BankAccount[]>;
  delete(bankAccountId: BankAccountId): Promise<void>;
}
