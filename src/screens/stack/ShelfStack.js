import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Rating from '../shelf/Rating';
import AllRatings from '../shelf/AllRatings';
import Club from '../club/Club';
import Details from '../club/Details';
import Poll from '../club/Poll';
import ReadingList from '../club/ReadingList';

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
      })}>
      <Stack.Screen name="Clubs" component={Club} />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="Poll" component={Poll} options={{
        headerRight: () => {
          return (
              <TouchableOpacity onPress={() => {
                
              }}
              activeOpacity={0.9}>
                  <Ionicons
                name="ios-add"
                size={30}
                style={{paddingRight: 20, color: '#000'}}
              />
              </TouchableOpacity>
          );
        },
      }}/> */}
      <Stack.Screen name="Poll" component={Poll} />
      <Stack.Screen name="Reading List" component={ReadingList} />
      <Stack.Screen name="Rating" component={Rating} />
      <Stack.Screen name="All Ratings" component={AllRatings} />
    </Stack.Navigator>
  );
};

export default ShelfStack;

const styles = StyleSheet.create({});
