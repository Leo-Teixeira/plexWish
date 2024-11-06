import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
} from 'react-native';
import AllMoviesPage from '../home/all_movies_page';
import {COLORS} from '../../../global_style';
import MoviesGenrePage from './genres_movies_page';
import {createStackNavigator} from '@react-navigation/stack';
import SpecificFilmPage from '../film/specific_film';

const {width: screenWidth} = Dimensions.get('window');

export type RootStackParamList = {
  Home: undefined;
  Details: {film: Movie}; // Le type de données que vous passez à l'écran Details
};

const Stack = createStackNavigator<RootStackParamList>();

const HomePage = () => {
  const genres = ['All', 'Romance', 'Crime', 'Drama', 'Horror'];
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
        return <AllMoviesPage />;
      case 1:
        return <MoviesGenrePage idGenre="10749" />;
      case 2:
        return <MoviesGenrePage idGenre="80" />;
      case 3:
        return <MoviesGenrePage idGenre="18" />;
      case 4:
        return <MoviesGenrePage idGenre="27" />;
      default:
        return <AllMoviesPage />;
    }
  };

  return (
    <ScrollView>
      <View style={{width: '100%'}}>
        <View style={styles.tabBarContainer}>
          {genres.map((genre, index) => (
            <Pressable
              key={index}
              style={[
                styles.tabItem,
                {
                  backgroundColor:
                    selectedIndex === index ? COLORS.white : 'transparent',
                },
              ]}
              onPress={() => setSelectedIndex(index)}>
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      selectedIndex === index ? COLORS.black : COLORS.white,
                  },
                ]}>
                {genre}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View>{renderContent()}</View>
    </ScrollView>
  );
};

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={SpecificFilmPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
  },
  carouselItemContainer: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: screenWidth,
    resizeMode: 'cover',
  },
  tabBarContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 90,
    marginHorizontal: 10,
    zIndex: 10,
  },
  tabItem: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    borderRadius: 90,
    margin: 2,
  },
  tabText: {
    fontWeight: 'medium',
    fontSize: 10,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  pageText: {
    color: COLORS.white,
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
    color: COLORS.black,
  },
  buttonTextWhite: {
    fontWeight: 'bold',
    color: COLORS.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 64,
    marginVertical: 10,
  },
  text: {
    color: COLORS.black,
    fontSize: 16,
  },
});
