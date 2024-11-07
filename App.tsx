import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthProvider from './src/provider/auth_provider';
import MoviesProvider from './src/provider/movies_provider';
import LoginScreen from './src/screens/login/login_page';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {DarkModeProvider} from './src/provider/dark_provider';

function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MoviesProvider>
          <NavigationContainer>
            <DarkModeProvider>
              <LoginScreen />
            </DarkModeProvider>
          </NavigationContainer>
        </MoviesProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
