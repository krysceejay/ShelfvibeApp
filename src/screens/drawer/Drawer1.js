import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../../assets/styles';

export default class Drawer1 extends Component {
  render() {
    return (
      <View style={styles.center}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.openDrawer();
          }}>
          <Icon name="bars" size={30} color="red" />
        </TouchableOpacity>
        <Text style={styles.title}>Drawer1 </Text>
      </View>
    );
  }
}
