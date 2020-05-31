import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  Animated,
  ActivityIndicator,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class LoadingScene extends Component {
  state = {
    // LogoAnime: new Animated.Value(0),
    // LogoText: new Animated.Value(0),
    loadingSpinner: false,
  };
  async componentDidMount() {
    // const {LogoAnime, LogoText} = this.state;
    // Animated.parallel([
    //   Animated.timing(LogoText, {
    //     toValue: 1,
    //     duration: 2500,
    //     useNativeDriver: true,
    //   }),
    // ]).start(() => {
    //   this.setState({
    //     loadingSpinner: true,
    //   });
    // });

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
      () =>
        // this.props.navigation.navigate('Bottom Tabs')
        //this.props.navigation.dispatch(StackActions.replace('Bottom Tabs'))
        this.props.navigation.replace('Bottom Tabs'),
      4000,
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Animatable.Image
            animation="bounceInDown"
            duration={2200}
            style={styles.logo}
            source={require('../assets/img/logo.png')}
            onAnimationEnd={() => {
              this.setState({
                loadingSpinner: true,
              });
            }}
          />
        </View>
        {this.state.loadingSpinner ? (
          <ActivityIndicator
            size={Platform.OS === 'ios' ? 'large' : 70}
            color="#ccc"
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

        {/* <Animated.View style={{opacity: this.state.LogoText}}>
          <Text style={styles.text}>
            <Text style={styles.textPrimary}>SHELF</Text>VIBE
          </Text>
        </Animated.View> */}
        {/* <Animatable.Text
          animation="tada"
          duration={2500}
          style={styles.text}
          onAnimationEnd={() => {
            this.setState({
              loadingSpinner: true,
            });
          }}>
          <Text style={styles.textPrimary}>SHELF</Text>VIBE
        </Animatable.Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#242c42',
  },
  logoContainer: {
    width: 90,
    height: 90,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '600',
    marginTop: 20,
    fontFamily: 'Nunito-BoldItalic',
  },
  textPrimary: {
    color: '#e91e63',
  },
});
