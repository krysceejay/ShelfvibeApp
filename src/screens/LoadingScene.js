import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';

export default class LoadingScene extends Component {
  state = {
    LogoAnime: new Animated.Value(0),
    LogoText: new Animated.Value(0),
    loadingSpinner: false,
  };
  async componentDidMount() {
    const {LogoAnime, LogoText} = this.state;
    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 40,
        friction: 7,
        duration: 2000,
        useNativeDriver: false,
      }).start(),

      Animated.timing(LogoText, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.setState({
        loadingSpinner: true,
      });
    });

    await this.switchToTab();

    // You can load api data or any other thing here if you want
    // const data = await this.navigateToHome();
    // if (data !== null) {
    //   this.props.navigation.navigate('Bottom Tabs');
    // }
  }

  //   navigateToHome = async () => {
  //     // Splash screen will remain visible for 2 seconds
  //     const wait = time => new Promise(resolve => setTimeout(resolve, time));
  //     return wait(2000).then(() => this.props.navigation.navigate('Bottom Tabs'));
  //   };

  switchToTab = async () => {
    return setTimeout(
      () => this.props.navigation.navigate('Bottom Tabs'),
      4000,
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: this.state.LogoAnime,
            top: this.state.LogoAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}>
          <Image
            style={styles.logo}
            source={require('../assets/img/booklogo.png')}
          />
          {this.state.loadingSpinner ? (
            <ActivityIndicator
              size="large"
              color="#242c42"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          ) : null}
        </Animated.View>

        <Animated.View style={{opacity: this.state.LogoText}}>
          <Text style={styles.text}>
            <Text style={styles.textPrimary}>SHELF</Text>VIBE
          </Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242c42',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 20,
  },
  textPrimary: {
    color: '#f53ba3',
  },
});
