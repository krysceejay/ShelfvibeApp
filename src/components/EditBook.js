import React,{useState} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Image, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import * as Animatable from 'react-native-animatable';
import Config from 'react-native-config';
import {editBookToList, removeListAction} from '../actions/bookListActions';

const imgURL = Config.IMAGE_URL;

const EditBook = ({closeModal, item, editBookToList, removeListAction, clubId}) => {
    const [formData, setFormData] = useState({
      booktitle: item.title,
      bookcover: null,
      bookcovername: item.bookcover
    });
 
    const {
     booktitle,
     bookcover,
     bookcovername
   } = formData;
 
   const [errorMsg, setErrorMsg] = useState({
     title: ''
   });
 
   const {title} = errorMsg;
 
   const onChange = name => text => setFormData({...formData, [name]: text});

    const onClosePress = () => {
        closeModal();
      };

      handleChoosePhoto = () => {
        const options = {
          title: 'Select Book Cover',
          storageOptions: {
            skipBackup: true,
            path: 'Shelfvibe Images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          if (response.didCancel) {
            return;
          } else if (response.error) {
            return;
          } else {
              const bookcover = {
                uri: response.uri,
                type: response.type,
                name: response.fileName || response.uri.substr(response.uri.lastIndexOf('/')).slice(1),
            };
            setFormData({...formData, bookcover});
          }
        });
      }; 

      editBookListAction = async () => {
        if(booktitle === '' || booktitle === undefined || booktitle === null) {
          Alert.alert('Failed', 'Add a valid book title');
          return;
        }
        const userEditBookToList = await editBookToList({
          clubId,
          listId: item.id,
          booktitle,
          bookcover,
          bookcovername
        });
        if (userEditBookToList == 'failed' || Array.isArray(userEditBookToList)) {
          if (Array.isArray(userEditBookToList)) {
            const errMsges = {};
            userEditBookToList.forEach(item => {
              errMsges[item.field] = item.message;
            });
            setErrorMsg(errMsges);
          }
        } else {
          onClosePress();
        }
      }; 

      removeList = async () => {
        await removeListAction(item.id);
        onClosePress();
      } 

      const deleteListBtn = () =>
        Alert.alert(
          'Delete Book',
          'Click OK to proceed?',
          [
            {
              text: 'Cancel',
              onPress: () => false,
              style: 'cancel',
            },
            {text: 'OK', onPress: () => removeList()},
          ],
          {cancelable: false},
        );

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.closeBtn}>
            <Text style={styles.title}>
            Edit Book
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
                  <Text style={styles.textLabel}>Book Title</Text>
                  <TextInput placeholder="Enter title" style={styles.textInput} value={booktitle}
              onChangeText={onChange('booktitle')} />
              {title !== '' && (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMessage}>{title}</Text>
                  </Animatable.View>
                )}
                </View>
                <View style={styles.singleInput}>
                    <Text style={styles.textLabel}>Book cover</Text>
                    <View
                        style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={handleChoosePhoto}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.textStyle}>Upload</Text>
                            <FontAwesome name="upload" size={20} color="#3a4155" />
                        </View>
                        </TouchableOpacity>
                        <View style={styles.showImage}>
                        {bookcover ? (
                            <Image source={{uri: bookcover.uri}} style={styles.bookCover} />
                        ) : <Image source={{ uri: `${imgURL}/bookcover/${bookcovername}`}} style={styles.bookCover}
                      />}
                        
                        </View>
                    </View>
                </View>
                <View style={styles.singleInput}>
                  <TouchableOpacity style={styles.signIn} activeOpacity={0.6} onPress={editBookListAction}>
                    <Text style={styles.textSign}>Submit</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.orText}>OR</Text>
                <View style={styles.singleInput}>
                  <TouchableOpacity style={styles.delete} activeOpacity={0.6} onPress={deleteListBtn}>
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
  {editBookToList, removeListAction},
)(EditBook);

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
      iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 2,
        paddingVertical: 5,
        paddingHorizontal: 10,
      },
      textStyle: {
        //textAlign: 'center',
        fontFamily: 'Nunito-Regular',
        fontSize: 14,
        color: '#333',
        paddingHorizontal: 10,
      },
      showImage: {
        //backgroundColor: 'red',
        height: 50,
        width: 50,
        marginLeft: 25,
      },
      bookCover: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
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
      }
})
