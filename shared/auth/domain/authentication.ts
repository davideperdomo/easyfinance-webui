import { AuthUser } from "./authUser";

export interface Authentication {
  signUp(email: string, password: string): Promise<AuthUser>;
  login(email: string, password: string): Promise<AuthUser>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<any>;
  isAuthenticated(): boolean;
}
