import 'react-native-gesture-handler';
import React, {Component} from 'react';

import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dashboard from './src/screens/dashboard/Dashboard';
import ManageShelf from './src/screens/dashboard/ManageShelf';
import AddShelf from './src/screens/dashboard/AddShelf';
import JoinedList from './src/screens/dashboard/JoinedList';
import Profile from './src/screens/dashboard/Profile';
import BookTopic from './src/screens/dashboard/BookTopic';
import Members from './src/screens/dashboard/Members';
import Tab1 from './src/screens/tabs/Tab1';
import Tab2 from './src/screens/tabs/Tab2';
import Tab3 from './src/screens/tabs/Tab3';
import Tab4 from './src/screens/tabs/Tab4';
import Tab5 from './src/screens/tabs/Tab5';
import LoadingScene from './src/screens/LoadingScene';
import Feed from './src/screens/Feed';
import Details from './src/screens/Details';
//import DrawerContent from './src/components/DrawerContent';
import DashboardSidebar from './src/components/DashboardSidebar';
import Header from './src/components/Header';
import Login from './src/screens/account/Login';
import Signup from './src/screens/account/Signup';
import Forgotpass from './src/screens/account/Forgotpass';

Icon.loadFont();
Ionicons.loadFont();

function DashboardheaderRight() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}>
      <Ionicons
        name="md-menu"
        size={30}
        style={{paddingRight: 20, color: '#fff', fontFamily: 'Nunito-Regular'}}
      />
    </TouchableOpacity>
  );
}

// function DispatchAction () {
//   return(
//     DrawerActions.openDrawer()
//   )
// }

function AboutScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>About Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default class App extends Component {
  createHomeStack = () => {
    return (
      <Stack.Navigator
        screenOptions={({route}) => ({
          headerStyle: {
            //backgroundColor: '#242c42',
          },
          headerTitleStyle: {
            fontFamily: 'Nunito-Regular',
            //color: '#fff',
            fontSize: 20,
          },

          headerTitleAlign: 'left',
          headerBackTitleVisible: false,
          headerTintColor: '#000',
          headerRight: () => {
            return this.getTabTitle(route);
          },
          //headerLeft: null,
        })}>
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitle: () => <Header />,
            headerTitleContainerStyle: {
              height: '100%',
              width: '35%',
              //paddingVertical: 7,
            },
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: 'Details',
          }}
        />
      </Stack.Navigator>
    );
  };

  createAccountStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={({route}) => ({
          headerTitleStyle: {
            fontFamily: 'Nunito-Regular',
            fontSize: 20,
          },
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          //headerLeft: null,
        })}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="Forgotpass"
          component={Forgotpass}
          options={() => ({
            title: 'Forgot Password',
          })}
        />
      </Stack.Navigator>
    );
  };

  createBottomTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            size = 25;
            let iconName;

            if (route.name === 'Tab1') {
              iconName = focused ? 'home' : 'home';
            }
            if (route.name === 'Tab2') {
              iconName = focused ? 'book' : 'book';
            }
            if (route.name === 'Tab3') {
              iconName = focused ? 'phone' : 'phone';
            }
            if (route.name === 'Tab4') {
              iconName = focused ? 'user' : 'user';
            }
            if (route.name === 'Tab5') {
              iconName = focused ? 'dashboard' : 'dashboard';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#f53ba3',
          inactiveTintColor: 'gray',
          style: {
            //backgroundColor: '#242c42',
          },
          showLabel: false,
          keyboardHidesTabBar: true,
        }}>
        <Tab.Screen name="Tab1" children={this.createHomeStack} />
        <Tab.Screen name="Tab2" component={Tab2} />
        <Tab.Screen name="Tab3" component={Tab3} />
        <Tab.Screen name="Tab4" children={this.createAccountStack} />
        <Tab.Screen name="Tab5" children={this.createDrawer} />
      </Tab.Navigator>
    );
  };
  createDrawer = () => {
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
        <Drawer.Screen name="Dashboard" children={this.createDrawerHomeStack} />
        <Drawer.Screen
          name="ManageShelf"
          children={this.createManageShelfStack}
        />
        <Drawer.Screen name="AddShelf" component={AddShelf} />
        <Drawer.Screen name="JoinedList" component={JoinedList} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Contact" component={Tab3} />
      </Drawer.Navigator>
    );
  };

  createDrawerHomeStack = ({navigation}) => {
    //const navigation = useNavigation();

    return (
      <Stack.Navigator
        screenOptions={() => ({
          headerStyle: {
            //backgroundColor: '#242c42',
          },

          //headerTintColor: 'red',
          headerTitleAlign: 'left',
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <Ionicons
                  name="md-menu"
                  size={30}
                  style={{
                    paddingRight: 20,
                    fontFamily: 'Nunito-BoldItalic',
                  }}
                />
              </TouchableOpacity>
            );
          },
        })}>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerTitle: () => {
              return (
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Nunito-Regular',
                  }}>
                  Dashboard
                  {/* {this.getHeaderTitle(route)} */}
                </Text>
              );
            },
          }}
        />
      </Stack.Navigator>
    );
  };

  createManageShelfStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="ManageShelf"
        screenOptions={() => ({
          headerTitleStyle: {
            fontFamily: 'Nunito-Regular',
            fontSize: 20,
          },
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerTitleAlign: 'left',
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <Ionicons
                  name="md-menu"
                  size={30}
                  style={{
                    paddingRight: 20,
                    fontFamily: 'Nunito-BoldItalic',
                  }}
                />
              </TouchableOpacity>
            );
          },
        })}>
        <Stack.Screen name="ManageShelf" component={ManageShelf} />
        <Stack.Screen name="BookTopic" component={BookTopic} />
        <Stack.Screen name="Members" component={Members} />
      </Stack.Navigator>
    );
  };

  // shouldHeaderBeShown = route => {
  //   const routeName = route.state
  //     ? route.state.routes[route.state.index].name
  //     : 'ManageShelf';

  //   switch (routeName) {
  //     case 'ManageShelf':
  //       return false;
  //   }
  // };

  getHeaderTitle = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : 'Dashboard';

    return routeName;
  };
  // HeaderRight = () => {
  //   const navigation = useNavigation();
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         navigation.dispatch(DrawerActions.openDrawer());
  //       }}>
  //       <Text>Open</Text>
  //     </TouchableOpacity>
  //   );
  // };

  getTabTitle = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : 'Tab1';

    if (routeName === 'Tab5') {
      return <DashboardheaderRight />;
    } else {
      return (
        <Ionicons
          name="md-search"
          size={30}
          style={{paddingRight: 20, color: '#000'}}
        />
      );
    }
  };
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Loading"
          headerMode="screen"
          screenOptions={{
            gestureEnabled: false,
          }}>
          <Stack.Screen
            name="Loading"
            component={LoadingScene}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Bottom Tabs"
            children={this.createBottomTabs}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});
