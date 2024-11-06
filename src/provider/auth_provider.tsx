import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_KEY, TOKEN} from '@env';
interface AuthContextType {
  authToken: string | null;
  signUp: (username: string, password: string, email: string) => Promise<void>;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [authToken, setAuthToken] = useState<string | null>(TOKEN);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const signUp = async (username: string, password: string, email: string) => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/authentication/token/new?api_key=' +
          API_KEY,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username,
            password,
            email,
          }),
        },
      );
      const data = await response.json();
      if (data.success) {
        setAuthToken(data.request_token);
        await AsyncStorage.setItem('authToken', data.request_token);
      } else {
        throw new Error(data.status_message || 'Error signing up');
      }
    } catch (error) {
      console.error('Sign Up Error:', error);
    }
  };

  const signIn = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + authToken,
      },
    };

    const response = await fetch(
      'https://api.themoviedb.org/3/authentication',
      options,
    );
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setAuthToken(null);
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/session?api_key=` +
          API_KEY,
        {
          method: 'GET',
          headers: {Authorization: `Bearer ${authToken}`},
        },
      );
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Check Auth Error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{authToken, signUp, signIn, signOut, checkAuth, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
