import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeaturedBooks from '../FeaturedBooks';

const Stack = createStackNavigator();

const BookStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Book"
      screenOptions={() => ({
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
      <Stack.Screen name="Book" component={FeaturedBooks}
          options={{
            headerShown: false,
          }}
       />
    </Stack.Navigator>
  );
};

export default BookStack;
