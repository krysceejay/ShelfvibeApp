import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Loader from '../components/Loader';

const LoadingScene = props => {
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  useEffect(() => {
    switchToTab();
  });

  // async componentDidMount() {
  //   // const {LogoAnime, LogoText} = this.state;
  //   // Animated.parallel([
  //   //   Animated.timing(LogoText, {
  //   //     toValue: 1,
  //   //     duration: 2500,
  //   //     useNativeDriver: true,
  //   //   }),
  //   // ]).start(() => {
  //   //   this.setState({
  //   //     loadingSpinner: true,
  //   //   });
  //   // });
  //   // const authData = await AsyncStorage.getItem('loginData');
  //   // this.isLoggedIn = JSON.parse(authData);
  //   // console.log(this.isLoggedIn);

  //   await this.switchToTab();

  //   // You can load api data or any other thing here if you want
  //   // const data = await this.navigateToHome();
  //   // if (data !== null) {
  //   //   this.props.navigation.navigate('Bottom Tabs');
  //   // }
  // }

  //   navigateToHome = async () => {
  //     // Splash screen will remain visible for 2 seconds
  //     const wait = time => new Promise(resolve => setTimeout(resolve, time));
  //     return wait(2000).then(() => this.props.navigation.navigate('Bottom Tabs'));
  //   };

  switchToTab = async () => {
    return setTimeout(
      () => props.navigation.navigate('BottomTabs'),
      //this.props.navigation.dispatch(StackActions.replace('Bottom Tabs'))
      4000,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animatable.Image
          animation="bounceInDown"
          duration={2200}
          style={styles.logo}
          source={require('../assets/img/logo.png')}
          // onAnimationEnd={() => {
          //   this.setState({
          //     loadingSpinner: true,
          //   });
          // }}
        />
      </View>
      {loadingSpinner ? (
        <Loader
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
      <Animatable.Text
        animation="tada"
        duration={2500}
        style={styles.text}
        onAnimationEnd={() => {
          setLoadingSpinner(true);
        }}>
        <Text style={styles.textPrimary}>SHELF</Text>VIBE
      </Animatable.Text>
    </View>
  );
};

export default LoadingScene;

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
    color: '#242c42',
    fontSize: 25,
    fontWeight: '600',
    marginTop: 20,
    fontFamily: 'Nunito-BoldItalic',
  },
  textPrimary: {
    color: '#00a2cc',
  },
});
