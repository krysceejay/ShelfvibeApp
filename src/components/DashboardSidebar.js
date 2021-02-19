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
  Switch
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment";
import Config from 'react-native-config';
//import SidebarDropDown from './SidebarDropDown';
import {logout} from '../actions/authActions';
import {AuthContext, ThemeContext} from '../utils/context';
import {stringToHslColor} from '../utils/theme';

const proURL = Config.IMAGE_URL;

const DashboardSidebar = props => {
  const user = useContext(AuthContext);
const {toggleTheme} = useContext(ThemeContext);

  logoutUser = async () => {
    await props.logout();
  };

  const {dark, colors} = useTheme();

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
    <View style={{flex: 1, backgroundColor: colors.background}}>
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
            {user.propix !== "noimage.png" ?
            <Image
              style={styles.avatar}
              source={{
                uri: `${proURL}/profiles/${user.propix}`,
              }}
              size={50}
            /> : <View style={[styles.clubMembersSingle, {backgroundColor: stringToHslColor(user.username)}]}>
            <Text style={styles.initial}>{user.username.charAt(0)}</Text>
           </View>}
            <View style={{marginLeft: 15, width: '70%'}}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.title, {color: colors.text}]}>{`${user.firstName} ${user.lastName}`}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.caption, {color: colors.text}]}>{user.username}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.memberDate, {color: colors.text}]}>Member since: {moment(user.insertedAt).format("Do MMM YYYY")} </Text>
            </View>
          </View>
          <View style={styles.drawerSection}>
            <DrawerItem
              label="Dashboard"
              labelStyle={{
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
                color: colors.text
              }}
              icon={() => <Icon color={colors.icon} size={20} name="dashboard" />}
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
                color: colors.text
              }}
              icon={() => (
                <MaterialCommunityIcons
                  color={colors.icon}
                  size={20}
                  name="cards-club"
                />
              )}
              onPress={() => {
                props.navigation.navigate('ManageShelf');
              }}
            />
            <DrawerItem
              label="Joined Club"
              labelStyle={{
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
                color: colors.text
              }}
              icon={() => <Icon color={colors.icon} size={20} name="handshake-o" />}
              onPress={() => {
                props.navigation.navigate('JoinedList');
              }}
            />
            <DrawerItem
              label="Profile"
              labelStyle={{
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
                color: colors.text
              }}
              icon={() => <Icon color={colors.icon} size={20} name="id-card" />}
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
            <View style={[styles.preferences, {borderTopColor: colors.border, borderBottomColor: colors.border}]}>
              <View style={styles.preferenceTitle}>
                 <Text style={styles.titleText}>Preferences</Text>
              </View>
              <View style={styles.titleAndSwitch}>
                <Text style={[styles.themeText, {color: colors.text}]}>DARK THEME</Text>
                <Switch
                    trackColor={{false: '#767577', true: '#6ad83c'}}
                    thumbColor={dark ? '#d1ecf1' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleTheme()}
                    value={dark}
                    style={{transform: [{scaleX: 1.1}, {scaleY: 1.1}]}}
                  />
              </View>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Sign Out"
          labelStyle={{
            fontSize: 16,
            fontFamily: 'Nunito-Regular',
            color: colors.text
          }}
          icon={() => <Icon color={colors.icon} size={20} name="sign-out" />}
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
  clubMembersSingle:{
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderColor: '#f3fbfd',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    color: '#fff',
    textTransform: 'uppercase'
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
  preferences: {
    //backgroundColor: 'red',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  preferenceTitle: {
    marginHorizontal: 20,
  },
  titleText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15,
    color: '#aaa',
    letterSpacing: 2,
  },
  themeText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
  },
  titleAndSwitch: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  } 
});
