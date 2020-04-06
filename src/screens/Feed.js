import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import {styles} from '../assets/styles';

export default class Feed extends Component {
  render() {
    return (
      <View style={styles.center}>
        <Text style={styles.title}> Feeds </Text>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate('Details');
          }}
        />
      </View>
    );
  }
}
