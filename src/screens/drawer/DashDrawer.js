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
import Poll from '../club/Poll';
import Details from '../club/Details';
import Rating from '../club/Rating';
import AllRatings from '../club/AllRatings';
import Report from '../club/Report';
import AddReview from '../club/AddReview';
import ReadingList from '../club/ReadingList';

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
          backgroundColor: colors.background,
          borderBottomColor: colors.border
        },
        headerTitleStyle: {
          fontFamily: 'Nunito-Regular',
          fontSize: 20,
          color: colors.text
        },
        headerTintColor: colors.text,
        headerLeft: () => {
          return null
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
      <Drawer.Screen name="Dashboard" component={Dash} />
      <Drawer.Screen name="ManageShelf" component={ManageClub} options={{ title: 'Manage Club' }} />
      <Drawer.Screen name="JoinedList" component={JoinedClub} options={{ title: 'Joined Club' }} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Details" component={Details} options={{ headerShown: false }} />
      <Drawer.Screen name="Rating" component={Rating} options={{ headerShown: false }} />
      <Drawer.Screen name="All Ratings" component={AllRatings} options={{ headerShown: false }} />
      <Drawer.Screen name="Report" component={Report} options={{ headerShown: false }} />
      <Drawer.Screen name="Add Review" component={AddReview} options={{ headerShown: false }} />
      <Drawer.Screen name="Poll" component={Poll} options={{ headerShown: false }} />
      <Drawer.Screen name="Reading List" component={ReadingList} options={{ headerShown: false }} />
      
    </Drawer.Navigator>
  );
};

export default DashDrawer;
