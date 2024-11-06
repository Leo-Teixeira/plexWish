import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_KEY, TOKEN} from '@env';

// Types pour le contexte
interface MoviesContextType {
  getMoviesByFilter: (genre: string | null) => Promise<MovieApiResponse>;
  getTopRatedMovies: () => Promise<MovieApiResponse>;
  getPopularMovies: () => Promise<MovieApiResponse>;
  getSpecificMovie: (id: string) => Promise<SpecificMovie>;
  addFavoriteMovie: (movieId: string) => Promise<void>;
  isLoading: boolean;
}

export const MoviesContext = createContext<MoviesContextType | null>(null);

const MoviesProvider = ({children}: {children: ReactNode}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadToken = () => {
      const token = TOKEN;
      setAuthToken(token);
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const getMoviesByFilter = async (
    genres: string | null,
  ): Promise<MovieApiResponse> => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + authToken,
        },
      };
      if (genres != null) {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genres}`,
          options,
        );
        const data: MovieApiResponse = await response.json();
        console.log(data);
        return data;
      } else {
        const response = await fetch(
          'https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
          options,
        );
        const data: MovieApiResponse = await response.json();
        console.log(data);
        return data;
      }
    } catch (error) {
      throw new Error('error');
    }
  };

  const getSpecificMovie = async (id: string): Promise<SpecificMovie> => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + authToken,
      },
    };
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/' + id,
        options,
      );
      const data: SpecificMovie = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error('error');
    }
  };

  const getTopRatedMovies = async (): Promise<MovieApiResponse> => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + authToken,
      },
    };
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
        options,
      );
      const data: MovieApiResponse = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error('error');
    }
  };

  const getPopularMovies = async (): Promise<MovieApiResponse> => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + authToken,
      },
    };
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        options,
      );
      const data: MovieApiResponse = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error('error');
    }
  };

  const addFavoriteMovie = async (movieId: string): Promise<void> => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + authToken,
      },
      body: JSON.stringify({
        media_type: 'movie',
        media_id: movieId,
        favorite: 'true',
      }),
    };
    try {
      await fetch(
        'https://api.themoviedb.org/3/account/20757476/favorite',
        options,
      );
    } catch (err) {
      throw new Error('error');
    }
  };

  // const getFavoriteMovie = async (): Promise<Movie[]> => {
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGFlZjcwMGQ1MjU5MGMyODU4NjhhNzVmNTk0OGFkNyIsIm5iZiI6MTcyODkzOTUzNy41MDUwNywic3ViIjoiNjU2NDY2ZGI3ZGZkYTY1OTMyNjYyZGYyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.qPMTRPYliC5vwc31lkpxzcRXnTFjPTBDJvpDW9k-s-0',
  //     },
  //   };
  //   try {
  //     const data = await fetch(
  //       'https://api.themoviedb.org/3/account/20757476/favorite/movies?language=en-US&page=1&sort_by=created_at.asc',
  //       options,
  //     );
  //   } catch (err) {
  //     throw new Error('error');
  //   }
  // };

  return (
    <MoviesContext.Provider
      value={{
        getMoviesByFilter,
        getTopRatedMovies,
        getPopularMovies,
        getSpecificMovie,
        addFavoriteMovie,
        isLoading,
      }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
