import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import TabBarView from './tab_bar_view';

const AllMoviesPage = () => {
  const marvelStudios = [
    {id: '1', title: 'Hawkeye', image: '../../asset/papa.png'},
    {id: '2', title: 'Thor: Love and Thunder', image: '../../asset/papa.png'},
    {id: '3', title: 'WandaVision', image: '../../asset/papa.png'},
    {id: '4', title: 'The Godfather', image: '../../asset/papa.png'},
    {id: '5', title: 'Avengers: Endgame', image: '../../asset/papa.png'},
    {id: '6', title: 'Spider-Man: No Way Home', image: '../../asset/papa.png'},
  ];

  const renderMarvelItem = ({item}) => (
    <TouchableOpacity style={styles.marvelItem}>
      <Image source={{uri: item.image}} style={styles.marvelImage} />
      <Text style={styles.marvelTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+ Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
      </View>

      {/* Marvel Studios Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Marvel Studios</Text>
        <Text style={styles.seeMore}>See more</Text>
      </View>

      <FlatList
        data={marvelStudios}
        renderItem={renderMarvelItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.marvelList}
      />
      <FlatList
        data={marvelStudios}
        renderItem={renderMarvelItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.marvelList}
      />
      <FlatList
        data={marvelStudios}
        renderItem={renderMarvelItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.marvelList}
      />
      <FlatList
        data={marvelStudios}
        renderItem={renderMarvelItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.marvelList}
      />

      {/* Black Friday Promo */}
      <View style={styles.promoContainer}>
        <Image
          source={{uri: '../../asset/papa.png'}}
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
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  backgroundImageStyle: {
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
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
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
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
    height: 150,
    borderRadius: 10,
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
    borderRadius: 10,
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
});

export default AllMoviesPage;
