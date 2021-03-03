import React,{useState} from 'react';
import {connect} from 'react-redux';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput, Image,
   Alert, 
   KeyboardAvoidingView,
  Platform,
  ScrollView
}
   from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import * as Animatable from 'react-native-animatable';
import {addBookToList} from '../actions/bookListActions';

const AddBook = ({closeModal, clubId, addBookToList}) => {
  const {colors} = useTheme();
    const [formData, setFormData] = useState({
       booktitle: '',
       bookcover: null
     });
  
     const {
      booktitle,
      bookcover
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
    
    addBookListAction = async () => {
      if(booktitle === '' || booktitle === undefined || booktitle === null) {
        Alert.alert('Failed', 'Add a valid book title');
        return;
      }
      const userAddBookToList = await addBookToList({
        clubId,
        booktitle,
        bookcover,
      });
      if (userAddBookToList == 'failed' || Array.isArray(userAddBookToList)) {
        if (Array.isArray(userAddBookToList)) {
          const errMsges = {};
          userAddBookToList.forEach(item => {
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
            <Text style={[styles.title, {color: colors.text}]}>
            Add Book
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
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex: 1, paddingBottom: 30}}>
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              <View style={styles.inputContainer}>
                <View style={styles.singleInput}>
                  <Text style={[styles.textLabel, {color: colors.text}]}>Book Title</Text>
                  <TextInput 
                  placeholder="Enter title" 
                  placeholderTextColor={colors.placeholder}
                  selectionColor={colors.text}
                  style={[styles.textInput, {color: colors.text, backgroundColor: colors.background, borderColor: colors.border}]} 
                  value={booktitle}
              onChangeText={onChange('booktitle')} />
                {title !== '' && (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMessage}>{title}</Text>
                  </Animatable.View>
                )}
                </View>
                <View style={styles.singleInput}>
                    <Text style={[styles.textLabel, {color: colors.text}]}>Book cover</Text>
                    <View
                        style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={handleChoosePhoto}>
                        <View style={styles.iconContainer}>
                            <Text style={[styles.textStyle, {color: colors.text}]}>Upload</Text>
                            <FontAwesome name="upload" size={20} color={colors.icon} />
                        </View>
                        </TouchableOpacity>
                        <View style={styles.showImage}>
                        {bookcover ? (
                            <Image source={{uri: bookcover.uri}} style={styles.bookCover} />
                        ) : null}
                        
                        </View>
                    </View>
                </View>
                <View style={styles.singleInput}>
                  <TouchableOpacity style={styles.signIn} activeOpacity={0.6} onPress={addBookListAction}>
                    <Text style={[styles.textSign, {color: colors.text}]}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
              </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    
    )
}
export default connect(
  null,
  {addBookToList},
)(AddBook);

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
        fontFamily: 'Nunito-Regular',
        fontSize: 14,
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
      errorMessage: {
        fontSize: 13,
        color: 'red',
        marginTop: 3
      }, 
})
