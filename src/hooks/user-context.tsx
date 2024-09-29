'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthUid, User } from '../modules/user/domain/user';
import { ApiUserRepository } from '../modules/user/infrastructure/api-user.repository';
import { useAuth } from './auth-context';

interface UserContextType {
  user?: User;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
const userRepository = new ApiUserRepository(apiUrl);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { authUser } = useAuth();

  const fetchUser = () => {
    if (authUser) {
      userRepository.getByAuthUid(
        new AuthUid(authUser?.uid)).then((userData) => {
          if (!userData) {
            throw new Error('User not found');
          }
          setUser(userData);
        }
      );
    }
  };

  useEffect(() => {
    fetchUser();
  }, [authUser]);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
