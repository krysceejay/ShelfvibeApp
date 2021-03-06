import React,{useState} from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Modal,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Switch,
    Alert
  } from 'react-native';
  import { useTheme } from '@react-navigation/native';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
  import ImagePicker from 'react-native-image-picker';
  import * as Animatable from 'react-native-animatable';
  import Config from 'react-native-config';
  import ListGenre from './ListGenre';
  import Loader from './Loader';
  import {updateClubAction, deleteClubAction} from '../actions/clubActions';

  const imgURL = Config.IMAGE_URL;

const EditClub = ({updateClubAction, deleteClubAction, closeModal, item}) => {
    const {colors} = useTheme();
    const [formData, setFormData] = useState({
        clubname: item.name,
        clubgenre: item.genre,
         photo: null,
         isPublish: item.publish,
         isPublic: item.public,
         clubdescription: item.description,
         meetingDetails: item.details,
         modalVisible: false,
         isLoading: false,
         clubPhoto: item.image
       });
 
     const [errorMsg, setErrorMsg] = useState({
       name: '',
       description: '',
       details: '',
       genre: '',
     });
 
       const {
         clubname,
         clubgenre,
         photo,
         isPublish,
         isPublic,
         clubdescription,
         meetingDetails,
         modalVisible,
         isLoading,
         clubPhoto
       } = formData;
 
     const {name, description, details, genre} = errorMsg;  
 
     const onChange = name => text => setFormData({...formData, [name]: text});

     const onClosePress = () => {
        closeModal();
      };
       
     formatGenre = (item, index, arr) => {
         let gen;
         if (index == arr.length - 1) {
           gen = item;
         } else {
           gen = item + ', ';
         }
         return gen;
       };
 
   getGenre = genreList => {
     setFormData({...formData, clubgenre: genreList});
   };
 
   handleChoosePhoto = () => {
     const options = {
       title: 'Select Club Cover',
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
           const photo = {
             uri: response.uri,
             type: response.type,
             name: response.fileName || response.uri.substr(response.uri.lastIndexOf('/')).slice(1),
         };
         setFormData({...formData, photo});
       }
     });
   };
 
   togglePublishSwitch = () => {
     setFormData({...formData, isPublish: !isPublish});
   };
 
   togglePublicSwitch = () => {
     setFormData({...formData, isPublic: !isPublic});
   };
 
   updateClub = async () => {
    if(clubname === '' || clubname === undefined || clubname === null) {
      setErrorMsg({name: 'Name field cannot be empty'});
      return;
    }
  if(clubgenre.length === 0) {
      setErrorMsg({genre: 'Choose a genre for your club'});
      return;
  }
  if(clubdescription === '' || clubdescription === undefined || clubdescription === null) {
      setErrorMsg({description: 'Add a short description for your club'});
      return;
  } 

    setFormData({...formData, isLoading: true});
     const userUpdateClub = await updateClubAction({
        clubId: item.id,
       clubname,
       clubgenre,
       photo,
       clubPhoto,
       isPublish,
       isPublic,
       clubdescription,
       meetingDetails,
     });
     if (userUpdateClub == 'failed' || Array.isArray(userUpdateClub)) {
        setFormData({...formData, isLoading: false});
       if (Array.isArray(userUpdateClub)) {
         const errMsges = {};
         userUpdateClub.forEach(item => {
           errMsges[item.field] = item.message;
         });
         setErrorMsg(errMsges);
       }
     } else {
        onClosePress();
     }
   };

   deleteClub = async () => {
    await deleteClubAction(item.id);
    onClosePress();
  } 

  const deleteClubBtn = () =>
    Alert.alert(
      'Delete Club',
      'Click OK to proceed?',
      [
        {
          text: 'Cancel',
          onPress: () => false,
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteClub()},
      ],
      {cancelable: false},
    );

    return (
        <SafeAreaView style={styles.container}>
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
        <View style={styles.closeBtn}>
            <Text style={[styles.title, {color: colors.text}]}>
            Edit Club
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
          <View>
            <View style={styles.singleInput}>
              <Text style={[styles.textLabel, {color: colors.text}]}>Club Name</Text>
              <TextInput placeholder="Enter club name" value={clubname}
              placeholderTextColor={colors.placeholder}
              style={[styles.textInput, {color: colors.text, backgroundColor: colors.background, borderColor: colors.border}]}
              onChangeText={onChange('clubname')}
              selectionColor={colors.text}
               />
              {name !== '' && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMessage}>{name}</Text>
                </Animatable.View>
              )}
            </View>
            <View style={styles.singleInput}>
              <Text style={[styles.textLabel, {color: colors.text}]}>Genre <Text style={styles.lilinfo}>(select genre)</Text></Text>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={[styles.modalView, {backgroundColor: colors.background}]}>
                  <ListGenre
                    closeModal={() => {
                      setFormData({...formData, modalVisible: !modalVisible})
                    }}
                    item={getGenre}
                    items={clubgenre}
                  />
                </View>
              </Modal>
              <TouchableHighlight
                underlayColor={colors.dashStats}
                style={[styles.openButton, {backgroundColor: colors.background, borderColor: colors.border}]}
                onPress={() => {
                  setFormData({...formData, modalVisible: true})
                }}>
                <Text style={[styles.textStyle, {color: colors.text}]}>
                    {clubgenre.map(formatGenre)}
                </Text>
              </TouchableHighlight>
              {genre !== '' && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMessage}>{genre}</Text>
                </Animatable.View>
              )}
            </View>
            <View style={styles.singleInput}>
              <Text style={[styles.textLabel, {color: colors.text}]}>Club cover</Text>
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
                  {photo ? (
                    <Image source={{uri: photo.uri}} style={styles.bookCover} />
                  ) : 
                  <>
                  {clubPhoto !== "noimage.jpg" &&
                  <Image source={{ uri: `${imgURL}/club/${clubPhoto}`}} style={styles.bookCover} />}
                  </>
                  }
                </View>
              </View>
            </View>
            <View style={styles.singleInput}>
              <View
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginRight: 50}}>
                  <Text style={[styles.textLabel, {color: colors.text}]}>Show Club</Text>
                  <Switch
                    trackColor={{false: '#767577', true: '#6ad83c'}}
                    thumbColor={isPublish ? '#d1ecf1' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={togglePublishSwitch}
                    value={isPublish}
                    style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
                  />
                </View>
                <View>
                  <Text style={[styles.textLabel, {color: colors.text}]}>Public</Text>
                  <Switch
                    trackColor={{false: '#767577', true: '#6ad83c'}}
                    thumbColor={isPublic ? '#d1ecf1' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={togglePublicSwitch}
                    value={isPublic}
                    style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
                  />
                </View>
              </View>
            </View>

            <View style={styles.singleInput}>
              <Text style={[styles.textLabel, {color: colors.text}]}>Description <Text style={styles.lilinfo}>(not more than 300 characters)</Text></Text>
              <View>
                <TextInput
                  multiline
                  numberOfLines={4}
                  editable
                  placeholder="Enter description"
                  placeholderTextColor={colors.placeholder}
                  maxLength={300}
                  selectionColor={colors.text}
                  style={{
                    backgroundColor: colors.background,
                    borderWidth: 1,
                    borderColor: colors.border,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    fontSize: 14,
                    color: colors.text,
                  }}
                  value={clubdescription}
                onChangeText={onChange('clubdescription')}
                />
              </View>
              {description !== '' && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMessage}>{description}</Text>
                </Animatable.View>
              )}
            </View>
            <View style={styles.singleInput}>
              <Text style={[styles.textLabel, {color: colors.text}]}>Meeting Details <Text style={styles.lilinfo}>(e.g audio/video link, meeting time, e.t.c)</Text></Text>
              <View
                style={{
                  backgroundColor: '#fff',
                }}>
                <TextInput
                  multiline
                  numberOfLines={4}
                  editable
                  placeholder="Enter description"
                  placeholderTextColor={colors.placeholder}
                  maxLength={300}
                  selectionColor={colors.text}
                  style={{
                    backgroundColor: colors.background,
                    borderWidth: 1,
                    borderColor: colors.border,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    fontSize: 14,
                    color: colors.text,
                  }}
                  value={meetingDetails}
                onChangeText={onChange('meetingDetails')}
                />
              </View>
              {details !== '' && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMessage}>{details}</Text>
                </Animatable.View>
              )}
            </View>
            <View style={styles.singleInput}>
              <TouchableOpacity style={styles.signIn} onPress={updateClub}>
                <Text style={[styles.textSign, {color: colors.text}]}>Submit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.orText}>OR</Text>
            <View style={styles.singleInput}>
                <TouchableOpacity style={styles.delete} activeOpacity={0.6} onPress={deleteClubBtn}>
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
    {updateClubAction, deleteClubAction},
  )(EditClub);

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
        padding: 15,
      },
      textLabel: {
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
        marginBottom: 5,
      },
      textInput: {
        fontFamily: 'Nunito-Regular',
        fontSize: 14,
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 10,
      },
      textArea: {
        fontFamily: 'Nunito-Regular',
        fontSize: 14,
        color: '#333',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      openButton: {
        paddingVertical: 10,
        borderWidth: 1,
        minHeight: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      textStyle: {
        fontFamily: 'Nunito-Regular',
        fontSize: 14,
        paddingHorizontal: 10,
      },
      uploadImage: {
        width: '40%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#e91e63',
        borderWidth: 1,
        //marginTop: 15,
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
      pickerIosmodalView: {
        flex: 1,
        marginVertical: 60,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        shadowColor: '#fff7fb',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
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
      lilinfo: {
        fontSize: 11,
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
