import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Star from './Star';

export default class StarGroup extends Component {
  render() {
    return (
      <View style={styles.starGroup}>
        {/* <Star color="yellow" backcol="yellow" rate={10} /> */}
        <View>
          <Star color="#ddd" />
          <Star color="#e2cf00" pos="absolute" rate="100%" />
        </View>
        <View>
          <Star color="#ddd" />
          <Star color="#e2cf00" pos="absolute" rate="100%" />
        </View>
        <View>
          <Star color="#ddd" />
          <Star color="#e2cf00" pos="absolute" rate="100%" />
        </View>
        <View>
          <Star color="#ddd" />
          <Star color="#e2cf00" pos="absolute" rate="100%" />
        </View>
        <View>
          <Star color="#ddd" />
          <Star color="#e2cf00" pos="absolute" rate="50%" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  starGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
