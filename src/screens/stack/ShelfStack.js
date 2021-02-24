import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Rating from '../club/Rating';
import AllRatings from '../club/AllRatings';
import Club from '../club/Club';
import Details from '../club/Details';
import Report from '../club/Report';
import AddReview from '../club/AddReview';

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
        headerShown: false,
      })}>
      <Stack.Screen name="Club" component={Club} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Rating" component={Rating} />
      <Stack.Screen name="All Ratings" component={AllRatings} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="Add Review" component={AddReview} />
    </Stack.Navigator>
  );
};

export default ShelfStack;

const styles = StyleSheet.create({});
