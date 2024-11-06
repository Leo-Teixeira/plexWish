import {StyleSheet} from 'react-native';

export const COLORS = {
  transparent: 'transparent',
  white: '#FFFFFF',
  gold: '#FFD700',
  lightGray: '#f2f2f2',
  gray: '#666666',
  black: '#000000',
  darkGray: '#333333',
  darkGold: '#DAA520',
};

export const globalStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 52,
  },
  input: {
    width: '100%',
    maxWidth: 400,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    maxWidth: 400,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.gold,
  },
  buttonText: {
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    fontSize: 14,
  },
});
