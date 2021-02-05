import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Notifications from '../Notifications';
import Details from '../club/Details';
import Report from '../club/Report';
import AddReview from '../club/AddReview';
import Rating from '../club/Rating';
import AllRatings from '../club/AllRatings';

const Stack = createStackNavigator();

const NotificationStack = () => {
  return (
    <Stack.Navigator initialRouteName="Notification"
      screenOptions={() => ({
        headerTitleStyle: {
          fontFamily: 'Nunito-Regular',
          fontSize: 20,
        },
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerTitleAlign: 'left',
      })}
    >
      <Stack.Screen name="Notification" component={Notifications} />
      <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
      <Stack.Screen name="Rating" component={Rating} />
      <Stack.Screen name="All Ratings" component={AllRatings} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="Add Review" component={AddReview} />
    </Stack.Navigator>
  );
};

export default NotificationStack;
