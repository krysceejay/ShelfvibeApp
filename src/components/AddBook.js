import React,{useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';

const AddBook = ({closeModal}) => {
    const [bookcover, setBookcover] = useState(null);
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
            //console.log('ImagePicker Error: ', response.error);
            return;
          } else {
            // const source = {
            //   uri: response.uri,
            //   type: response.type,
            //   name:
            //     response.fileName ||
            //     response.uri.substr(response.uri.lastIndexOf('/' + 1)),
            // };
            // const source = {
            //   uri: response.uri,
            // };
    
            //console.log(response.uri);
    
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            setBookcover(response);
            //this.setState({ photo: response })
          }
        });
      };

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.closeBtn}>
            <Text style={styles.title}>
            Add Book
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
                  <Text style={styles.textLabel}>Book Title</Text>
                  <TextInput placeholder="Enter title" style={styles.textInput} />
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
                        ) : null}
                        
                        </View>
                    </View>
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
export default AddBook;

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
})
