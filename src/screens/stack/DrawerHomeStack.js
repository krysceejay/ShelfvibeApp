import React from 'react';
import {TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dash from '../dashboard/Dash';
import Report from '../club/Report';
import AddReview from '../club/AddReview';
import Details from '../club/Details';
import Rating from '../club/Rating';
import AllRatings from '../club/AllRatings';

const Stack = createStackNavigator();

const DrawerHomeStack = ({navigation}) => {
  const {colors} = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: colors.background
        },
        headerTitleStyle: {
          fontFamily: 'Nunito-Regular',
          fontSize: 20,
          color: colors.text
        },
        headerTintColor: '#000',
        headerBackTitleVisible: false,
        headerTitleAlign: 'left',
        headerRight: () => {
          return <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Ionicons
                name="md-menu"
                size={30}
                color={colors.icon}
                style={{
                  paddingRight: 20,
                  fontFamily: 'Nunito-BoldItalic',
                }}
              />
            </TouchableOpacity>
        },
      })}>
      <Stack.Screen
        name="Dashboard"
        component={Dash}
        options={{
          headerLeft: null
        }}
      />
      <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
      <Stack.Screen name="Rating" component={Rating}
        options={{
          headerRight: null
        }}
      />
      <Stack.Screen name="All Ratings" component={AllRatings}
        options={{
          headerRight: null
        }}
      />
      <Stack.Screen name="Report" component={Report} options={{

          headerRight: null
        }} />
      <Stack.Screen name="Add Review" component={AddReview} options={{
          
          headerRight: null
        }} />
    </Stack.Navigator>
  );
};

export default DrawerHomeStack;
