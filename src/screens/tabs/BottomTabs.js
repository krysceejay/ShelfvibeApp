import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeStack from '../stack/HomeStack';
import ShelfStack from '../stack/ShelfStack';
import AccountStack from '../stack/AccountStack';
import DashDrawer from '../drawer/DashDrawer';
import Contact from '../Contact';
import {getLoginLocal} from '../../actions/authActions';

const Tab = createBottomTabNavigator();

const BottomTabs = props => {
  const {isLoggedIn, getLoginLocal} = props;
  //console.log('islogin from bottom tab: ' + isLoggedIn);

  useEffect(() => {
    getLoginLocal();
  });

  return (
    <Tab.Navigator
      // initialRouteName={fromLogin ? 'Dashboard' : 'Account'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          size = 25;
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          }
          if (route.name === 'Shelf') {
            iconName = focused ? 'book' : 'book';
          }
          if (route.name === 'Contact') {
            iconName = focused ? 'phone' : 'phone';
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
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Shelf" component={ShelfStack} />
      <Tab.Screen name="Contact" component={Contact} />
      {isLoggedIn ? (
        <Tab.Screen name="Dashboard" children={DashDrawer} />
      ) : (
        <Tab.Screen name="Account" children={AccountStack} />
      )}
    </Tab.Navigator>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.login.isLoggedIn,
});

export default connect(
  mapStateToProps,
  {getLoginLocal},
)(BottomTabs);
