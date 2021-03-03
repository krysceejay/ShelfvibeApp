import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {signup} from '../../actions/authActions';
import Loader from '../../components/Loader';

const Signup = ({signup, navigation}) => {
  const {colors} = useTheme();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    useremail: '',
    userName: '',
    password: '',
    secureTextEntry: true,
    isLoading: false,
  });

  const [errorMsg, setErrorMsg] = useState({
    firstName: '',
    email: '',
    lastName: '',
    passwordfield: '',
    username: '',
  });

  const {
    firstname,
    lastname,
    useremail,
    userName,
    password,
    secureTextEntry,
    isLoading,
  } = formData;

  const {firstName, email, lastName, passwordfield, username} = errorMsg;

  const onChange = name => text => setFormData({...formData, [name]: text});

  signupAction = async () => {
    setFormData({...formData, isLoading: true});
    const userSignUp = await signup({
      useremail,
      firstname,
      lastname,
      userName,
      password,
    });
    if (userSignUp == 'failed' || Array.isArray(userSignUp)) {
      setFormData({...formData, isLoading: false});

      if (Array.isArray(userSignUp)) {
        const errMsges = {};
        userSignUp.forEach(item => {
          errMsges[item.field] = item.message;
        });
        setErrorMsg(errMsges);
      }
    } else {
      navigation.navigate('Verify', {
        useremail,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Create a free account.</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={[styles.footer, {backgroundColor: colors.background}]}>
        {/* <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={true}
          extraHeight={10}
          showsVerticalScrollIndicator={false}>
          
        </KeyboardAwareScrollView> */}
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.action}>
            <Ionicons name="ios-person" color={colors.icon} size={25} />
            <TextInput
              placeholder="Your first name..."
              placeholderTextColor={colors.placeholder}
              selectionColor={colors.text}
              style={[styles.textInput, {color: colors.text, backgroundColor: colors.background, borderColor: colors.border}]}
              value={firstname}
              onChangeText={onChange('firstname')}
            />
          </View>
          {firstName == '' ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>{firstName}</Text>
            </Animatable.View>
          )}
          <View style={styles.action}>
            <Ionicons name="ios-person" color={colors.icon} size={25} />
            <TextInput
              placeholder="Your last name..."
              placeholderTextColor={colors.placeholder}
              selectionColor={colors.text}
              style={[styles.textInput, {color: colors.text, backgroundColor: colors.background, borderColor: colors.border}]}
              value={lastname}
              onChangeText={onChange('lastname')}
            />
          </View>
          {lastName == '' ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>{lastName}</Text>
            </Animatable.View>
          )}

          <View style={styles.action}>
            <Ionicons name="ios-mail" color={colors.icon} size={25} />
            <TextInput
              placeholder="Your email..."
              placeholderTextColor={colors.placeholder}
              selectionColor={colors.text}
              style={[styles.textInput, {color: colors.text, backgroundColor: colors.background, borderColor: colors.border}]}
              value={useremail}
              autoCapitalize="none"
              onChangeText={onChange('useremail')}
            />
          </View>
          {email == '' ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>{email}</Text>
            </Animatable.View>
          )}

          <View style={styles.action}>
            <Ionicons name="ios-person" color={colors.icon} size={25} />
            <TextInput
              placeholder="Your user name..."
              placeholderTextColor={colors.placeholder}
              selectionColor={colors.text}
              style={[styles.textInput, {color: colors.text, backgroundColor: colors.background, borderColor: colors.border}]}
              value={userName}
              onChangeText={onChange('userName')}
            />
          </View>
          {username == '' ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>{username}</Text>
            </Animatable.View>
          )}
          <View style={styles.action}>
            <Ionicons name="ios-lock" color={colors.icon} size={25} />
            <TextInput
              placeholder="Your password..."
              secureTextEntry={secureTextEntry}
              placeholderTextColor={colors.placeholder}
              selectionColor={colors.text}
              style={[styles.textInput, {color: colors.text, backgroundColor: colors.background, borderColor: colors.border}]}
              value={password}
              minLen
              onChangeText={onChange('password')}
            />

            <TouchableOpacity
              onPress={() =>
                setFormData({...formData, secureTextEntry: !secureTextEntry})
              }>
              {secureTextEntry ? (
                <Ionicons name="md-eye-off" color={colors.icon} size={25} />
              ) : (
                <Ionicons name="md-eye" color={colors.icon} size={25} />
              )}
            </TouchableOpacity>
          </View>
          {passwordfield == '' ? 
          <Text style={[styles.fieldMessage, {color: colors.text}]}>not less than 6 characters</Text> : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>{passwordfield}</Text>
            </Animatable.View>
          )}

          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={signupAction}>
              <Text style={[styles.textSign, {color: colors.text}]}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.signUp}>
              <Text style={[styles.textSignUp, {color: colors.text}]}> Already have account ?</Text>
              <TouchableOpacity
                style={styles.signUpBtn}
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text style={[styles.signUpBtnText, {color: colors.text}]}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </Animatable.View>
      {isLoading ? (
        <Loader
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

export default connect(
  null,
  {signup},
)(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00a2cc',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  footer: {
    flex: 4,
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
    fontSize: 17
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
    borderColor: '#00a2cc',
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
    fontFamily: 'Nunito-Regular'
  },
  signUpBtn: {
    marginLeft: 5,
  },
  signUpBtnText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
  },
  errorMessage: {
    fontSize: 13,
    color: 'red',
  },
  fieldMessage: {
    fontSize: 13,
  },
});
