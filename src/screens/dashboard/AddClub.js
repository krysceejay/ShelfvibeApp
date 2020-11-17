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
  Platform,
  Button,
  SafeAreaView,
  Switch,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import ListGenre from '../../components/ListGenre';
import {createClub} from '../../actions/clubActions';

const AddClub = ({createClub, navigation}) => {
    const [formData, setFormData] = useState({
        name: '',
        genre: [],
        photo: null,
        isPublish: false,
        isPublic: true,
        description: '',
        modalVisible: false
      });

      const {
        name,
        genre,
        photo,
        isPublish,
        isPublic,
        description,
        modalVisible
      } = formData;

      const onChange = name => text => setFormData({...formData, [name]: text});

    // formatGenre = (item, index, arr) => {
    //     let gen;
    //     if (index == arr.length - 1) {
    //       gen = item.title;
    //     } else {
    //       gen = item.title + ', ';
    //     }
    //     return gen;
    //   };
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
    setFormData({...formData, genre: genreList});
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
            path: response.uri,
            content_type: response.type,
            filename:
            response.fileName ||
            response.uri.substr(response.uri.lastIndexOf('/' + 1)),
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
        name,
        genre,
        photo,
        isPublish,
        isPublic,
        description,
    });
    if (userCreateClub == 'failed' || Array.isArray(userCreateClub)) {
      console.log('failed');
    } else {
        console.log('success');
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
              <TextInput placeholder="Enter club name" style={styles.textInput} value={name}
              onChangeText={onChange('name')} />
            </View>
            <View style={styles.singleInput}>
              <Text style={styles.textLabel}>Genre (select genre)</Text>
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
                    items={genre}
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
                    {genre.map(formatGenre)}
                </Text>
              </TouchableHighlight>
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
                    <Image source={{uri: photo.path}} style={styles.bookCover} />
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
              <Text style={styles.textLabel}>Description</Text>
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
                  value={description}
                onChangeText={onChange('description')}
                />
              </View>
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
    {createClub},
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
});
