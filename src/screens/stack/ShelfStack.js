import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Shelf from '../shelf/Shelf';
import Details from '../shelf/Details';
import Rating from '../shelf/Rating';
import AllRatings from '../shelf/AllRatings';

const Stack = createStackNavigator();

const ShelfStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Shelf"
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
      <Stack.Screen name="Shelf" component={Shelf} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Rating" component={Rating} />
      <Stack.Screen name="All Ratings" component={AllRatings} />
    </Stack.Navigator>
  );
};

export default ShelfStack;

const styles = StyleSheet.create({});
