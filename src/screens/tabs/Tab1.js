import React, {Component} from 'react';
import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import {styles} from '../../assets/styles';
import Header from '../../components/Header';

export default class Tab1 extends Component {
  render() {
    return (
      <View style={styles.center}>
        <Text style={styles.title}> Tab1 </Text>
      </View>
    );
  }
}
