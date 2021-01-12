import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import JoinedClub from '../dashboard/JoinedList';

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
      <Stack.Screen name="Joined Club" component={JoinedClub} />
     
    </Stack.Navigator>
  );
};

export default JoinedListStack;

const styles = StyleSheet.create({});
