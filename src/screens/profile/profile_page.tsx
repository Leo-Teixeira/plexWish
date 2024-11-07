import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Switch,
  StyleSheet,
  Pressable,
  BackHandler,
} from 'react-native';
import {useDarkMode} from '../../provider/dark_provider';
import {COLORS, globalStyles} from '../../../global_style';

const ProfilePage = () => {
  const {darkMode, toggleDarkMode} = useDarkMode();

  return (
    <View
      style={[
        styles.container,
        darkMode ? styles.darkContainer : styles.lightContainer,
      ]}>
      <Text
        style={[styles.title, darkMode ? styles.darkText : styles.lightText]}>
        Mon Profil
      </Text>

      <View style={styles.row}>
        <Text
          style={[styles.label, darkMode ? styles.darkText : styles.lightText]}>
          Mode Sombre
        </Text>
        <Switch
          trackColor={{false: COLORS.gray, true: COLORS.gold}}
          thumbColor={darkMode ? COLORS.darkGold : COLORS.darkGray}
          value={darkMode}
          onValueChange={toggleDarkMode}
        />
      </View>
      <Pressable
        style={globalStyles.button}
        onPress={() => BackHandler.exitApp()}>
        <Text style={globalStyles.buttonText}>Déconnexion</Text>
      </Pressable>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  lightContainer: {
    backgroundColor: COLORS.white,
  },
  darkContainer: {
    backgroundColor: COLORS.black,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lightText: {
    color: COLORS.black,
  },
  darkText: {
    color: COLORS.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
  },
});
