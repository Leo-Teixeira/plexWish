import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../home/home_page';
import {MoviesContext} from '../../provider/movies_provider';
import {COLORS, globalStyles} from '../../../global_style';
import {
  Star,
  Play,
  BookHeart,
  ThumbsUp,
  Send,
  ArrowLeft,
} from 'lucide-react-native';
import {BlurView} from '@react-native-community/blur';
import {useDarkMode} from '../../provider/dark_provider';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export function SpecificFilmPage({route}: {route: DetailsScreenRouteProp}) {
  const navigation = useNavigation();
  const {getSpecificMovie, addFavoriteMovie} = useContext(MoviesContext)!;
  const {darkMode} = useDarkMode();
  const [movie, setMovie] = useState<SpecificMovie>();
  const {film} = route.params;

  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const toggleNumberOfLines = () => setTextShown(!textShown);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movie_detail = await getSpecificMovie(film.id.toString());
        setMovie(movie_detail);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  async function handleFavorite(movieId: string) {
    await addFavoriteMovie(movieId);
  }

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);

  function concatenateText(items: Genre[] | undefined) {
    if (!items) return '';
    return items.map(item => item.name).join('/');
  }

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://image.tmdb.org/t/p/original' + movie?.poster_path,
          }}
          style={styles.image}
        />
        <Pressable
          style={styles.buttonReturn}
          onPress={() => navigation.goBack()}>
          <BlurView
            style={styles.blurBackground}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="gray">
            <ArrowLeft color={COLORS.white} />
          </BlurView>
        </Pressable>
      </View>
      <Text
        style={[
          styles.status,
          {
            backgroundColor:
              movie?.status === 'Released'
                ? 'green'
                : movie?.status === 'In Production'
                ? 'orange'
                : movie?.status === 'Canceled'
                ? 'red'
                : 'gray',
          },
          darkMode && styles.darkText,
        ]}>
        {movie?.status}
      </Text>
      <View style={styles.note}>
            <Star color={COLORS.darkGold} fill={COLORS.darkGold} />
            <Text style={[styles.vote, darkMode && styles.darkText]}>
              {movie?.vote_average}
            </Text>
          </View>
      <View
        style={[styles.bodyContainer, darkMode && styles.darkBodyContainer]}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, darkMode && styles.darkText]}>
            {movie?.title}
          </Text>
          
        </View>
        <View>
          <Text style={[styles.text, darkMode && styles.darkText]}>
            {movie?.release_date}
          </Text>

          <Text style={[styles.text, darkMode && styles.darkText]}>
            {concatenateText(movie?.genres)}
          </Text>
        </View>
        <Pressable style={styles.button}>
          <Play color={COLORS.black} fill={COLORS.black} />
          <Text style={globalStyles.buttonText}>Play Film</Text>
        </Pressable>
        <View>
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 4}
            style={[styles.text, darkMode && styles.darkText]}>
            {movie?.overview}
          </Text>
          {lengthMore && (
            <Text
              onPress={toggleNumberOfLines}
              style={[styles.readMore, darkMode && styles.darkText]}>
              {textShown ? 'Read less...' : 'Read more...'}
            </Text>
          )}
        </View>
        <View style={styles.button_list}>
          <Pressable
            style={styles.button_row}
            onPress={() => handleFavorite(movie!.id.toString())}>
            <BookHeart color={COLORS.black} />
            <Text style={globalStyles.buttonText}>Favorite</Text>
          </Pressable>
          <Pressable style={styles.button_row}>
            <ThumbsUp color={COLORS.black} />
            <Text style={globalStyles.buttonText}>Like</Text>
          </Pressable>
          <Pressable style={styles.button_row}>
            <Send color={COLORS.black} />
            <Text style={globalStyles.buttonText}>Send</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
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
  bodyContainer: {
    padding: 16,
    gap: 16,
  },
  darkBodyContainer: {
    backgroundColor: COLORS.black,
  },
  title: {
    color: COLORS.black,
    fontSize: 32,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  note: {
    flexDirection: 'row',
    gap: 8,
    position: 'absolute',
    left: screenWidth * 0.78,
    top: screenHeight * 0.51,
    color: COLORS.black,
    borderRadius: 8,
    textAlign: 'center',
  },
  vote: {
    color: COLORS.white,
    fontSize: 16,
  },
  status: {
    position: 'absolute',
    top: screenHeight * 0.49,
    width: '25%',
    padding: 8,
    margin: 8,
    color: COLORS.black,
    borderRadius: 8,
    textAlign: 'center',
  },
  darkText: {
    color: COLORS.white,
  },
  text: {
    color: COLORS.black,
    fontSize: 16,
  },
  button_list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    maxWidth: 400,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.gold,
  },
  readMore: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 14,
  },
  button_row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    width: '32%',
    maxWidth: 400,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.gold,
  },
  buttonReturn: {
    position: 'absolute',
    top: 25,
    right: screenWidth * 0.85,
    width: 40,
    height: 40,
    borderRadius: 25,
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  blurBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
  },
  darkButtonText: {
    color: COLORS.white,
  },
});

export default SpecificFilmPage;
