import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import AllMoviesPage from '../home/all_movies_page';
import {COLORS} from '../../../global_style';

const {width: screenWidth} = Dimensions.get('window');

const SpecificRoute = ({title}) => (
  <View style={styles.pageContainer}>
    <Text style={styles.pageText}>{title} Page</Text>
  </View>
);

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
      <View style={{width: '100%'}}>
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
    backgroundColor: '#42423F',
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
    color: '#fff',
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
    color: '#000',
  },
  buttonTextWhite: {
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    color: '#000000',
    fontSize: 16,
  },
});
