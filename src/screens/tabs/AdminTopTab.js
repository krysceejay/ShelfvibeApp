import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Club from '../club/Club'

const Tab = createMaterialTopTabNavigator();

const AdminTopTab = () => {
    return (
        // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        //     <Text>AdminTopTab</Text>
        // </View>
        <Tab.Navigator>
        <Tab.Screen name="Club" component={Club} />
        
      </Tab.Navigator>
    )
}

export default AdminTopTab; 

const styles = StyleSheet.create({})
