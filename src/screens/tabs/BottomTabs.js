import React from 'react';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// export default function BottomTabs() {
//     return (
//         <View>
//             <Text></Text>
//         </View>
//     )
// }

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
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
          if (route.name === 'Tab3') {
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
      <Tab.Screen name="Home" children={this.createHomeStack} />
      <Tab.Screen name="Shelf" component={this.createShelfStack} />
      <Tab.Screen name="Tab3" component={Tab3} />
      {this.props.isLoggedIn ? (
        <Tab.Screen name="Dashboard" children={this.createDrawer} />
      ) : (
        <Tab.Screen name="Account" children={this.createAccountStack} />
      )}
    </Tab.Navigator>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.login.isLoggedIn,
});

export default connect(
  mapStateToProps,
  null,
)(BottomTabs);
