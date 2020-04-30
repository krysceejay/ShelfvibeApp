import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../../assets/styles';

export default class Members extends Component {
  render() {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Members </Text>
      </View>
    );
  }
}
