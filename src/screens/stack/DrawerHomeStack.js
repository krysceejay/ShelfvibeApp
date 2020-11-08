import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dashboard from '../dashboard/Dashboard';
import Dash from '../dashboard/Dash';

const Stack = createStackNavigator();

const DrawerHomeStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: {
          //backgroundColor: '#242c42',
        },

        //headerTintColor: 'red',
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
        name="Dashboard"
        component={Dash}
        options={{
          headerTitle: () => {
            return (
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Nunito-Regular',
                }}>
                Dashboard
              </Text>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default DrawerHomeStack;

const styles = StyleSheet.create({});
