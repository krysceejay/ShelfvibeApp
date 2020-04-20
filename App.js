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
import Drawer1 from './src/screens/drawer/Drawer1';
import Drawer2 from './src/screens/drawer/Drawer2';
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
            backgroundColor: '#242c42',
          },
          headerTitleStyle: {
            fontFamily: 'Nunito-Regular',
            color: '#fff',
            fontSize: 20,
          },
          headerTitleContainerStyle: {
            height: '100%',
            width: 80,
          },
          headerTitleAlign: 'left',
          headerBackTitleVisible: false,
          headerTintColor: '#fff',
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

  createDrawerHomeStack = () => {
    const navigation = useNavigation();

    return (
      <Stack.Navigator
        screenOptions={() => ({
          //headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: '#242c42',
          },

          //headerTintColor: 'red',
          headerTitleAlign: 'left',
        })}>
        <Stack.Screen
          name="Dashboard"
          component={this.createDrawer}
          options={({route}) => ({
            headerTitle: () => {
              return (
                <Text
                  style={{
                    fontSize: 20,
                    color: '#fff',
                    fontFamily: 'Nunito-Regular',
                  }}>
                  {this.getHeaderTitle(route)}
                </Text>
              );
            },
            headerRight: () => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.dispatch(DrawerActions.openDrawer());
                  }}>
                  <Ionicons
                    name="md-menu"
                    size={30}
                    style={{
                      paddingRight: 20,
                      color: '#fff',
                      fontFamily: 'Nunito-BoldItalic',
                    }}
                  />
                </TouchableOpacity>
              );
            },
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
        }}>
        <Tab.Screen name="Tab1" children={this.createHomeStack} />
        <Tab.Screen name="Tab2" component={Tab2} />
        <Tab.Screen name="Tab3" component={Tab3} />
        <Tab.Screen name="Tab4" component={Tab4} />
        <Tab.Screen name="Tab5" children={this.createDrawerHomeStack} />
      </Tab.Navigator>
    );
  };
  createDrawer = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Drawer1"
        drawerType="slide"
        drawerPosition="right"
        drawerContent={props => <DashboardSidebar {...props} />}
        drawerContentOptions={{
          activeTintColor: 'red',
          itemStyle: {marginVertical: 30},
        }}
        screenOptions={() => ({
          swipeEnabled: false,
          gestureEnabled: false,
        })}>
        <Drawer.Screen name="Drawer1" component={Drawer1} />
        <Drawer.Screen name="Drawer2" component={Drawer2} />
      </Drawer.Navigator>
    );
  };

  getHeaderTitle = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : 'Drawer1';

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
          style={{paddingRight: 20, color: '#fff'}}
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
