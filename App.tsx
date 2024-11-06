import React, {useContext} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import NavigationComponent from './src/components/navigation_component';
import {AuthContext} from './src/provider/auth_provider';
import AuthProvider from './src/provider/auth_provider';
import MoviesProvider from './src/provider/movies_provider';
import LoginScreen from './src/screens/login/login_page';
import {NavigationContainer} from '@react-navigation/native';

const AppNavigator = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const {authToken} = authContext;

  return <>{authToken ? <NavigationComponent /> : <LoginScreen />}</>;
};

function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MoviesProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </MoviesProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
