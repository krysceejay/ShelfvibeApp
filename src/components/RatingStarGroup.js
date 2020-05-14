import React, {Component} from 'react';
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

export default class RatingStarGroup extends Component {
  state = {
    rating: 0,
    animation: new Animated.Value(1),
  };

  rate = starNumber => {
    this.setState({rating: starNumber});
  };

  animate = () => {
    Animated.timing(this.state.animation, {
      toValue: 2,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      this.state.animation.setValue(1);
    });
  };

  render() {
    let stars = [];

    const animateScale = this.state.animation.interpolate({
      inputRange: [1, 1.5, 2],
      outputRange: [1, 1.4, 1],
    });

    const animateOpacity = this.state.animation.interpolate({
      inputRange: [1, 1.2, 2],
      outputRange: [1, 0.3, 1],
    });

    const animateWobble = this.state.animation.interpolate({
      inputRange: [1, 1.25, 1.75, 2],
      outputRange: ['0deg', '-3deg', '3deg', '0deg'],
    });

    const animationStyle = {
      transform: [{scale: animateScale}, {rotate: animateWobble}],
      opacity: animateOpacity,
    };

    for (let x = 1; x <= numStars; x++) {
      stars.push(
        <TouchableWithoutFeedback
          key={x}
          onPress={() => {
            this.rate(x), this.animate();
          }}>
          <Animated.View style={x <= this.state.rating ? animationStyle : ''}>
            <RatingStar filled={x <= this.state.rating ? true : false} />
          </Animated.View>
        </TouchableWithoutFeedback>,
      );
    }

    return (
      <View>
        <View style={{flexDirection: 'row'}}>{stars}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
