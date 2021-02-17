import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import JoinedClub from '../dashboard/JoinedList';
import Details from '../club/Details';
import Rating from '../club/Rating';
import AllRatings from '../club/AllRatings';
import Report from '../club/Report';
import AddReview from '../club/AddReview';

const Stack = createStackNavigator();

const JoinedListStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Joined Club"
      screenOptions={() => ({
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
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Ionicons
                name="md-menu"
                size={30}
                style={{
                  paddingRight: 20,
                  fontFamily: 'Nunito-BoldItalic',
                }}
              />
            </TouchableOpacity>
          );
        },
      })}>
      <Stack.Screen name="Joined Club" component={JoinedClub} options={{headerLeft: null,}} />
      <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
      <Stack.Screen name="Rating" component={Rating}
        options={{
          headerRight: null
        }}
      />
      <Stack.Screen name="All Ratings" component={AllRatings}
        options={{
          headerRight: null
        }}
      />
      <Stack.Screen name="Report" component={Report} options={{

          headerRight: null
        }} />
      <Stack.Screen name="Add Review" component={AddReview} options={{
          
          headerRight: null
        }} />
     
    </Stack.Navigator>
  );
};

export default JoinedListStack;

const styles = StyleSheet.create({});
