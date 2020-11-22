import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import RatingStar from './RatingStar';

const numStars = 5;

const RatingStarGroup = ({getRating}) => {
  const [stateData, setStateData] = useState({
    rating: 0,
    animation: new Animated.Value(1),
  });

  const {rating, animation} = stateData;

  rate = starNumber => {
    setStateData({...stateData, rating: starNumber});
  };

  animate = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(1);
    });
  };

  let stars = [];

  const animateScale = animation.interpolate({
    inputRange: [1, 1.5, 2],
    outputRange: [1, 1.4, 1],
  });

  const animateOpacity = animation.interpolate({
    inputRange: [1, 1.2, 2],
    outputRange: [1, 0.3, 1],
  });

  const animateWobble = animation.interpolate({
    inputRange: [1, 1.25, 1.75, 2],
    outputRange: ['0deg', '-3deg', '3deg', '0deg'],
  });

  const animationStyle = {
    transform: [{scale: animateScale}, {rotate: animateWobble}],
    opacity: animateOpacity,
  };

  rateAndAnimate = (x) => {
    rate(x);
    animate();
    getRating(x);
  }

  for (let x = 1; x <= numStars; x++) {
    stars.push(
      <TouchableWithoutFeedback
        key={x}
        onPress={() => {
          rateAndAnimate(x)
        }}>
        <Animated.View style={x <= rating ? animationStyle : ''}>
          <RatingStar filled={x <= rating ? true : false} />
        </Animated.View>
      </TouchableWithoutFeedback>,
    );
  }

  return (
    <View>
      <View style={{flexDirection: 'row'}}>{stars}</View>
    </View>
  );
};

export default RatingStarGroup;

const styles = StyleSheet.create({});
