import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types pour le contexte
interface AuthContextType {
  authToken: string | null;
  signUp: (username: string, password: string, email: string) => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [authToken, setAuthToken] = useState<string | null>(
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGFlZjcwMGQ1MjU5MGMyODU4NjhhNzVmNTk0OGFkNyIsIm5iZiI6MTcyODkzOTUzNy41MDUwNywic3ViIjoiNjU2NDY2ZGI3ZGZkYTY1OTMyNjYyZGYyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.qPMTRPYliC5vwc31lkpxzcRXnTFjPTBDJvpDW9k-s-0',
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setAuthToken(token);
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const signUp = async (username: string, password: string, email: string) => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/authentication/token/new?api_key=94aef700d52590c285868a75f5948ad7',
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
    const url = 'https://api.themoviedb.org/3/authentication';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + authToken,
      },
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('error:' + err));
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
        `https://api.themoviedb.org/3/authentication/session?api_key=94aef700d52590c285868a75f5948ad7`,
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
