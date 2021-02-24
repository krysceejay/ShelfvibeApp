import React,{useState} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import {editPoll, removePollAction} from '../actions/pollActions';
import {isEmpty} from '../utils/theme';

const EditPoll = ({closeModal, item, editPoll, removePollAction, clubId}) => {
  const {colors} = useTheme();
  const [formData, setFormData] = useState({
    pollname: item.pollName,
    pollbooks: [],
    book1: isEmpty(item.books) ? '' : item.books[0],
    book2: isEmpty(item.books) ? '' : item.books[1],
    book3: isEmpty(item.books) ? '' : item.books[2],
    book4: isEmpty(item.books) ? '' : item.books[3],
   });

   const {
    pollname,
    pollbooks,
    book1,
    book2,
    book3,
    book4
  } = formData;

  const [errorMsg, setErrorMsg] = useState({
    pollName: '',
    books: '',
  });

  const {pollName, books} = errorMsg;

  const onChange = name => text => setFormData({...formData, [name]: text});

    const onClosePress = () => {
        closeModal();
      };

      editPollAction = async () => {
        if(book1 !== '' && book1 !== undefined && book1 !== null) pollbooks.push(book1);
        if(book2 !== '' && book2 !== undefined && book2 !== null) pollbooks.push(book2);
        if(book3 !== '' && book3 !== undefined && book3 !== null) pollbooks.push(book3);
        if(book4 !== '' && book4 !== undefined && book4 !== null) pollbooks.push(book4);
  
        const userEditPoll = await editPoll({
          clubId,
          pollId: item.id,
          pollname,
          pollbooks,
        });
        if (userEditPoll == 'failed' || Array.isArray(userEditPoll)) {
          if (Array.isArray(userEditPoll)) {
            const errMsges = {};
            userEditPoll.forEach(item => {
              errMsges[item.field] = item.message;
            });
            setErrorMsg(errMsges);
          }
        } else {
          closeModal();
        }
      };

      removePoll = async () => {
        await removePollAction(item.id);
        closeModal();
      } 

      const deletePollBtn = () =>
        Alert.alert(
          'Delete Poll',
          'Click OK to proceed?',
          [
            {
              text: 'Cancel',
              onPress: () => false,
              style: 'cancel',
            },
            {text: 'OK', onPress: () => removePoll()},
          ],
          {cancelable: false},
        );

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.closeBtn}>
        <Text style={[styles.title, {color: colors.text}]}>
            Edit Poll
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
          extraHeight={10}>
              <View style={styles.inputContainer}>
                <View style={styles.singleInput}>
                <Text style={[styles.textLabel, {color: colors.text}]}>Poll Name</Text>
                  <TextInput 
                  placeholder="Enter poll name" 
                  value={pollname} 
                  onChangeText={onChange('pollname')}
                  placeholderTextColor={colors.placeholder}
                  selectionColor={colors.text}
                  style={[styles.textInput, {color: colors.text, backgroundColor: colors.background, borderColor: colors.border}]}
                  />
                  {pollName !== '' && (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMessage}>{pollName}</Text>
                    </Animatable.View>
                  )}
                </View>
                <View style={styles.singleInput}>
                  <Text style={[styles.textLabel, {color: colors.text}]}>Book 1</Text>
                  <TextInput 
                  placeholder="Enter book title" 
                  placeholderTextColor={colors.placeholder}
                  selectionColor={colors.text}
                  style={[styles.textInput, {color: colors.text, backgroundColor: colors.background, borderColor: colors.border}]} 
                  value={book1}
                  onChangeText={onChange('book1')}
                  />
                </View>
                <View style={styles.singleInput}>
                  <Text style={[styles.textLabel, {color: colors.text}]}>Book 2</Text>
                  <TextInput 
                  placeholder="Enter book title" 
                  placeholderTextColor={colors.placeholder}
                  selectionColor={colors.text}
                  style={[styles.textInput, {color: colors.text, backgroundColor: colors.background, borderColor: colors.border}]}
                  value={book2}
                  onChangeText={onChange('book2')}
                  />
                </View>
                <View style={styles.singleInput}>
                  <Text style={[styles.textLabel, {color: colors.text}]}>Book 3</Text>
                  <TextInput 
                  placeholder="Enter book title" 
                  placeholderTextColor={colors.placeholder}
                  selectionColor={colors.text}
                  style={[styles.textInput, {color: colors.text, backgroundColor: colors.background, borderColor: colors.border}]}
                  value={book3}
                  onChangeText={onChange('book3')}
                  />
                </View>
                <View style={styles.singleInput}>
                  <Text style={[styles.textLabel, {color: colors.text}]}>Book 4</Text>
                  <TextInput 
                  placeholder="Enter book title" 
                  placeholderTextColor={colors.placeholder}
                  selectionColor={colors.text}
                  style={[styles.textInput, {color: colors.text, backgroundColor: colors.background, borderColor: colors.border}]}
                  value={book4}
                  onChangeText={onChange('book4')}
                  />
                </View>
                <View style={styles.singleInput}>
                  <TouchableOpacity style={styles.signIn} activeOpacity={0.6} onPress={editPollAction}>
                    <Text style={[styles.textSign, {color: colors.text}]}>Submit</Text>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.orText, {color: colors.text}]}>OR</Text>
                <View style={styles.singleInput}>
                  <TouchableOpacity style={styles.delete} activeOpacity={0.6} onPress={deletePollBtn}>
                    <Text style={styles.deleteSign}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
     )
}

export default connect(
  null,
  {editPoll, removePollAction},
)(EditPoll);

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
      inputContainer: {
          marginTop: 10
      },
      singleInput: {
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      textLabel: {
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
        marginBottom: 5,
      },
      textInput: {
        fontFamily: 'Nunito-Regular',
        fontSize: 14,
        height: 50,
        paddingHorizontal: 10,
        borderWidth: 1 
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
      delete: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'red',
        alignSelf: 'center',
        
      },
      deleteSign: {
        fontSize: 18,
        fontFamily: 'Nunito-Bold',
        color: '#fff'
      },
      orText: {
          textAlign: 'center',
          marginVertical: 15,
          fontFamily: 'Nunito-Regular',
        fontSize: 18,
      },
      errorMessage: {
        fontSize: 13,
        color: 'red',
        marginTop: 3
      },
})
