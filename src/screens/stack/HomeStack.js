import React from 'react';
import {Easing} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
//import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import HomePage from '../Home';
import Details from '../Details';
import Detail from '../club/Details';
import Rating from '../club/Rating';
import AllRatings from '../club/AllRatings';
import Report from '../club/Report';
import AddReview from '../club/AddReview';

const Stack = createStackNavigator();
//const Stack = createSharedElementStackNavigator();

// const options = () => ({
//   gestureEnabled: false,
//   headerBackTitleVisible: false,
//   headerShown: false,
//   transitionSpec: {
//     open: {
//       animation: 'timing',
//       config: {duration: 400, easing: Easing.inOut(Easing.ease)},
//     },
//     close: {
//       animation: 'timing',
//       config: {duration: 400, easing: Easing.inOut(Easing.ease)},
//     },
//   },
//   cardStyleInterpolator: ({current: {progress}}) => {
//     return {
//       cardStyle: {
//         opacity: progress,
//       },
//     };
//   },
// });

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerTitleStyle: {
          fontFamily: 'Nunito-Regular',
          fontSize: 20,
        },
        headerTitleAlign: 'left',
        headerBackTitleVisible: false,
        headerTintColor: '#000',
        headerShown: false,
      })}
      >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Detail" component={Details} />
      <Stack.Screen name="Details" component={Detail} />
      <Stack.Screen name="Rating" component={Rating} />
      <Stack.Screen name="All Ratings" component={AllRatings} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="Add Review" component={AddReview} />
    </Stack.Navigator>
  );
};

export default HomeStack;
