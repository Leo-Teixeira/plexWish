import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {MoviesContext} from '../../provider/movies_provider';
import {LinearGradient} from 'react-native-linear-gradient';
const {width: screenWidth} = Dimensions.get('window');

export function AllMoviesPage() {
  const {getMoviesByFilter, getTopRatedMovies} = useContext(MoviesContext)!;
  const [allMovies, setAllMovies] = useState<MovieApiResponse>();
  const [bestMovies, setBestMovies] = useState<MovieApiResponse>();

  const carousel = [
    {id: '1', title: 'Hawkeye', image: '../../asset/stranger.png'},
    {
      id: '2',
      title: 'Thor: Love and Thunder',
      image: '../../asset/stranger.png',
    },
    {id: '3', title: 'WandaVision', image: '../../asset/stranger.png'},
    {id: '4', title: 'The Godfather', image: '../../asset/stranger.png'},
    {id: '5', title: 'Avengers: Endgame', image: '../../asset/stranger.png'},
    {
      id: '6',
      title: 'Spider-Man: No Way Home',
      image: '../../asset/stranger.png',
    },
  ];

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
    <TouchableOpacity style={styles.marvelItem}>
      <Image
        source={{uri: 'https://image.tmdb.org/t/p/original' + item.poster_path}}
        style={styles.marvelImage}
      />
      <Text style={styles.marvelTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />

      <LinearGradient
        colors={['transparent', 'rgba(255, 255, 255, 1)']}
        style={styles.overlayContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>My List</Text>
          <Text style={styles.text}>Discover</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonBlack}>
            <Text style={styles.buttonTextWhite}>+ Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.bodyContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Movies Genre</Text>
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
          <Text style={styles.sectionTitle}>Best Movies</Text>
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
        <View style={styles.promoContainer}>
          <Image
            source={require('../../asset/black_friday.png')}
            style={styles.promoImage}
          />
          <Text style={styles.promoTitle}>Black Friday is here!</Text>
          <Text style={styles.promoDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel
            pulvinar auctor.
          </Text>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Check details</Text>
          </TouchableOpacity>
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
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 16,
    zIndex: 9999,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeMore: {
    fontSize: 14,
    color: '#FFD700',
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
  },
  promoContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  promoImage: {
    width: '100%',
    height: 150,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  promoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  promoButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoButtonText: {
    fontWeight: 'bold',
    color: '#000',
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
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBlack: {
    flex: 1,
    backgroundColor: '#333333',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 16,
  },
  buttonTextWhite: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 16,
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
    color: '#000000',
    fontSize: 16,
  },
});

export default AllMoviesPage;
