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
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {enterNewpasswordAction} from '../../actions/authActions';
import Loader from '../../components/Loader';

const NewPassword = ({enterNewpasswordAction, navigation, route}) => {
    const {useremail} = route.params;
  const [formData, setFormData] = useState({
    password: '',
    secureTextEntry: true,
    isLoading: false,
  });

  const [errorMsg, setErrorMsg] = useState({
    passwordfield: ''
  });

  const {password, secureTextEntry, isLoading} = formData;

  const {passwordfield} = errorMsg;

  const onChange = name => text => setFormData({...formData, [name]: text});

  newPasswordAction = async () => {
    if(password === '' || password === undefined || password === null) {
        Alert.alert('Failed', 'Enter a new password');
        return;
      }
    setFormData({...formData, isLoading: true});
    const newPassword = await enterNewpasswordAction({
        useremail,
        password
    });
    if (newPassword == 'failed' || Array.isArray(newPassword)) {
      setFormData({...formData, isLoading: false});
      if (Array.isArray(newPassword)) {
        const errMsges = {};
        newPassword.forEach(item => {
          errMsges[item.field] = item.message;
        });
        setErrorMsg(errMsges);
      }
    }else {
      navigation.navigate('Login');
    } 
  };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Kindly choose a new password.</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <KeyboardAvoidingView behavior="padding">
          <View style={styles.action}>
            <Ionicons name="ios-lock" color="#333" size={25} />
            <TextInput
              placeholder="Your password..."
              secureTextEntry={secureTextEntry}
              style={styles.textInput}
              value={password}
              minLen
              onChangeText={onChange('password')}
            />

            <TouchableOpacity
              onPress={() =>
                setFormData({...formData, secureTextEntry: !secureTextEntry})
              }>
              {secureTextEntry ? (
                <Ionicons name="md-eye-off" color="#000" size={25} />
              ) : (
                <Ionicons name="md-eye" color="#000" size={25} />
              )}
            </TouchableOpacity>
          </View>
          {passwordfield == '' ? 
           <Text style={styles.fieldMessage}>not less than 6 characters</Text> : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>{passwordfield}</Text>
            </Animatable.View>
          )}
          </KeyboardAvoidingView>

          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={newPasswordAction}>
              <Text style={styles.textSign}>Submit</Text>
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
    {enterNewpasswordAction},
  )(NewPassword);

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
  errorMessage: {
    fontSize: 13,
    color: 'red',
  },
  fieldMessage: {
    fontSize: 13,
  },
});
