import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.text}>
        <Text style={styles.textPrimary}>SHELF</Text>VIBE
      </Text> */}

      <Image style={styles.logo} source={require('../assets/img/logo.png')} />

      {/* <TouchableOpacity>
        <Icon style={styles.icon} name="search" size={22} />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'red',
    //marginTop: 25,
    height: '100%',
    width: '100%',
    //padding: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  // logoContainer: {
  //   width: 80,
  //   // height: 55,
  // },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Nunito-BoldItalic',
  },
  textPrimary: {
    color: '#f53ba3',
  },
  icon: {
    position: 'absolute',
    right: 16,
    color: '#fff',
  },
});
