import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Drawer1 from './src/screens/drawer/Drawer1';
import Drawer2 from './src/screens/drawer/Drawer2';
import Tab1 from './src/screens/tabs/Tab1';
import Tab2 from './src/screens/tabs/Tab2';
import Tab3 from './src/screens/tabs/Tab3';
import Tab4 from './src/screens/tabs/Tab4';
import Tab5 from './src/screens/tabs/Tab5';
import Feed from './src/screens/Feed';
import Details from './src/screens/Details';
import DrawerContent from './src/components/DrawerContent';

Icon.loadFont();

function ContactScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Contact Screen</Text>
    </View>
  );
}
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
      <Stack.Navigator>
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Bottom Tabs" children={this.createBottomTabs} />
      </Stack.Navigator>
    );
  };

  createBottomTabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Tab1" component={Tab1} />
        <Tab.Screen name="Tab2" component={Tab2} />
      </Tab.Navigator>
    );
  };
  createDrawer = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Drawer1"
        drawerType="slide"
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Drawer1" component={Drawer1} />
        <Drawer.Screen name="Drawer2" component={Drawer2} />
      </Drawer.Navigator>
    );
  };
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              size = 30;
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
              backgroundColor: '#242c42',
            },
            showLabel: false,
          }}>
          <Tab.Screen name="Tab1" component={Tab1} />
          <Tab.Screen name="Tab2" component={Tab2} />
          <Tab.Screen name="Tab3" component={Tab3} />
          <Tab.Screen name="Tab4" component={Tab4} />
          <Tab.Screen name="Tab5" children={this.createDrawer} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});
