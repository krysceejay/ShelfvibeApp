import React from 'react';
import {Easing} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
//import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import HomePage from '../HomeP';
//import Details from '../DetailsP';
import Details from '../Details';
//import FeaturedBooks from '../FeaturedBooks';

const Stack = createStackNavigator();
//const Stack = createSharedElementStackNavigator();

const options = () => ({
  gestureEnabled: false,
  headerBackTitleVisible: false,
  headerShown: false,
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
    <Stack.Navigator
      initialRouteName="Home"
      //screenOptions={{cardStyle: {backgroundColor: '#fff'}}}
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
        
        //headerLeft: null,
      })}
      >
      <Stack.Screen name="Home" component={HomePage}
          options={{
            headerShown: false,
          }}
       />
      <Stack.Screen
        name="Details"
        component={Details}
        options={options}
      />
      {/* <Stack.Screen
        name="FeaturedBooks"
        component={FeaturedBooks}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
