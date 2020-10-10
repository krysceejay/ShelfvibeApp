import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Contact = () => {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Contact Us</Text>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    margin: 16,
    fontFamily: 'Nunito-Regular',
  },
});
