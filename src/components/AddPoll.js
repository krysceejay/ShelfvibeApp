import React,{useState} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import {addPoll} from '../actions/pollActions';

const AddPoll = ({closeModal, addPoll, clubId}) => {
  const [formData, setFormData] = useState({
    pollname: '',
    pollbooks: [],
    book1: '',
    book2: '',
    book3: '',
    book4: '',
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

    addPollAction = async () => {
      if(book1 !== '' && book1 !== undefined && book1 !== null) pollbooks.push(book1);
      if(book2 !== '' && book2 !== undefined && book2 !== null) pollbooks.push(book2);
      if(book3 !== '' && book3 !== undefined && book3 !== null) pollbooks.push(book3);
      if(book4 !== '' && book4 !== undefined && book4 !== null) pollbooks.push(book4);

      const userAddPoll = await addPoll({
        clubId,
        pollname,
        pollbooks,
      });
      if (userAddPoll == 'failed' || Array.isArray(userAddPoll)) {
        if (Array.isArray(userAddPoll)) {
          const errMsges = {};
          userAddPoll.forEach(item => {
            errMsges[item.field] = item.message;
          });
          setErrorMsg(errMsges);
        }
      } else {
        onClosePress();
      }
    };

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.closeBtn}>
            <Text style={styles.title}>
            Add Poll
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
                  <Text style={styles.textLabel}>Poll Name</Text>
                  <TextInput 
                  placeholder="Enter poll name" 
                  style={styles.textInput}
                  value={pollname}
                  onChangeText={onChange('pollname')} 
                  />
                  {pollName !== '' && (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMessage}>{pollName}</Text>
                    </Animatable.View>
                  )}
                </View>
                <View style={styles.singleInput}>
                  <Text style={styles.textLabel}>Book 1</Text>
                  <TextInput 
                  placeholder="Enter book title" 
                  style={styles.textInput} 
                  value={book1}
                  onChangeText={onChange('book1')}
                  />
                </View>
                <View style={styles.singleInput}>
                  <Text style={styles.textLabel}>Book 2</Text>
                  <TextInput 
                  placeholder="Enter book title" 
                  style={styles.textInput} 
                  value={book2}
                  onChangeText={onChange('book2')}
                  />
                </View>
                <View style={styles.singleInput}>
                  <Text style={styles.textLabel}>Book 3</Text>
                  <TextInput 
                  placeholder="Enter book title" 
                  style={styles.textInput} 
                  value={book3}
                  onChangeText={onChange('book3')}
                  />
                </View>
                <View style={styles.singleInput}>
                  <Text style={styles.textLabel}>Book 4</Text>
                  <TextInput 
                  placeholder="Enter book title" 
                  style={styles.textInput} 
                  value={book4}
                  onChangeText={onChange('book4')}
                  />
                </View>
                <View style={styles.singleInput}>
                  <TouchableOpacity style={styles.signIn} activeOpacity={0.6} onPress={addPollAction}>
                    <Text style={styles.textSign}>Add Poll</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
    
    )
}

export default connect(
  null,
  {addPoll},
)(AddPoll);

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
        color: '#333',
        backgroundColor: '#eee',
        height: 50,
        paddingHorizontal: 10,
        borderColor: '#ddd', 
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
      errorMessage: {
        fontSize: 13,
        color: 'red',
        marginTop: 3
      },
})
