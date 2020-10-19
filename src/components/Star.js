import React from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Star = ({rate, pos, color}) => {
  return (
    <View style={{width: rate, position: pos}}>
      <Ionicons name="md-star" size={20} color={color} />
    </View>
  );
};

export default Star;

const styles = StyleSheet.create({});
