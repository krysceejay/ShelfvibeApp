import React, {useContext} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment";
//import SidebarDropDown from './SidebarDropDown';
import {logout} from '../actions/authActions';
import {AuthContext} from '../utils/context';

const DashboardSidebar = props => {
  const user = useContext(AuthContext);
  logoutUser = async () => {
    await props.logout();
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Sign Out',
      'Do you really want to sign out of your account?',
      [
        {
          text: 'Cancel',
          onPress: () => false,
          style: 'cancel',
        },
        {text: 'OK', onPress: () => logoutUser()},
      ],
      {cancelable: false},
    );

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.closeBtn}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
          }}>
          <Ionicons
            name="md-close"
            size={30}
            style={{
              paddingRight: 20,
              color: '#e91e63',
              fontFamily: 'Nunito-BoldItalic',
            }}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Image
              style={styles.avatar}
              source={require('../assets/img/avatar.jpg')}
              size={50}
            />
            <View style={{marginLeft: 15, width: '70%'}}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>{`${user.firstName} ${user.lastName}`}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.caption}>{user.username}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.memberDate}>Member since: {moment(user.insertedAt).format("Do MMM YYYY")} </Text>
            </View>
          </View>
          <View style={styles.drawerSection}>
            <DrawerItem
              label="Dashboard"
              labelStyle={{
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
              }}
              icon={() => <Icon color="#242c42" size={20} name="dashboard" />}
              onPress={() => {
                props.navigation.navigate('Dashboard');
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
              label="Manage Club"
              labelStyle={{
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
              }}
              icon={() => (
                <MaterialCommunityIcons
                  color="#242c42"
                  size={20}
                  name="cards-club"
                />
              )}
              onPress={() => {
                props.navigation.navigate('ManageShelf');
              }}
            />
            <DrawerItem
              label="Add Club"
              labelStyle={{
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
              }}
              icon={() => <Icon color="#242c42" size={20} name="plus-square" />}
              onPress={() => {
                props.navigation.navigate('AddClub');
              }}
            />
            <DrawerItem
              label="Joined Club"
              labelStyle={{
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
              }}
              icon={() => <Icon color="#242c42" size={20} name="handshake-o" />}
              onPress={() => {
                props.navigation.navigate('JoinedList');
              }}
            />
            {/* <DrawerItem
              label="Profile"
              labelStyle={{
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
              }}
              icon={() => <Icon color="#242c42" size={20} name="id-card" />}
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            /> */}
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
          icon={() => <Icon color="#242c42" size={20} name="sign-out" />}
          onPress={createTwoButtonAlert}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(
  mapStateToProps,
  {logout},
)(DashboardSidebar);

const styles = StyleSheet.create({
  drawerContent: {
    //flex: 1,
  },
  closeBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  userInfoSection: {
    paddingLeft: 20,
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
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
    fontFamily: 'Nunito-Light',
  },
  memberDate: {
    fontSize: 13,
    lineHeight: 15,
    fontFamily: 'Nunito-Regular',
    marginTop: 3
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
