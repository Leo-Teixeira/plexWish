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

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const {width: screenWidth} = Dimensions.get('window');

export function SpecificFilmPage({route}: {route: DetailsScreenRouteProp}) {
  const navigation = useNavigation();
  const {getSpecificMovie} = useContext(MoviesContext)!;
  const [movie, setMovie] = useState<SpecificMovie>();
  const {film} = route.params;

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

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

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  function concatenateText(items: Genre[] | undefined) {
    if (items == undefined) {
      return '';
    }
    let result = '';

    for (let i = 0; i < items.length; i++) {
      result += items[i].name;

      if (i < items.length - 1) {
        result += '/';
      }
    }

    return result;
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
        ]}>
        {movie?.status}
      </Text>
      <View style={styles.bodyContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{movie?.title}</Text>
          <View style={styles.note}>
            <Star color={COLORS.darkGold} fill={COLORS.darkGold} />
            <Text style={styles.vote}>{movie?.vote_average}</Text>
          </View>
        </View>
        <View style={styles.info_date_genre}>
          <Text style={styles.text}>{movie?.release_date}</Text>
          <Text style={styles.text}>•</Text>
          <Text style={styles.text}>{concatenateText(movie?.genres)}</Text>
        </View>
        <Pressable style={styles.button}>
          <Play color={COLORS.black} fill={COLORS.black} />
          <Text style={globalStyles.buttonText}>Play Film</Text>
        </Pressable>
        <View>
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 4}
            style={styles.text}>
            {movie?.overview}
          </Text>

          {lengthMore ? (
            <Text onPress={toggleNumberOfLines} style={styles.readMore}>
              {textShown ? 'Read less...' : 'Read more...'}
            </Text>
          ) : null}
        </View>
        <View style={styles.info_date_genre}>
          <Pressable style={styles.button_row}>
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

  title: {
    color: '#000000',
    fontSize: 32,
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  note: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },

  vote: {
    color: COLORS.darkGold,
    fontSize: 16,
  },

  listGenre: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  status: {
    position: 'absolute',
    top: 380,
    width: '25%',
    padding: 8,
    margin: 8,
    color: COLORS.black,
    borderRadius: 8,
    textAlign: 'center',
  },

  genreText: {
    color: COLORS.white,
    fontSize: 12,
  },

  text: {
    color: COLORS.black,
    fontSize: 16,
  },

  info_date_genre: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
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
    alignContent: 'flex-start',
  },

  blurBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.3)', // gris transparent pour le fond
  },
});

export default SpecificFilmPage;
