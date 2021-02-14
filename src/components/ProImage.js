import React,{useState} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import Config from 'react-native-config';
import {updateProPixAction} from '../actions/authActions';

const proURL = Config.IMAGE_URL;

const ProImage = ({closeModal, userimg, updateProPixAction}) => {
    const [formData, setFormData] = useState({
      proimage: null,
      proimagename: userimg,
      isLoading: false,
    });
 
    const {
    proimage,
    proimagename,
    isLoading
   } = formData;

    const onClosePress = () => {
        closeModal();
      };

      handleChoosePhoto = () => {
        const options = {
          title: 'Select Profile Image',
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
              const proimage = {
                uri: response.uri,
                type: response.type,
                name: response.fileName || response.uri.substr(response.uri.lastIndexOf('/')).slice(1),
            };
            setFormData({...formData, proimage});
          }
        });
      }; 

      uploadImageAction = async () => {
        setFormData({...formData, isLoading: true});
        const userPropix = await updateProPixAction({
         proimage, 
         proimagename
        });
        if (userPropix == 'failed') {
         setFormData({...formData, isLoading: false});
        } else {
          onClosePress();
        }
      }; 

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.closeBtn}>
            <Text style={styles.title}>
            Upload Image
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
                    <Text style={styles.textLabel}>Profile Image</Text>
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
                        {proimage ? (
                            <Image source={{uri: proimage.uri}} style={styles.bookCover} />
                        ) : <Image source={{ uri: `${proURL}/profiles/${proimagename}`}} style={styles.bookCover}
                      />}
                        
                        </View>
                    </View>
                </View>
                <View style={styles.singleInput}>
                  <TouchableOpacity style={styles.signIn} activeOpacity={0.6} onPress={uploadImageAction}>
                    <Text style={styles.textSign}>Upload</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
    
    )
}

export default connect(
  null,
  {updateProPixAction}
)(ProImage);

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
