import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfilePage from '../screens/profile/profile_page';
import WhishlistPage from '../screens/whishlist/whishlist_page';
import SearchPage from '../screens/search/search_page';
import {House, Search, BookmarkMinus, User} from 'lucide-react-native';
import {COLORS} from '../../global_style';
import HomeStack from '../screens/home/home_page';
import React from 'react';
import {useDarkMode} from '../provider/dark_provider';

const Tab = createBottomTabNavigator();

function NavigationComponent() {
  const {darkMode} = useDarkMode();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        header: () => null,
        tabBarStyle: {
          backgroundColor: darkMode ? COLORS.black : COLORS.white,
        },
        tabBarIcon: ({focused}) => {
          const color = focused
            ? COLORS.gold
            : darkMode
            ? COLORS.white
            : COLORS.black;
          switch (route.name) {
            case 'Home':
              return <House color={color} />;
            case 'Search':
              return <Search color={color} />;
            case 'Whishlist':
              return <BookmarkMinus color={color} />;
            case 'Profile':
              return <User color={color} />;
          }
        },
        tabBarActiveTintColor: COLORS.gold,
        tabBarInactiveTintColor: darkMode ? COLORS.white : COLORS.black,
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="Whishlist" component={WhishlistPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}

export default NavigationComponent;
