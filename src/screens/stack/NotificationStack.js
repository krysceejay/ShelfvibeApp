import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Notifications from '../Notifications';

const Stack = createStackNavigator();

const NotificationStack = () => {
  return (
    <Stack.Navigator initialRouteName="Notification"
      screenOptions={() => ({
        headerTitleStyle: {
          fontFamily: 'Nunito-Regular',
          fontSize: 20,
        },
        headerTitleAlign: 'left',
        //headerBackTitleVisible: false,
        headerTintColor: '#000',
        //headerLeft: null,
      })}
    >
      <Stack.Screen name="Notification" component={Notifications} />
    </Stack.Navigator>
  );
};

export default NotificationStack;
