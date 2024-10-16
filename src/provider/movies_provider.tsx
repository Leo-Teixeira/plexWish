import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types pour le contexte
interface AuthContextType {
  getMoviesByFilter: (genre: string) => Promise<void>;
  getTopRatedMovies: () => Promise<void>;
  getPopularMovies: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
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

  const getMoviesByFilter = async (genres: string) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + authToken,
      },
    };
    if (genres != null) {
      fetch(
        'https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=' +
          genres,
        options,
      )
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    } else {
      fetch(
        'https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
        options,
      )
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    }
  };

  const getTopRatedMovies = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + authToken,
      },
    };

    fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      options,
    )
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };

  const getPopularMovies = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + authToken,
      },
    };

    fetch(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      options,
    )
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };

  return (
    <AuthContext.Provider
      value={{getMoviesByFilter, getTopRatedMovies, getPopularMovies, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
