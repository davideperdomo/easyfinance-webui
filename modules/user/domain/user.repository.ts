import { AuthUid, User, UserId } from '../domain/user';

export interface UserRepository {
  create(user: User): Promise<void>;
  getByAuthUid(authUid: AuthUid): Promise<User | null>;
}
