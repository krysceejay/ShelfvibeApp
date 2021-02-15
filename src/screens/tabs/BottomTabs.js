import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { Text, View } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from '../stack/HomeStack';
import ShelfStack from '../stack/ShelfStack';
import AccountStack from '../stack/AccountStack';
import NotificationStack from '../stack/NotificationStack';
import DashDrawer from '../drawer/DashDrawer';
import {getLoginLocal} from '../../actions/authActions';
import {AuthContext} from '../../utils/context';
import setAuthToken from '../../utils/setAuthToken';
import {userNotSeenNoteAction} from '../../actions/notificationActions';

const Tab = createBottomTabNavigator();

const BottomTabs = ({isLoggedIn, token, user, getLoginLocal, userNotSeenNoteAction, notSeenNote}) => {
  //console.log('user from bottom tab: ' + token);
  useEffect(() => {
    setToken(token);
  }, [token]);

  useEffect(() => {
    notSeenNotify();
  }, [user]);

  setToken = async tk => {
    setAuthToken(tk);
    await getLoginLocal();
  };

  notSeenNotify = async () => {
    await userNotSeenNoteAction();
    //console.log('yes sir');
  };

  getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';
  
    if (routeName === 'FeaturedBooks') {
      return false;
    }
  
    return true;
  }

  IconWithBadge = ({name, badgeCount, color, size}) => {
   return (
     <View>
       <Icon name={name} size={size} color={color} />
       {badgeCount > 0 && (
         <View style={{
           position: 'absolute',
           right: -6,
           top: -3,
           backgroundColor: '#ff3333',
           borderRadius: 8,
           width: 16,
           height: 16,
           justifyContent: 'center',
           alignItems: 'center',
           padding: 0
         }}>
           <Text style={{color: '#fff', fontSize: 9, fontFamily: 'Nunito-Bold'}}>
             {badgeCount}
           </Text>

         </View>
        )
       }
     </View>
   )
  }

  NotificationIcon = (props) => {
    let count;
    if(props.focused || notSeenNote === null){
      count = 0;
    }else{
      count = notSeenNote.length;
    }

    return <IconWithBadge {...props} badgeCount={count} />
  }

  return (
    <AuthContext.Provider value={user}>
      <Tab.Navigator
        // initialRouteName={fromLogin ? 'Dashboard' : 'Account'}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            size = 22;
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            }
            if (route.name === 'Club') {
              iconName = 'cards-club';
              return <MaterialCommunityIcons
                    name={iconName}
                    size={24}
                    color={color}
                  />
            }
            if (route.name === 'Notification') {
              iconName = 'bell';
              return <NotificationIcon name={iconName} size={size} color={color} 
              focused={focused} />
            }
            if (route.name === 'Account') {
              iconName = 'user';
            }
            if (route.name === 'Dashboard') {
              iconName = 'dashboard';
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
        <Tab.Screen name="Home" component={HomeStack} 
        // options={({ route }) => ({
        // tabBarVisible: getTabBarVisibility(route)
        //  })} 
        />
        <Tab.Screen name="Club" component={ShelfStack} />
        <Tab.Screen name="Notification" component={NotificationStack} options={{
          tabBarBadge: '3',
          tabBarBadgeStyle: {backgroundColor: 'red', width: 20, height: 20}
        }} />
        {isLoggedIn ? (
          <Tab.Screen name="Dashboard" component={DashDrawer} />
        ) : (
          <Tab.Screen name="Account" component={AccountStack} />
        )}
      </Tab.Navigator>
    </AuthContext.Provider>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  user: state.auth.user,
  notSeenNote: state.notify.notSeenNote
});

export default connect(
  mapStateToProps,
  {getLoginLocal, userNotSeenNoteAction},
)(BottomTabs);
