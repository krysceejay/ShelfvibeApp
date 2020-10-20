import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ManageShelf from '../dashboard/ManageShelf';

import BookTopic from '../dashboard/BookTopic';
import Members from '../dashboard/Members';
import Details from '../shelf/Details';
import Rating from '../shelf/Rating';
import AllRatings from '../shelf/AllRatings';

const Stack = createStackNavigator();

const ManageShelfStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ManageShelf"
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
        name="ManageShelf"
        component={ManageShelf}
        options={{
          title: 'Manage Shelf',
        }}
      />
      <Stack.Screen
        name="BookTopic"
        component={BookTopic}
        options={{
          title: 'Book Topic',
        }}
      />
      <Stack.Screen name="Members" component={Members} />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: 'Details',
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
