import {StyleSheet} from 'react-native';
import {COLORS} from '../../../global_style';

export const styles = StyleSheet.create({
  connectionButton: {
    width: '100%',
    display: 'flex',
    gap: 8,
  },
  togglePasswordButton: {
    position: 'absolute',
    right: 20,
    top: '20%',
    color: COLORS.background.black,
  },
  passwordContainer: {
    width: '100%',
    maxWidth: 400,
    position: 'relative',
  },
});
