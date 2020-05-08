import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check_textInputChange: false,
      password: '',
      secureTextEntry: true,
    };
  }

  textInputChange = value => {
    if (value.length !== 0) {
      this.setState({
        check_textInputChange: true,
      });
    } else {
      this.setState({
        check_textInputChange: false,
      });
    }
  };

  secureTextEntry = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Create a free account.</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          {/* <Text style={styles.textFooter}>E-Mail</Text> */}
          <KeyboardAwareScrollView
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            <View style={styles.action}>
              <Ionicons name="ios-person" color="#f53ba3" size={25} />
              <TextInput
                placeholder="Your first name..."
                style={styles.textInput}
                onChangeText={text => this.textInputChange(text)}
              />
            </View>
            <View style={styles.action}>
              <Ionicons name="ios-person" color="#f53ba3" size={25} />
              <TextInput
                placeholder="Your last name..."
                style={styles.textInput}
                onChangeText={text => this.textInputChange(text)}
              />
            </View>

            <View style={styles.action}>
              <Ionicons name="ios-mail" color="#f53ba3" size={25} />
              <TextInput
                placeholder="Your email..."
                style={styles.textInput}
                onChangeText={text => this.textInputChange(text)}
              />
            </View>

            <View style={styles.action}>
              <Ionicons name="ios-person" color="#f53ba3" size={25} />
              <TextInput
                placeholder="Your user name..."
                style={styles.textInput}
                onChangeText={text => this.textInputChange(text)}
              />
            </View>

            {/* <Text style={styles.textFooter}>Password</Text> */}
            <View style={styles.action}>
              <Ionicons name="ios-lock" color="#f53ba3" size={25} />
              <TextInput
                placeholder="Your password..."
                secureTextEntry={this.state.secureTextEntry}
                style={styles.textInput}
                value={this.state.password}
                onChangeText={text =>
                  this.setState({
                    password: text,
                  })
                }
              />

              <TouchableOpacity onPress={() => this.secureTextEntry()}>
                {this.state.secureTextEntry ? (
                  <Ionicons name="md-eye-off" color="#000" size={25} />
                ) : (
                  <Ionicons name="md-eye" color="#000" size={25} />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.button}>
              <TouchableOpacity style={styles.signIn}>
                <Text style={styles.textSign}>Sign Up</Text>
              </TouchableOpacity>
              <View style={styles.signUp}>
                <Text style={styles.textSignUp}> Already have account ?</Text>
                <TouchableOpacity
                  style={styles.signUpBtn}
                  onPress={() => {
                    this.props.navigation.navigate('Login');
                  }}>
                  <Text style={styles.signUpBtnText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242c42',
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
    flex: 4,
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
    paddingVertical: 15,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#f53ba3',
    borderWidth: 1,
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
