import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {resendVerifyAction} from '../../actions/authActions';
import Loader from '../../components/Loader';

const ResendCode = ({resendVerifyAction, navigation}) => {
  const {colors} = useTheme();
  const [formData, setFormData] = useState({
    useremail: '',
    isLoading: false,
  });

  const {useremail, isLoading} = formData;

  const onChange = name => text => setFormData({...formData, [name]: text});

  resendCodeAction = async () => {
    if(useremail === '' || useremail === undefined || useremail === null) {
        Alert.alert('Failed', 'Enter your email address');
        return;
      }
    setFormData({...formData, isLoading: true});
    const resendCode = await resendVerifyAction(useremail);
    if (resendCode == 'failed') {
      setFormData({...formData, isLoading: false});
    }else {
      navigation.navigate('Verify', {useremail, screen: 'resend'});
    } 
  };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Please enter your email.</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={[styles.footer, {backgroundColor: colors.background}]}>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.action}>
              <Ionicons name="ios-mail" color={colors.icon} size={25} />
              <TextInput
                placeholder="Your email..."
                placeholderTextColor={colors.borderBottomColor}
                selectionColor={colors.text}
                style={[styles.textInput, {color: colors.text, backgroundColor: colors.background, borderColor: colors.border}]}
                value={useremail}
                autoCapitalize="none"
                onChangeText={onChange('useremail')}
              />
            </View>
          </KeyboardAvoidingView>

          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={resendCodeAction}>
              <Text style={[styles.textSign, {color: colors.text}]}>Resend Code</Text>
            </TouchableOpacity>
          </View>
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
  }

  export default connect(
    null,
    {resendVerifyAction},
  )(ResendCode); 

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
