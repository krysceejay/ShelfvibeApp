import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SidebarDropDown from './SidebarDropDown';

const DashboardSidebar = props => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.closeBtn}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
          }}>
          <Ionicons
            name="md-close"
            size={30}
            style={{
              paddingRight: 20,
              color: '#f53ba3',
              fontFamily: 'Nunito-BoldItalic',
            }}
          />
        </TouchableOpacity>
      </View>
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
              labelStyle={{
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
              }}
              icon={() => <Icon color="#f53ba3" size={20} name="dashboard" />}
              onPress={() => {
                props.navigation.navigate('Drawer1');
              }}
            />
            {/* <DrawerItem
              label={() => <SidebarDropDown />}
              icon={() => <Icon color="#f53ba3" size={20} name="book" />}
              onPress={() => {
                props.navigation.navigate('Drawer1');
              }}
            /> */}
            <DrawerItem
              label="Manage Shelf"
              labelStyle={{
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
              }}
              icon={() => <Icon color="#f53ba3" size={20} name="book" />}
              onPress={() => {
                props.navigation.navigate('Drawer1');
              }}
            />
            <DrawerItem
              label="Add To Shelf"
              labelStyle={{
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
              }}
              icon={() => <Icon color="#f53ba3" size={20} name="plus-square" />}
              onPress={() => {
                props.navigation.navigate('Drawer1');
              }}
            />
            <DrawerItem
              label="Joined List"
              labelStyle={{
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
              }}
              icon={() => <Icon color="#f53ba3" size={20} name="handshake-o" />}
              onPress={() => {
                props.navigation.navigate('Drawer1');
              }}
            />
            <DrawerItem
              label="Profile"
              labelStyle={{
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
              }}
              icon={() => <Icon color="#f53ba3" size={20} name="id-card" />}
              onPress={() => {
                props.navigation.navigate('Drawer2');
              }}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Sign Out"
          labelStyle={{
            fontSize: 16,
            fontFamily: 'Nunito-Regular',
          }}
          icon={() => <Icon color="#f53ba3" size={20} name="sign-out" />}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default DashboardSidebar;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  closeBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
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
    marginBottom: 3,
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
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});
