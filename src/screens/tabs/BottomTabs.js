import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeStack from '../stack/HomeStack';
import ShelfStack from '../stack/ShelfStack';
import AccountStack from '../stack/AccountStack';
import NotificationStack from '../stack/NotificationStack';
import DashDrawer from '../drawer/DashDrawer';
import Notifications from '../Notifications';
import {getLoginLocal} from '../../actions/authActions';
import {AuthContext} from '../../utils/context';
import setAuthToken from '../../utils/setAuthToken';

const Tab = createBottomTabNavigator();

const BottomTabs = ({isLoggedIn, token, user, getLoginLocal}) => {
  //console.log('user from bottom tab: ' + token);
  useEffect(() => {
    setToken(token);
    //getLoginLocal();
  }, [token]);

  setToken = async tk => {
    setAuthToken(tk);
    await getLoginLocal();
  };

  return (
    <AuthContext.Provider value={user}>
      <Tab.Navigator
        // initialRouteName={fromLogin ? 'Dashboard' : 'Account'}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            size = 22;
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            }
            if (route.name === 'Club') {
              iconName = focused ? 'book' : 'book';
            }
            if (route.name === 'Notification') {
              iconName = focused ? 'bell' : 'bell';
            }
            if (route.name === 'Account') {
              iconName = focused ? 'user' : 'user';
            }
            if (route.name === 'Dashboard') {
              iconName = focused ? 'dashboard' : 'dashboard';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#00a2cc',
          inactiveTintColor: 'gray',
          style: {
            //backgroundColor: '#242c42',
          },
          showLabel: false,
          keyboardHidesTabBar: true,
        }}>
        <Tab.Screen name="Home" children={HomeStack} />
        <Tab.Screen name="Club" children={ShelfStack} />
        <Tab.Screen name="Notification" children={NotificationStack} />
        {isLoggedIn ? (
          <Tab.Screen name="Dashboard" children={DashDrawer} />
        ) : (
          <Tab.Screen name="Account" children={AccountStack} />
        )}
      </Tab.Navigator>
    </AuthContext.Provider>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  {getLoginLocal},
)(BottomTabs);
