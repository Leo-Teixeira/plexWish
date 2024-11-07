import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import {MoviesContext} from '../../provider/movies_provider';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './home_page';
import {useDarkMode} from '../../provider/dark_provider';
import {COLORS} from '../../../global_style';

const {width: screenWidth} = Dimensions.get('window');

interface MoviesGenrePageProps {
  idGenre: string;
}

type AllMoviesPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

export const MoviesGenrePage: React.FC<MoviesGenrePageProps> = ({idGenre}) => {
  const navigation = useNavigation<AllMoviesPageNavigationProp>();
  const {getMoviesByFilter} = useContext(MoviesContext)!;
  const {darkMode} = useDarkMode();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await getMoviesByFilter(idGenre);
        setMovies(moviesData.results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [idGenre]);

  const renderMovieItem = ({item}: {item: Movie}) => (
    <Pressable
      style={[styles.movieItem, darkMode && styles.darkMovieItem]}
      onPress={() => navigation.navigate('Details', {film: item})}>
      <Image
        source={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}}
        style={styles.movieImage}
      />
      <Text
        style={[styles.movieTitle, darkMode && styles.darkText]}
        numberOfLines={1}>
        {item.title}
      </Text>
    </Pressable>
  );

  return (
    <View
      style={[
        styles.container,
        darkMode ? styles.darkContainer : styles.lightContainer,
      ]}>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64
  },
  lightContainer: {
    backgroundColor: COLORS.white,
  },
  darkContainer: {
    backgroundColor: COLORS.black,
  },
  listContent: {
    paddingBottom: 16,
  },
  movieItem: {
    flex: 1,
    margin: 8,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    width: (screenWidth - 48) / 2,
  },
  darkMovieItem: {
    backgroundColor: COLORS.black,
  },
  movieImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  movieTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 4,
    color: COLORS.black,
  },
  darkText: {
    color: COLORS.white,
  },
});

export default MoviesGenrePage;
