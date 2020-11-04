import React from 'react';
import {StyleSheet, Text, View, Easing} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
//import Ionicons from 'react-native-vector-icons/Ionicons';
//import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

//import Details from '../Details';
//import Header from '../../components/Header';
import HomePage from '../HomePage';
import Details from '../Details2';

const Stack = createStackNavigator();
//const Stack = createSharedElementStackNavigator();

const options = () => ({
  gestureEnabled: false,
  headerBackTitleVisible: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {duration: 400, easing: Easing.inOut(Easing.ease)},
    },
    close: {
      animation: 'timing',
      config: {duration: 400, easing: Easing.inOut(Easing.ease)},
    },
  },
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
});

const HomeStack = () => {
  return (
    // <Stack.Navigator
    //   screenOptions={({route}) => ({
    //     headerStyle: {
    //       //backgroundColor: '#242c42',
    //     },
    //     headerTitleStyle: {
    //       fontFamily: 'Nunito-Regular',
    //       //color: '#fff',
    //       fontSize: 20,
    //     },

    //     headerTitleAlign: 'left',
    //     headerBackTitleVisible: false,
    //     headerTintColor: '#000',
    //     headerRight: () => {
    //       return (
    //         <Ionicons
    //           name="md-search"
    //           size={30}
    //           style={{paddingRight: 20, color: '#000'}}
    //         />
    //       );
    //     },
    //     //headerLeft: null,
    //   })}>
    //   <Stack.Screen
    //     name="Home"
    //     component={Home}
    //     options={{
    //       headerTitle: () => <Header />,
    //       headerTitleContainerStyle: {
    //         height: '100%',
    //         width: '30%',
    //         //paddingVertical: 7,
    //       },
    //     }}
    //   />
    //   <Stack.Screen
    //     name="TravelListDetails"
    //     component={Details}
    //     options={{
    //       title: 'Details',
    //     }}
    //   />
    // </Stack.Navigator>

    <Stack.Navigator
      initialRouteName="NavigationList"
      headerMode="none"
      screenOptions={{cardStyle: {backgroundColor: '#fff'}}}>
      <Stack.Screen name="NavigationList" component={HomePage} />
      <Stack.Screen
        name="Details"
        component={Details}
        options={options}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
