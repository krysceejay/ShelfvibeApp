import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Drawer1 from './src/screens/drawer/Drawer1';
import Drawer2 from './src/screens/drawer/Drawer2';
import Tab1 from './src/screens/tabs/Tab1';
import Tab2 from './src/screens/tabs/Tab2';
import Tab3 from './src/screens/tabs/Tab3';
import Tab4 from './src/screens/tabs/Tab4';
import Tab5 from './src/screens/tabs/Tab5';
import Feed from './src/screens/Feed';
import Details from './src/screens/Details';

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
      <Drawer.Navigator initialRouteName="Drawer1">
        <Drawer.Screen name="Drawer1" component={Drawer1} />
        <Drawer.Screen name="Drawer2" component={Drawer2} />
      </Drawer.Navigator>
    );
  };
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
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
