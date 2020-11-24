import React, {useState} from 'react';
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
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import * as Animatable from 'react-native-animatable';
import ListGenre from '../../components/ListGenre';
import {createClub, createMemberAction} from '../../actions/clubActions';

const AddClub = ({createClub, createMemberAction, navigation}) => {
    const [formData, setFormData] = useState({
       clubname: '',
       clubgenre: [],
        photo: null,
        isPublish: false,
        isPublic: true,
        clubdescription: '',
        modalVisible: false
      });

    const [errorMsg, setErrorMsg] = useState({
      name: '',
      description: '',
      genre: '',
    });

      const {
        clubname,
        clubgenre,
        photo,
        isPublish,
        isPublic,
        clubdescription,
        modalVisible
      } = formData;

    const {name, description, genre} = errorMsg;  

    const onChange = name => text => setFormData({...formData, [name]: text});
      
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
            name: response.uri.substr(response.uri.lastIndexOf('/')).slice(1),
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

  createClubAction = async () => {
    const userCreateClub = await createClub({
      clubname,
      clubgenre,
      photo,
      isPublish,
      isPublic,
      clubdescription,
    });
    if (userCreateClub == 'failed' || Array.isArray(userCreateClub)) {
      if (Array.isArray(userCreateClub)) {
        const errMsges = {};
        userCreateClub.forEach(item => {
          errMsges[item.field] = item.message;
        });
        setErrorMsg(errMsges);
      }
    } else {
      await createMemberAction({
        clubId: userCreateClub,
        status: true
      });
      navigation.navigate('ManageShelf');
    }
  };

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={true}
          extraHeight={10}>
          <View>
            <View style={styles.singleInput}>
              <Text style={styles.textLabel}>Club Name</Text>
              <TextInput placeholder="Enter club name" style={styles.textInput} value={clubname}
              onChangeText={onChange('clubname')} />
              {name !== '' && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMessage}>{name}</Text>
                </Animatable.View>
              )}
            </View>
            <View style={styles.singleInput}>
              <Text style={styles.textLabel}>Genre <Text style={styles.lilinfo}>(select genre)</Text></Text>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.modalView}>
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
                underlayColor="#fff7fb"
                style={styles.openButton}
                onPress={() => {
                  setFormData({...formData, modalVisible: true})
                }}>
                <Text style={styles.textStyle}>
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
              <Text style={styles.textLabel}>Club cover</Text>
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
                  {photo ? (
                    <Image source={{uri: photo.uri}} style={styles.bookCover} />
                  ) : null}
                </View>
              </View>
            </View>
            <View style={styles.singleInput}>
              <View
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginRight: 50}}>
                  <Text style={styles.textLabel}>Publish</Text>
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
                  <Text style={styles.textLabel}>Public</Text>
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
              <Text style={styles.textLabel}>Description <Text style={styles.lilinfo}>(not more than 300 characters)</Text></Text>
              <View
                style={{
                  backgroundColor: '#fff',
                }}>
                <TextInput
                  multiline
                  numberOfLines={4}
                  editable
                  placeholder="Enter description"
                  maxLength={300}
                  style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    fontSize: 14,
                    color: '#333',
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
              <TouchableOpacity style={styles.signIn} onPress={createClubAction}>
                <Text style={styles.textSign}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  
}

export default connect(
    null,
    {createClub, createMemberAction},
  )(AddClub);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'red',
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
    color: '#333',
    backgroundColor: '#fff',
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
    //marginVertical: 20,
    backgroundColor: '#fff',
    //borderRadius: 20,
    //padding: 35,
    //alignItems: 'center',
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
    backgroundColor: '#fff',
    //borderRadius: 20,
    paddingVertical: 10,
    //elevation: 2,
    //height: 80,
    minHeight: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textStyle: {
    //textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#333',
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
  }
});
