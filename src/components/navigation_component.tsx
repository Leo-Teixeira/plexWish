import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfilePage from '../screens/profile/profile_page';
import WhishlistPage from '../screens/whishlist/whishlist_page';
import SearchPage from '../screens/search/search_page';
import {NavigationContainer} from '@react-navigation/native';
import {House, Search, BookmarkMinus, User} from 'lucide-react-native';
import {COLORS} from '../../global_style';
import AllMoviesPage from '../screens/home/all_movies_page';
import HomePage from '../screens/home/home_page';

const Tab = createBottomTabNavigator();

function NavigationComponent() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          header: props => <></>,
          tabBarIcon: ({focused, color, size}) => {
            switch (route.name) {
              case 'Home':
                return (
                  <House
                    color={
                      focused ? COLORS.primary.yellow : COLORS.background.black
                    }
                  />
                );
              case 'Search':
                return (
                  <Search
                    color={
                      focused ? COLORS.primary.yellow : COLORS.background.black
                    }
                  />
                );
              case 'Whishlist':
                return (
                  <BookmarkMinus
                    color={
                      focused ? COLORS.primary.yellow : COLORS.background.black
                    }
                  />
                );
              case 'Profile':
                return (
                  <User
                    color={
                      focused ? COLORS.primary.yellow : COLORS.background.black
                    }
                  />
                );
            }
          },
          tabBarActiveTintColor: COLORS.primary.yellow,
          tabBarInactiveTintColor: COLORS.primary.gray,
        })}>
        <Tab.Screen name="Home" component={SearchPage} />
        <Tab.Screen name="Search" component={SearchPage} />
        <Tab.Screen name="Whishlist" component={WhishlistPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default NavigationComponent;
