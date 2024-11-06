import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfilePage from '../screens/profile/profile_page';
import WhishlistPage from '../screens/whishlist/whishlist_page';
import SearchPage from '../screens/search/search_page';
import {House, Search, BookmarkMinus, User} from 'lucide-react-native';
import {COLORS} from '../../global_style';
import HomeStack from '../screens/home/home_page';
import React from 'react';


const Tab = createBottomTabNavigator();

function NavigationComponent() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          header: props => <></>,
          tabBarIcon: ({focused, color, size}) => {
            switch (route.name) {
              case 'Home':
                return (
                  <House
                    color={
                      focused ? COLORS.gold : COLORS.black
                    }
                  />
                );
              case 'Search':
                return (
                  <Search
                    color={
                      focused ? COLORS.gold : COLORS.black
                    }
                  />
                );
              case 'Whishlist':
                return (
                  <BookmarkMinus
                    color={
                      focused ? COLORS.gold : COLORS.black
                    }
                  />
                );
              case 'Profile':
                return (
                  <User
                    color={
                      focused ? COLORS.gold : COLORS.black
                    }
                  />
                );
            }
          },
          tabBarActiveTintColor: COLORS.gold,
          tabBarInactiveTintColor: COLORS.gray,
        })}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Search" component={SearchPage} />
        <Tab.Screen name="Whishlist" component={WhishlistPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </>
  );
}

export default NavigationComponent;
