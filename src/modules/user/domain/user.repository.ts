import { AuthUid, User, UserId } from './user';
import { UserFinanceSummary } from './userFinanceSummary';

export interface UserRepository {
  create(user: User): Promise<void>;
  getByAuthUid(authUid: AuthUid): Promise<User | null>;
  getFinanceSummary(userId: UserId): Promise<UserFinanceSummary | null>;
}
