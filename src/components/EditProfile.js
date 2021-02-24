import React, {useState} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import {updateUserAction} from '../actions/authActions';

const EditProfile = ({closeModal, user, updateUserAction}) => {
  const {dark, colors} = useTheme();
    const [formData, setFormData] = useState({
        firstname: user.firstName,
        lastname: user.lastName,
        userName: user.username,
        aboutMe: user.about,
        isLoading: false,
      });
    
      const [errorMsg, setErrorMsg] = useState({
        firstName: '',
        lastName: '',
        username: '',
        about: ''
      });
    
      const {
        firstname,
        lastname,
        userName,
        aboutMe,
        isLoading,
      } = formData;
    
      const {firstName, lastName, about, username} = errorMsg;
    
      const onChange = name => text => setFormData({...formData, [name]: text});

    const onClosePress = () => {
        closeModal();
      };

      updateProfile = async () => {
        setFormData({...formData, isLoading: true});
        const userUpdate = await updateUserAction({
            firstname, 
            lastname, 
            userName, 
            aboutMe
         });
         if (userUpdate == 'failed' || Array.isArray(userUpdate)) {
            setFormData({...formData, isLoading: false});
           if (Array.isArray(userUpdate)) {
             const errMsges = {};
             userUpdate.forEach(item => {
               errMsges[item.field] = item.message;
             });
             setErrorMsg(errMsges);
           }
         } else {
            onClosePress();
         }
      }  
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
          <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
            <View style={styles.closeBtn}>
            <Text style={[styles.title, {color: colors.text}]}>
            Edit Profile
            </Text>
            <TouchableOpacity onPress={onClosePress}
            style={{
                backgroundColor: '#fff',
                borderRadius: 15,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#bbb'
            }}
            activeOpacity={0.9}>
            <Ionicons
                name="md-close"
                size={18}
                color="#444444"
            />
            </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={true}
          extraHeight={10}
          showsVerticalScrollIndicator={false}>
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
            <Animatable.View animation="fadeInLeft" duration={500} style={{paddingHorizontal: 15}}>
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
            <Animatable.View animation="fadeInLeft" duration={500} style={{paddingHorizontal: 15}}>
              <Text style={styles.errorMessage}>{lastName}</Text>
            </Animatable.View>
          )}

          <View style={styles.action}>
            <Ionicons name="ios-mail" color={colors.icon} size={25} />
            <TextInput
              style={[styles.textInput, {color: colors.text, backgroundColor: colors.background, borderColor: colors.border}]}
              value={user.email}
              autoCapitalize="none"
              editable={false}
            />
          </View>

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
            <Animatable.View animation="fadeInLeft" duration={500} style={{paddingHorizontal: 15}}>
              <Text style={styles.errorMessage}>{username}</Text>
            </Animatable.View>
          )}
          <View style={styles.singleInput}>
              <Text style={[styles.textLabel, {color: colors.text}]}>About <Text style={styles.lilinfo}>(not more than 300 characters)</Text></Text>
              <View>
                <TextInput
                  multiline
                  numberOfLines={4}
                  editable
                  placeholder="Brief gist about you"
                  placeholderTextColor={colors.placeholder}
                  selectionColor={colors.text}
                  maxLength={300}
                  style={{
                    backgroundColor: colors.background,
                    borderWidth: 1,
                    borderColor: colors.border,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    fontSize: 14,
                    color: colors.text,
                  }}
                  value={aboutMe}
                onChangeText={onChange('aboutMe')}
                />
              </View>
              {about !== '' && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMessage}>{about}</Text>
                </Animatable.View>
              )}
            </View>
            <View style={styles.singleInput}>
              <TouchableOpacity style={styles.signIn} onPress={updateProfile}>
                <Text style={[styles.textSign, {color: colors.text}]}>Update</Text>
              </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default connect(
    null,
    {updateUserAction},
  )(EditProfile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    closeBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
      },
      title: {
        fontSize: 20,
        fontFamily: 'Nunito-Bold',
      },
      action: {
        flexDirection: 'row',
        alignItems: 'center',
        //marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        padding: 15,
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
      errorMessage: {
        fontSize: 13,
        color: 'red',
      },
      singleInput: {
        padding: 15,
      },
      textLabel: {
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
        marginBottom: 5,
      },
      lilinfo: {
        fontSize: 11,
      },
      signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 2,
        alignSelf: 'center',
      },
      textSign: {
        fontSize: 18,
        fontFamily: 'Nunito-Bold',
      },
})
