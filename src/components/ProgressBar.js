import React, {Component} from 'react';
import {Text, StyleSheet, View, Animated} from 'react-native';

export default class ProgressBar extends Component {
  state = {
    percent: 0,
  };

  anim = new Animated.Value(0);

  componentDidMount() {
    this.onAnimate();
  }

  onAnimate = () => {
    this.anim.addListener(({value}) => {
      this.setState({percent: parseInt(value, 10)});
    });
    Animated.timing(this.anim, {
      toValue: this.props.percent,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.inner, {width: `${this.state.percent}%`}]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 10,
    //padding: 3,
    //borderColor: '#aaa',
    //borderWidth: 3,
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
