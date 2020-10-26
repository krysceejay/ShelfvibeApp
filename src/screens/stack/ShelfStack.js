import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Details from '../club/Details';
import Rating from '../shelf/Rating';
import AllRatings from '../shelf/AllRatings';
import Club from '../club/Club';

const Stack = createStackNavigator();

const ShelfStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Club"
      screenOptions={({route}) => ({
        headerTitleStyle: {
          fontFamily: 'Nunito-Regular',
          fontSize: 20,
        },
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerTitleAlign: 'left',
        headerRight: () => {
          return (
            <Ionicons
              name="md-search"
              size={30}
              style={{paddingRight: 20, color: '#000'}}
            />
          );
        },
      })}>
      <Stack.Screen name="Clubs" component={Club} />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Rating" component={Rating} />
      <Stack.Screen name="All Ratings" component={AllRatings} />
    </Stack.Navigator>
  );
};

export default ShelfStack;

const styles = StyleSheet.create({});
