import React from 'react';
import {StyleSheet, View} from 'react-native';

const ProgressBar = ({percent}) => {
    return (
      <View style={styles.container}>
        <View
          style={[styles.inner, {width: `${percent}%`}]}
        />
      </View>
    );
  }

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 10,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  inner: {
    width: '100%',
    height: 10,
    backgroundColor: '#059e2e',
    borderRadius: 15,
  },
});
