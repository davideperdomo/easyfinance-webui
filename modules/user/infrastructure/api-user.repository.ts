import axios from 'axios';
import { UserRepository } from '../domain/user.repository';
import { AuthUid, User } from '../domain/user';

export class ApiUserRepository implements UserRepository {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async create(user: User): Promise<void> {
    try {
      await axios.post(`${this.apiUrl}/users`, user.toPlainData());
    } catch (error) {
      throw new Error('Error creating user: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  async getByAuthUid(authUid: AuthUid): Promise<User | null> {
    try {
      const response = await axios.get(`${this.apiUrl}/users?authUid=${authUid.value}`);
      return User.fromPlainData(response.data);
    } catch (error) {
      throw new Error('Error getting user by authUid: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }
}
