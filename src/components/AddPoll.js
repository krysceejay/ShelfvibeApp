import React,{useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddPoll = ({closeModal}) => {
    const onClosePress = () => {
        closeModal();
      };
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.closeBtn}>
            <Text style={styles.title}>
            Add Poll
            </Text>
            <TouchableOpacity onPress={onClosePress}
            style={{
                zIndex: 2,
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
                  <TextInput placeholder="Enter poll name" style={styles.textInput} />
                </View>
                <View style={styles.singleInput}>
                  <Text style={styles.textLabel}>Book 1</Text>
                  <TextInput placeholder="Enter book title" style={styles.textInput} />
                </View>
                <View style={styles.singleInput}>
                  <Text style={styles.textLabel}>Book 2</Text>
                  <TextInput placeholder="Enter book title" style={styles.textInput} />
                </View>
                <View style={styles.singleInput}>
                  <Text style={styles.textLabel}>Book 3</Text>
                  <TextInput placeholder="Enter book title" style={styles.textInput} />
                </View>
                <View style={styles.singleInput}>
                  <Text style={styles.textLabel}>Book 4</Text>
                  <TextInput placeholder="Enter book title" style={styles.textInput} />
                </View>
                <View style={styles.singleInput}>
                  <TouchableOpacity style={styles.signIn} activeOpacity={0.6}>
                    <Text style={styles.textSign}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
    
    )
}
export default AddPoll;

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
})
