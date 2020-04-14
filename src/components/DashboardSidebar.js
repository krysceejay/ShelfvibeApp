import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import SidebarDropDown from './SidebarDropDown';

const DashboardSidebar = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                alignItems: 'center',
              }}>
              <Image
                style={styles.avatar}
                source={require('../assets/img/avatar.jpg')}
                size={50}
              />
              <View style={{marginLeft: 15}}>
                <Text style={styles.title}>Krys Diadem</Text>
                <Text style={styles.caption}>@krysceejay</Text>
              </View>
            </View>
          </View>
          <View style={styles.drawerSection}>
            <DrawerItem
              label="Dashboard"
              icon={() => <Icon color="#f53ba3" size={20} name="dashboard" />}
              onPress={() => {
                props.navigation.navigate('Drawer1');
              }}
            />
            <DrawerItem
              label={() => <SidebarDropDown />}
              icon={() => <Icon color="#f53ba3" size={20} name="book" />}
              onPress={() => {
                props.navigation.navigate('Drawer1');
              }}
            />
            <DrawerItem
              label="Profile"
              icon={() => <Icon color="#f53ba3" size={20} name="id-card" />}
              onPress={() => {
                props.navigation.navigate('Drawer2');
              }}
            />
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default DashboardSidebar;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    //backgroundColor: 'red',
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    //fontWeight: 'bold',
    fontFamily: 'Nunito-Bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: 'Nunito-Light',
  },
  drawerSection: {
    marginTop: 15,
  },
});
