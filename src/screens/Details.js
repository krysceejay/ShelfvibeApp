import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import {styles} from '../assets/styles';

export default class Details extends Component {
  render() {
    return (
      <View style={styles.center}>
        <Text style={styles.title}> Details </Text>
        {/* <Button
          title="Go to Feed"
          onPress={() => {
            this.props.navigation.navigate('Feed');
          }}
        />
        <Button
          title="View Button tabs"
          onPress={() => {
            this.props.navigation.navigate('Bottom Tabs');
          }}
        /> */}
      </View>
    );
  }
}
