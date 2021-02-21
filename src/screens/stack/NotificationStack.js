import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import Notifications from '../Notifications';
import Details from '../club/Details';
import Report from '../club/Report';
import AddReview from '../club/AddReview';
import Rating from '../club/Rating';
import AllRatings from '../club/AllRatings';

const Stack = createStackNavigator();

const NotificationStack = () => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator initialRouteName="Notification"
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: colors.background
        },
        headerTitleStyle: {
          fontFamily: 'Nunito-Regular',
          fontSize: 20,
        },
        headerBackTitleVisible: false,
        headerTitleAlign: 'left',
        headerShown: false,
        headerTintColor: colors.text,
      })}
    >
      <Stack.Screen name="Notification" component={Notifications} options={{ headerShown: true }} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Rating" component={Rating} />
      <Stack.Screen name="All Ratings" component={AllRatings} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="Add Review" component={AddReview} />
    </Stack.Navigator>
  );
};

export default NotificationStack;
