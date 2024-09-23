'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Authentication } from '../shared/auth/domain/authentication';
import { AuthUser } from '../shared/auth/domain/authUser';
import { FirebaseAuthentication } from '../shared/auth/infrastructure/firebase-authentication';

interface AuthContextType {
  authentication: Authentication;
  authUser?: AuthUser;
  refreshAuthUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const authentication = new FirebaseAuthentication();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ /*authentication,*/ children }) => {
  const [authUser, setAuthUser] = useState();

  const refreshAuthUser = () => {
    authentication.getCurrentUser().then((user) => {
      setAuthUser(user);
    });
  };

  useEffect(() => {
    refreshAuthUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authentication, authUser, refreshAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
