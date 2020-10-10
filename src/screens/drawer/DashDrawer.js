import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerHomeStack from '../stack/DrawerHomeStack';
import ManageShelfStack from '../stack/ManageShelfStack';
import AddToShelfStack from '../stack/AddToShelfStack';
import JoinedListStack from '../stack/JoinedListStack';
import ProfileStack from '../stack/ProfileStack';
import DashboardSidebar from '../../components/DashboardSidebar';

const Drawer = createDrawerNavigator();

const DashDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerType="slide"
      drawerPosition="right"
      drawerContent={props => <DashboardSidebar {...props} />}
      drawerContentOptions={{
        activeTintColor: 'red',
        itemStyle: {marginVertical: 30},
      }}
      screenOptions={() => ({
        swipeEnabled: false,
      })}>
      <Drawer.Screen name="Dashboard" children={DrawerHomeStack} />
      <Drawer.Screen name="ManageShelf" children={ManageShelfStack} />
      <Drawer.Screen name="AddShelf" children={AddToShelfStack} />
      <Drawer.Screen name="JoinedList" children={JoinedListStack} />
      <Drawer.Screen name="Profile" children={ProfileStack} />
    </Drawer.Navigator>
  );
};

export default DashDrawer;

const styles = StyleSheet.create({});
