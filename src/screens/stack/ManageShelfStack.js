import React from 'react';
import {TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ManageClub from '../dashboard/ManageClub';
import Details from '../club/Details';
import Rating from '../club/Rating';
import AllRatings from '../club/AllRatings';
import Poll from '../club/Poll';
import ReadingList from '../club/ReadingList';
import Report from '../club/Report';
import AddReview from '../club/AddReview';

const Stack = createStackNavigator();

const ManageShelfStack = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="ManageClub"
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: colors.background
        },
        headerTitleStyle: {
          fontFamily: 'Nunito-Regular',
          fontSize: 20,
          color: colors.text
        },
        headerBackTitleVisible: false,
        headerTintColor: '#000',
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
      <Stack.Screen name="ManageClub" component={ManageClub} options={{ title: 'Manage Club', headerLeft: null}} />
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
      <Stack.Screen name="Poll" component={Poll} options={{
       
          headerRight: null
        }} />
      <Stack.Screen name="Reading List" component={ReadingList} options={{
         
          headerRight: null
        }} />
      <Stack.Screen name="Report" component={Report} options={{
          
          headerRight: null
        }} />
      <Stack.Screen name="Add Review" component={AddReview} options={{
          
          headerRight: null
        }} />
    </Stack.Navigator>
  );
};

export default ManageShelfStack;
