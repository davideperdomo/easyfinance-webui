import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { Authentication } from '../domain/authentication';
import { auth } from './firebase-auth-config';
import { AuthUser } from '../domain/authUser';

export class FirebaseAuthentication implements Authentication {
  private auth = auth;
  
  async signUp(email: string, password: string): Promise<AuthUser> {
    const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
    
    return {
      uid: user.uid,
      email: user?.email ?? undefined,
    }
  }

  async login(email: string, password: string): Promise<AuthUser> {
    const { user } = await signInWithEmailAndPassword(this.auth, email, password);
  
    return {
      uid: user.uid,
      email: user?.email ?? undefined,
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async getCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }

  isAuthenticated(): boolean {
    return this.auth.currentUser !== null;
  }
}
