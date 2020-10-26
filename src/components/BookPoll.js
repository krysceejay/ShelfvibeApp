import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BookPoll = (props) => {
    onClosePress = () => {
        props.closeModal();
      };

      addVote =  (id) => {
        return;
      };

      const createTwoButtonAlert = (id) =>
    Alert.alert(
      'Vote',
      'Click OK to add your vote?',
      [
        {
          text: 'Cancel',
          onPress: () => false,
          style: 'cancel',
        },
        {text: 'OK', onPress: () => addVote(id)},
      ],
      {cancelable: false},
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.title}>October Book Poll</Text>
                <Text style={styles.shortText}>Wow another book finished!! And now it's time to decide an addition to our reading list. please vote for the book you would like us to read.</Text>
                <View style={styles.progressContainer}>
                    <TouchableOpacity onPress={() => {createTwoButtonAlert(1)}}>
                        <View style={styles.pollSingle}>
                            <View style={styles.progressSingle}>
                                <View style={[styles.inner, {width: '60%'}]}>
                                    <Text style={styles.innerText}>60%</Text>
                                </View>
                            </View>
                            
                            <Text style={styles.pollText}>Design of Everything</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {createTwoButtonAlert(2)}}>
                        <View style={styles.pollSingle}>
                            <View style={styles.progressSingle}>
                                <View style={[styles.inner, {width: '80%'}]}>
                                    <Text style={styles.innerText}>80%</Text>
                                </View>
                            </View>
                            
                            <Text style={styles.pollText}>Thinking with Type</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {createTwoButtonAlert(3)}}>
                        <View style={styles.pollSingle}>
                            <View style={styles.progressSingle}>
                                <View style={[styles.inner, {width: '70%'}]}>
                                    <Text style={styles.innerText}>70%</Text>
                                </View>
                            </View>
                            
                            <Text style={styles.pollText}>A Designer's Art</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {createTwoButtonAlert(4)}}>
                        <View style={styles.pollSingle} >
                            <View style={styles.progressSingle}>
                                <View style={[styles.inner, {width: '0%'}]}>
                                <Text style={styles.innerText}>0%</Text>
                                </View>
                            </View>
                            
                            <Text style={styles.pollText}>Interaction of Color</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </View>
            <TouchableOpacity style={styles.join} onPress={onClosePress}>
            <Text style={styles.joinText}>Cancel</Text>
          </TouchableOpacity>
            
        </SafeAreaView>
    )
}

export default BookPoll;

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        marginHorizontal: 20,
        //height: '50%',
        width: '95%',
        
        
        //justifyContent: 'center',
        //alignItems: 'center'
      },
      body: {
        backgroundColor: '#fff',
        //marginTop: 2,
        borderRadius: 15,
        padding: 20
      },
      title: {
        fontSize: 18,
        fontFamily: 'Nunito-Bold',
      },
      shortText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 15,
        lineHeight: 23,
        marginTop: 10
      },
      join: {
        //width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 25,
        marginBottom: 10,
        backgroundColor: '#fff',
        //marginHorizontal: 20,
      },
      joinText: {
        fontSize: 16,
        fontFamily: 'Nunito-SemiBold',
        color: '#000'
      },
      progressContainer: {
          marginTop: 15
      },
      progressSingle: {
        width: '100%',
        height: 40,
        //padding: 3,
        //borderColor: '#aaa',
        //borderWidth: 3,
        borderRadius: 15,
        justifyContent: 'center',
        backgroundColor: '#ddd',
      },
      inner: {
        height: 40,
        backgroundColor: '#059e2e',
        borderRadius: 15,
        justifyContent: 'center',
        overflow: 'visible',
        position: 'relative'
        //alignItems: 'center'
      },
      innerText: {
        fontSize: 16,
        fontFamily: 'Nunito-SemiBold',
        position: 'absolute',
        left: 15
      },
      pollSingle: {
        marginTop: 20
      },
      pollText: {
        paddingHorizontal: 15,
        marginTop: 5,
        fontSize: 15,
        fontFamily: 'Nunito-SemiBold',
        color: '#444444',
      }
})
