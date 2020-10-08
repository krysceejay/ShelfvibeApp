import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './src/store';

import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
  DarkTheme,
  DefaultTheme,
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
import Shelf from './src/screens/shelf/Shelf';
import Details from './src/screens/shelf/Details';
import Rating from './src/screens/shelf/Rating';
import AllRatings from './src/screens/shelf/AllRatings';
import Tab3 from './src/screens/tabs/Tab3';
import LoadingScene from './src/screens/LoadingScene';
import Feed from './src/screens/Feed';
//import DrawerContent from './src/components/DrawerContent';
import DashboardSidebar from './src/components/DashboardSidebar';
import Header from './src/components/Header';
import Login from './src/screens/account/Login';
import Signup from './src/screens/account/Signup';
import Forgotpass from './src/screens/account/Forgotpass';
import AsyncStorage from '@react-native-community/async-storage';
//import {getLoginLocal} from './src/actions/authActions';

Icon.loadFont();
Ionicons.loadFont();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(0, 0, 0)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
  },
};

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
  async componentDidMount() {
    const authData = await AsyncStorage.getItem('loginData');
    this.isLoggedIn = JSON.parse(authData);
  }

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
              width: '30%',
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
        <Stack.Screen name="Forgot Password" component={Forgotpass} />
        <Stack.Screen
          name="Dashboard"
          component={this.createBottomTabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };

  createShelfStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Shelf"
        screenOptions={({route}) => ({
          headerTitleStyle: {
            fontFamily: 'Nunito-Regular',
            fontSize: 20,
          },
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerTitleAlign: 'left',
          headerRight: () => {
            return this.getTabTitle(route);
          },
        })}>
        <Stack.Screen name="Shelf" component={Shelf} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Rating" component={Rating} />
        <Stack.Screen name="All Ratings" component={AllRatings} />
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
        <Tab.Screen name="Dashboard" children={this.createDrawer} />
        {/* 
        {this.isLoggedIn ? (
          <Tab.Screen name="Dashboard" children={this.createDrawer} />
        ) : (
          <Tab.Screen name="Account" children={this.createAccountStack} />
        )} */}
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
        <Drawer.Screen name="AddShelf" children={this.createAddToShelfStack} />
        <Drawer.Screen
          name="JoinedList"
          children={this.createJoinedListStack}
        />
        <Drawer.Screen name="Profile" children={this.createProfileStack} />
        <Drawer.Screen name="Auth" children={this.createAccountStack} />
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
        <Stack.Screen
          name="ManageShelf"
          component={ManageShelf}
          options={{
            title: 'Manage Shelf',
          }}
        />
        <Stack.Screen
          name="BookTopic"
          component={BookTopic}
          options={{
            title: 'Book Topic',
          }}
        />
        <Stack.Screen name="Members" component={Members} />
      </Stack.Navigator>
    );
  };

  createAddToShelfStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="AddShelf"
        screenOptions={() => ({
          headerTitleStyle: {
            fontFamily: 'Nunito-Regular',
            fontSize: 20,
          },
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerTitleAlign: 'left',
          title: 'Add To Shelf',
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
        <Stack.Screen name="AddShelf" component={AddShelf} />
      </Stack.Navigator>
    );
  };

  createJoinedListStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="JoinedList"
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
        <Stack.Screen name="JoinedList" component={JoinedList} />
      </Stack.Navigator>
    );
  };

  createProfileStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="Profile"
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
        <Stack.Screen name="Profile" component={Profile} />
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

  showAuthOrDash = () => {
    return (
      <Stack.Navigator
        headerMode="screen"
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
        }}>
        {this.isLoggedIn ? (
          <Stack.Screen name="Bottom Tabs" children={this.createBottomTabs} />
        ) : (
          <Stack.Screen name="Accounts" children={this.createAccountStack} />
        )}
      </Stack.Navigator>
    );
  };

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer theme={DefaultTheme}>
          <Stack.Navigator
            initialRouteName="Loading"
            headerMode="screen"
            screenOptions={{
              gestureEnabled: false,
              headerShown: false,
            }}>
            <Stack.Screen name="Loading" component={LoadingScene} />
            <Stack.Screen
              name="showAuthOrDash"
              component={this.showAuthOrDash}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
