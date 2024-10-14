import {StyleSheet} from 'react-native';

export const COLORS = {
  primary: {
    gray: '#333333',
    yellow: '#F2C94C',
    beige: '#FFF8E3',
  },
  background: {
    white: '#FFFFFF',
    black: '#000000',
    grey: '#404240',
  },
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
    backgroundColor: COLORS.primary.yellow,
  },
  buttonText: {
    color: COLORS.background.black,
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
