import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class RatingStar extends Component {
  render() {
    return (
      <FontAwesome
        name={this.props.filled ? 'star' : 'star-o'}
        size={32}
        color="#e2cf00"
        style={{marginHorizontal: 6}}
      />
    );
  }
}

const styles = StyleSheet.create({});
