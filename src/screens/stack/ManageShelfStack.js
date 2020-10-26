import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ManageClub from '../dashboard/ManageClub';

import Details from '../club/Details';
import Rating from '../shelf/Rating';
import AllRatings from '../shelf/AllRatings';

const Stack = createStackNavigator();

const ManageShelfStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ManageClub"
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
      <Stack.Screen
        name="ManageClub"
        component={ManageClub}
        options={{
          title: 'Manage Club',
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Rating"
        component={Rating}
        options={{
          title: 'Rating',
        }}
      />
      <Stack.Screen
        name="AllRatings"
        component={AllRatings}
        options={{
          title: 'All Ratings',
        }}
      />
    </Stack.Navigator>
  );
};

export default ManageShelfStack;

const styles = StyleSheet.create({});
