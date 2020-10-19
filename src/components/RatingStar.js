import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RatingStar = ({filled}) => {
  return (
    <FontAwesome
      name={filled ? 'star' : 'star-o'}
      size={32}
      color="#e2cf00"
      style={{marginHorizontal: 20}}
    />
  );
};

export default RatingStar;

const styles = StyleSheet.create({});
