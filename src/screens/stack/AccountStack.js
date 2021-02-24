import React from 'react';
import {StyleSheet} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../account/Login';
import Signup from '../account/Signup';
import Forgotpass from '../account/Forgotpass';
import Verify from '../account/Verify';
import ResendCode from '../account/ResendCode';
import NewPassword from '../account/NewPassword';
//import DrawerHomeStack from '../stack/DrawerHomeStack';

const Stack = createStackNavigator();

const AccountStack = () => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={({route}) => ({
        headerTitleStyle: {
          fontFamily: 'Nunito-Regular',
          fontSize: 20,
        },
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: colors.text
        //headerLeft: null,
      })}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Forgot Password" component={Forgotpass} />
      <Stack.Screen name="Verification" component={ResendCode} />
      <Stack.Screen name="Verify" component={Verify} initialParams={{useremail: '', screen: ''}}
        options={{
          headerLeft: null
        }}
      />
      <Stack.Screen name="New Password" component={NewPassword} initialParams={{useremail: ''}}
        options={{
          headerLeft: null
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;

const styles = StyleSheet.create({});
