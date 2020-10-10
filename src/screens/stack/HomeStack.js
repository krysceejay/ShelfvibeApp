import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Feed from '../Feed';
import Details from '../Details';
import Header from '../../components/Header';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerStyle: {
          //backgroundColor: '#242c42',
        },
        headerTitleStyle: {
          fontFamily: 'Nunito-Regular',
          //color: '#fff',
          fontSize: 20,
        },

        headerTitleAlign: 'left',
        headerBackTitleVisible: false,
        headerTintColor: '#000',
        headerRight: () => {
          return (
            <Ionicons
              name="md-search"
              size={30}
              style={{paddingRight: 20, color: '#000'}}
            />
          );
        },
        //headerLeft: null,
      })}>
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerTitle: () => <Header />,
          headerTitleContainerStyle: {
            height: '100%',
            width: '30%',
            //paddingVertical: 7,
          },
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: 'Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
