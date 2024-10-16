import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../../global_style';
import AllMoviesPage from './all_movies_page';

const SpecificRoute = ({title}) => (
  <View style={styles.pageContainer}>
    <Text style={styles.pageText}>{title} Page</Text>
  </View>
);

const TabBarView = () => {
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
    <ScrollView style={{flex: 1}}>
      {/* Image en haut de l'écran */}
      <ImageBackground
        source={require('../../asset/papa.png')} // Remplace par le chemin de ton image
        style={styles.imageContainer}
        resizeMode="cover">
        {/* Custom Tab Bar */}
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
              onPress={() => setSelectedIndex(index)} // Change the selected index
            >
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
      </ImageBackground>

      {/* Content based on selected index */}
      {renderContent()}
    </ScrollView>
  );
};

export default TabBarView;

const styles = StyleSheet.create({
  imageContainer: {
    height: '50%', // Ajuster la taille de l'image à 50% de l'écran
    width: '100%', // S'assurer que l'image prenne toute la largeur
  },
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#42423F',
    borderRadius: 90,
    margin: 10,
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
    padding: 20, // Ajouter un peu de padding si nécessaire
  },
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // S'assurer que la page prenne toute la largeur
  },
  pageText: {
    color: '#fff', // Couleur du texte pour la lisibilité sur le fond
  },
});
