import React from 'react';
import {TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DashboardSidebar from '../../components/DashboardSidebar';
import Dash from '../dashboard/Dash';
import ManageClub from '../dashboard/ManageClub';
import JoinedClub from '../dashboard/JoinedList';
import Profile from '../dashboard/Profile';
import Details from '../club/Details';
import Rating from '../club/Rating';
import AllRatings from '../club/AllRatings';
import Report from '../club/Report';
import AddReview from '../club/AddReview';

const Drawer = createDrawerNavigator();

const DashDrawer = () => {
  const {colors} = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerType="slide"
      drawerPosition="right"
      drawerContent={props => <DashboardSidebar {...props} />}
      drawerBackgroundColor={colors.background}
      drawerContentOptions={{
        //activeTintColor: 'red',
        itemStyle: {marginVertical: 30},
      }}
      screenOptions={({navigation}) => ({
        swipeEnabled: false,
        headerShown: true,
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: colors.background
        },
        headerTitleStyle: {
          fontFamily: 'Nunito-Regular',
          fontSize: 20,
          color: colors.text
        },
        headerTintColor: colors.text,
        headerLeft: () => {
          return <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                paddingHorizontal: 3,
                fontFamily: 'Nunito-Bold',
              }}>
              <AntDesign
                name="left"
                size={28}
                color={colors.icon}
              />
            </TouchableOpacity>
        },
        headerRight: () => {
          return <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Ionicons
                name="md-menu"
                size={28}
                color={colors.icon}
                style={{
                  paddingRight: 20,
                  fontFamily: 'Nunito-BoldItalic',
                }}
              />
            </TouchableOpacity>
        },
      })}>
      <Drawer.Screen name="Dashboard" component={Dash} options={{
        headerLeft: () => {
          return null
        },
      }} />
      <Drawer.Screen name="ManageShelf" component={ManageClub} options={{ title: 'Manage Club',
        headerLeft: () => {
          return null
        }}} />
      <Drawer.Screen name="JoinedList" component={JoinedClub} options={{ title: 'Joined Club',
        headerLeft: () => {
          return null
        }}} />
      <Drawer.Screen name="Profile" component={Profile} options={{
        headerLeft: () => {
          return null
        },
      }} />
      <Drawer.Screen name="Details" component={Details} options={{ headerShown: false }} />
      <Drawer.Screen name="Rating" component={Rating} options={{
        headerRight: null
        }} />
      <Drawer.Screen name="All Ratings" component={AllRatings} options={{
        headerRight: null
        }} />
      <Drawer.Screen name="Report" component={Report} options={{
        headerRight: null
        }} />
      <Drawer.Screen name="Add Review" component={AddReview} options={{
        headerRight: null
        }} />
      
    </Drawer.Navigator>
  );
};

export default DashDrawer;
