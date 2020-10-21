import React from 'react';
import {Animated, Text, View, StyleSheet, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Circle = ({animatedValue}) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1];

  const circleColor = animatedValue.interpolate({
    inputRange,
    outputRange: ['#4dbedb', '#4dbedb', '#4dbedb', '#242c42', '#242c42'],
  });
  return (
    <Animated.View
      style={[
        styles.circle,
        {
          backgroundColor: circleColor,
          transform: [
            {perspective: 400},
            {
              rotateY: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ['0deg', '-90deg', '-180deg'],
              }),
            },
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 8, 1],
              }),
            },
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 40, 0],
              }),
            },
          ],
        },
      ]}>
      <View style={styles.circle}>
        <Ionicons
          name="md-book"
          size={28}
          style={{
            color: '#fff',
            fontFamily: 'Nunito-Regular',
          }}
        />
      </View>
    </Animated.View>
  );
};

export default Circle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
