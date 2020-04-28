import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Forgotpass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check_textInputChange: false,
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Please enter your email.</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.action}>
              <Ionicons name="ios-mail" color="#f53ba3" size={25} />
              <TextInput
                placeholder="Your email..."
                style={styles.textInput}
                onChangeText={text => this.textInputChange(text)}
              />
            </View>
          </KeyboardAvoidingView>

          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn}>
              <Text style={styles.textSign}>Submit</Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 18,
    color: '#333',
  },

  button: {
    alignItems: 'center',
    paddingVertical: 18,
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
    borderColor: '#f53ba3',
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
