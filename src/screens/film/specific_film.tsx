import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../home/home_page';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;


interface SpecificFilm {
  film?: Movie;
}

const {width: screenWidth} = Dimensions.get('window');

export function SpecificFilmPage({ route }: { route: DetailsScreenRouteProp }) {
  const {film} = route.params;
  return (
    <View>
      <Text>Page</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://image.tmdb.org/t/p/original' + film?.poster_path,
          }}
          style={styles.image}
        />
      </View>
      <LinearGradient colors={['transparent', 'rgba(255, 255, 255, 1)']}>
        <Text>{film?.title}</Text>
        <Text>{film?.overview}</Text>
        <View>
          <Text>Rating: {film?.vote_average}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 430,
  },
});

export default SpecificFilmPage;
