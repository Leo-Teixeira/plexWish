import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import {MoviesContext} from '../../provider/movies_provider';
import {LinearGradient} from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './home_page';
import {COLORS} from '../../../global_style';
import {useDarkMode} from '../../provider/dark_provider';

const {width: screenWidth} = Dimensions.get('window');

type AllMoviesPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

export function AllMoviesPage() {
  const navigation = useNavigation<AllMoviesPageNavigationProp>();
  const {getMoviesByFilter, getTopRatedMovies} = useContext(MoviesContext)!;
  const [allMovies, setAllMovies] = useState<MovieApiResponse>();
  const [bestMovies, setBestMovies] = useState<MovieApiResponse>();
  const {darkMode} = useDarkMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allMovies = await getMoviesByFilter(null);
        const bestMovies = await getTopRatedMovies();
        setAllMovies(allMovies);
        setBestMovies(bestMovies);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const renderAllItem = ({item}: {item: Movie}) => (
    <Pressable
      style={styles.marvelItem}
      onPress={() => navigation.navigate('Details', {film: item})}>
      <Image
        source={{uri: 'https://image.tmdb.org/t/p/original' + item.poster_path}}
        style={styles.marvelImage}
      />
      <Text style={[styles.marvelTitle, darkMode && styles.darkText]}>
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
        data={bestMovies?.results}
        renderItem={({item}) => (
          <View style={styles.carouselItemContainer}>
            <Image
              source={{
                uri: 'https://image.tmdb.org/t/p/original' + item.poster_path,
              }}
              style={styles.carouselImage}
            />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={true}
        pagingEnabled
      />

      <LinearGradient
        colors={
          darkMode
            ? ['transparent', 'rgba(0, 0, 0, 0.8)']
            : ['transparent', 'rgba(255, 255, 255, 1)']
        }
        style={styles.overlayContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, darkMode && styles.darkText]}>
            My List
          </Text>
          <Text style={[styles.text, darkMode && styles.darkText]}>
            Discover
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.buttonBlack}>
            <Text style={styles.buttonTextWhite}>+ Wishlist</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text
              style={[styles.buttonText, darkMode && styles.darkButtonText]}>
              Details
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
      <View style={styles.bodyContainer}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            All Movies Genre
          </Text>
          <Text style={styles.seeMore}>See more</Text>
        </View>

        <FlatList
          data={allMovies?.results}
          renderItem={renderAllItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.marvelList}
        />

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Best Movies
          </Text>
          <Text style={styles.seeMore}>See more</Text>
        </View>

        <FlatList
          data={bestMovies?.results}
          renderItem={renderAllItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.marvelList}
        />

        {/* Black Friday Promo */}
        <View
          style={[
            styles.promoContainer,
            darkMode && styles.blackPromoContainer,
          ]}>
          <Image
            source={require('../../core/asset/black_friday.png')}
            style={styles.promoImage}
          />
          <Text style={[styles.promoTitle, darkMode && styles.darkText]}>
            Black Friday is here!
          </Text>
          <Text style={[styles.promoDescription, darkMode && styles.darkText]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel
            pulvinar auctor.
          </Text>
          <Pressable style={styles.promoButton}>
            <Text
              style={[
                styles.promoButtonText,
                darkMode && styles.darkButtonText,
              ]}>
              Check details
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 340,
    width: screenWidth,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 16,
    zIndex: 9999,
  },
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: COLORS.white,
  },
  darkContainer: {
    backgroundColor: COLORS.black,
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeMore: {
    fontSize: 14,
    color: COLORS.gold,
  },
  marvelList: {
    paddingVertical: 10,
  },
  marvelItem: {
    marginRight: 10,
    width: 120,
  },
  marvelImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  marvelTitle: {
    textAlign: 'center',
    marginTop: 5,
    color: COLORS.black,
  },
  promoContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  blackPromoContainer: {
    backgroundColor: COLORS.black,
  },
  promoImage: {
    width: '100%',
    height: 150,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: COLORS.black,
  },
  promoDescription: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 10,
  },
  promoButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoButtonText: {
    fontWeight: 'bold',
    color: COLORS.white,
  },
  carouselItemContainer: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: 430,
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.gold,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBlack: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: COLORS.white,
    fontSize: 16,
  },
  buttonTextWhite: {
    fontWeight: 'bold',
    color: COLORS.white,
    fontSize: 16,
  },
  darkText: {
    color: COLORS.white,
  },
  darkButtonText: {
    color: COLORS.black,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: screenWidth * 0.9,
    height: 48,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 64,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
  },
});

export default AllMoviesPage;
