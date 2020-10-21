import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet, View, Animated} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../components/Loader';
//import Circle from '../components/Circle';

const LoadingScene = ({navigation}) => {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  // const animatedValue = useRef(new Animated.Value(0)).current;

  // const inputRange = [0, 0.001, 0.5, 0.501, 1];
  // const backgroundColor = animatedValue.interpolate({
  //   inputRange,
  //   outputRange: ['#242c42', '#242c42', '#242c42', '#4dbedb', '#4dbedb'],
  // });

  useEffect(() => {
    // Animated.sequence([
    //   Animated.timing(animatedValue, {
    //     toValue: 1,
    //     duration: 2000,
    //     useNativeDriver: false,
    //   }),
    //   Animated.timing(animatedValue, {
    //     toValue: 0,
    //     duration: 2000,
    //     useNativeDriver: false,
    //   }),
    // ]).start();
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
      () => navigation.navigate('BottomTabs'),
      //this.props.navigation.dispatch(StackActions.replace('Bottom Tabs'))
      4000,
    );
    //return true;
  };

  return (
    <LinearGradient
      colors={['#99daeb', '#ccecf5', '#f3fbfd', '#e6f6fa']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
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
    </LinearGradient>
  );

  // return (
  //   <Animated.View
  //     style={[
  //       StyleSheet.absoluteFillObject,
  //       styles.container,
  //       {
  //         backgroundColor,
  //       },
  //     ]}>
  //     <Animated.View style={styles.subContainer}>
  //       <View style={styles.logoContainer}>
  //         <Animatable.Image
  //           animation="bounceInDown"
  //           duration={3000}
  //           style={styles.logo}
  //           source={require('../assets/img/logo.png')}
  //         />
  //       </View>
  //       <Animatable.Text animation="tada" duration={3500} style={styles.text}>
  //         SHELFVIBE
  //       </Animatable.Text>
  //       {/* <CircleAnim /> */}
  //     </Animated.View>
  //     <View style={styles.circleStyle}>
  //       <Circle animatedValue={animatedValue} />
  //     </View>
  //   </Animated.View>
  // );
};

export default LoadingScene;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    //paddingBottom: 100,
  },
  subContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  circleStyle: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
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
