import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Login </Text>
        <View style={styles.center}>
          <Button
            title="Go to Signup"
            onPress={() => {
              this.props.navigation.navigate('Signup');
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
