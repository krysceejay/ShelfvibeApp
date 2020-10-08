import React, {useState, useEffect} from 'react';
//import {useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {login} from '../../actions/authActions';

const Login = props => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     check_textInputChange: false,
  //     password: '',
  //     secureTextEntry: true,
  //   };
  // }
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  //const dispatch = useDispatch();
  // textInputChange = value => {
  //   if (value.length !== 0) {
  //     this.setState({
  //       check_textInputChange: true,
  //     });
  //   } else {
  //     this.setState({
  //       check_textInputChange: false,
  //     });
  //   }
  // };

  // secureTextEntry = () => {
  //   this.setState({
  //     secureTextEntry: !this.state.secureTextEntry,
  //   });
  // };

  loginAction = async () => {
    setIsLoading(true);
    await props.login({username, password});
    setIsLoading(false);
    // console.log(props.isLoggedIn);
    // if (props.isLoggedIn == false) {
    //   props.navigation.navigate('Dashboard');
    // }
    // const authData = await AsyncStorage.getItem('loginData');
    // const authDataParse = JSON.parse(authData);
    // if (authDataParse !== null) {
    //   if (authDataParse.isLoggedIn == true) {
    //     props.navigation.navigate('Dashboard');
    //   }
    // } else {
    //   return false;
    // }
  };

  if (props.isLoggedIn) {
    props.navigation.navigate('Dashboard');
    //console.log('logged in');
  }

  // useEffect(() => {
  //   if (props.isLoggedIn == false) {
  //     props.navigation.navigate('Dashboard');
  //   }
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>
          Please enter your credentials to login.
        </Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        {/* <Text style={styles.textFooter}>E-Mail</Text> */}
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.action}>
            <Ionicons name="ios-mail" color="#333" size={25} />
            <TextInput
              placeholder="Your email..."
              autoCapitalize="none"
              style={styles.textInput}
              value={username}
              //onChangeText={text => this.textInputChange(text)}
              onChangeText={text => setUsername(text)}
            />
          </View>

          {/* <Text style={styles.textFooter}>Password</Text> */}
          <View style={styles.action}>
            <Ionicons name="ios-lock" color="#333" size={25} />
            <TextInput
              placeholder="Your password..."
              secureTextEntry={secureTextEntry}
              style={styles.textInput}
              value={password}
              // onChangeText={text =>
              //   this.setState({
              //     password: text,
              //   })
              // }
              onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}>
              {secureTextEntry ? (
                <Ionicons name="md-eye-off" color="#000" size={25} />
              ) : (
                <Ionicons name="md-eye" color="#000" size={25} />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Forgot Password');
          }}>
          <Text style={styles.forgotPass}> Forgot password ?</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            // onPress={() =>
            //   //dispatch(login({username: username, password: password}))
            //   props.login({username: username, password: password})
            // }
            onPress={loginAction}>
            <Text style={styles.textSign}>Sign In</Text>
          </TouchableOpacity>
          <View style={styles.signUp}>
            <Text style={styles.textSignUp}> Don't have account ?</Text>
            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={() => {
                props.navigation.navigate('Signup');
              }}>
              <Text style={styles.signUpBtnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
      {isLoading ? (
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
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />
      ) : null}
    </View>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.login.isLoggedIn,
});

export default connect(
  mapStateToProps,
  {login},
)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00a2cc',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingHorizontal: 20,
    //paddingBottom: 40,
    paddingVertical: 15,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textHeader: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#fff',
  },
  textFooter: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    //paddingVertical: 10,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    //marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingVertical: 15,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#333',
  },

  button: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  forgotPass: {
    paddingVertical: 10,
    color: '#009bd1',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#00a2cc',
    borderWidth: 1,
    //marginTop: 15,
  },
  textSign: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
  signUp: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  textSignUp: {
    fontSize: 15,
    fontFamily: 'Nunito-Regular',
    color: 'grey',
  },
  signUpBtn: {
    marginLeft: 5,
  },
  signUpBtnText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
  },
});
