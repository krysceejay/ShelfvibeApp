import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Star extends Component {
  render() {
    return (
      <View style={{width: this.props.rate, position: this.props.pos}}>
        {/* <View
          style={{
            position: 'absolute',
            backgroundColor: 'yellow',
            height: 30,
            width: this.props.rate * 30,
          }}
        /> */}
        {/* <Image source={require('../star.png')}
           style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: 30,
            width: 150,
           }} /> */}
        <Ionicons name="md-star" size={20} color={this.props.color} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
