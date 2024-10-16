import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AllMoviesPage from '../home/all_movies_page';
import {COLORS} from '../../../global_style';

const SpecificRoute = ({title}) => (
  <View style={styles.pageContainer}>
    <Text style={styles.pageText}>{title} Page</Text>
  </View>
);

const carousel = [
  {id: '1', title: 'Hawkeye', image: '../../asset/stranger.png'},
  {id: '2', title: 'Thor: Love and Thunder', image: '../../asset/stranger.png'},
  {id: '3', title: 'WandaVision', image: '../../asset/stranger.png'},
  {id: '4', title: 'The Godfather', image: '../../asset/stranger.png'},
  {id: '5', title: 'Avengers: Endgame', image: '../../asset/stranger.png'},
  {
    id: '6',
    title: 'Spider-Man: No Way Home',
    image: '../../asset/stranger.png',
  },
];

const HomePage = () => {
  const genres = ['All', 'Romance', 'Crime', 'Drama', 'Horror'];
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
        return <AllMoviesPage />;
      case 1:
        return <SpecificRoute title="Romance" />;
      case 2:
        return <SpecificRoute title="Crime" />;
      case 3:
        return <SpecificRoute title="Drama" />;
      case 4:
        return <SpecificRoute title="Horror" />;
      default:
        return <AllMoviesPage />;
    }
  };

  return (
    <ScrollView>
      <View>
        <FlatList
          data={carousel}
          renderItem={({item}) => (
            <View style={styles.carouselItem}>
              <Image
                source={require('../../asset/stranger.png')}
                style={styles.carouselImage}
              />
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          pagingEnabled={true}
        />
        {/* Position the tab bar absolutely over the image */}
        <View style={styles.tabBarContainer}>
          {genres.map((genre, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tabItem,
                {
                  backgroundColor:
                    selectedIndex === index
                      ? COLORS.background.white
                      : 'transparent',
                },
              ]}
              onPress={() => setSelectedIndex(index)}>
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      selectedIndex === index
                        ? COLORS.background.black
                        : COLORS.background.white,
                  },
                ]}>
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View>{renderContent()}</View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  carouselItem: {
    // width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  carouselImage: {
    // width: '100%',
    // height: 430,
    // borderRadius: 10,
  },
  tabBarContainer: {
    position: 'absolute', // Position the tab bar absolutely
    top: 10, // Position it at the top of the image
    left: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: '#42423F',
    borderRadius: 90,
    marginHorizontal: 10,
    zIndex: 10, // Ensure it appears above the image
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
    color: '#fff',
  },
});
