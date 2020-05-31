import React, {Component} from 'react';
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
import {Picker} from '@react-native-community/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ListGenre from '../../components/ListGenre';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class AddShelf extends Component {
  state = {
    language: 'java',
    modalVisible: false,
    genre: [],
    photo: null,
    date: new Date(),
    mode: 'date',
    show: false,
    showDate: false,
    isPublish: false,
    isPublic: true,
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  setPickerVisible = visible => {
    this.setState({showDate: visible});
  };

  getGenre = genreList => {
    this.setState({
      genre: genreList,
    });
  };

  togglePublishSwitch = () => {
    return this.setState((prevState, prevProp) => ({
      isPublish: !prevState.isPublish,
    }));
  };
  togglePublicSwitch = () => {
    return this.setState((prevState, prevProp) => ({
      isPublic: !prevState.isPublic,
    }));
  };

  handleChoosePhoto = () => {
    const options = {
      title: 'Select Book Cover',
      // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
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

        this.setState({photo: response});
        //this.setState({ photo: response })
      }
    });
  };

  setDate = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      show: Platform.OS === 'ios' ? true : false,
    });
  };

  show = mode => {
    this.setState({mode, show: true});
  };

  datePicker = () => {
    this.show('date');
  };

  timePicker = () => {
    this.show('time');
  };

  showDatePicker = () => {
    this.setState({showDate: !this.state.showDate, mode: 'date'});
  };

  showTimePicker = () => {
    this.setState({showDate: !this.state.showDate, mode: 'time'});
  };

  checkPlateform = (show, date, mode) => {
    if (Platform.OS === 'ios') {
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showDate}>
            <View style={styles.pickerIosmodalView}>
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={this.setDate}
              />
              <Button
                onPress={() => {
                  this.setPickerVisible(!this.state.showDate);
                }}
                title="Close Modal"
              />
            </View>
          </Modal>
          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>Meeting Date</Text>
            <TouchableOpacity
              style={styles.openButton}
              onPress={this.showDatePicker}>
              <Text style={styles.textStyle}>Show date picker</Text>
            </TouchableOpacity>

            {/* {show && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={this.setDate}
              />
            )} */}
          </View>
          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>Meeting time</Text>

            <TouchableOpacity
              style={styles.openButton}
              onPress={this.showTimePicker}>
              <Text style={styles.textStyle}>Show time picker</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (Platform.OS === 'android') {
      return (
        <View>
          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>Meeting Date</Text>
            <TouchableOpacity
              style={styles.openButton}
              onPress={this.datePicker}>
              <Text style={styles.textStyle}>Show date picker</Text>
            </TouchableOpacity>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={this.setDate}
              />
            )}
          </View>
          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>Meeting time</Text>

            <TouchableOpacity
              style={styles.openButton}
              onPress={this.timePicker}>
              <Text style={styles.textStyle}>Show time picker</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return;
    }
  };

  render() {
    const {
      modalVisible,
      photo,
      show,
      date,
      mode,
      isPublish,
      isPublic,
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={true}
          extraHeight={10}>
          <View>
            <View style={styles.singleInput}>
              <Text style={styles.textLabel}>Title</Text>
              <TextInput placeholder="Enter title" style={styles.textInput} />
            </View>
            <View style={styles.singleInput}>
              <Text style={styles.textLabel}>Author</Text>
              <TextInput placeholder="Enter author" style={styles.textInput} />
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
                      this.setModalVisible(!modalVisible);
                    }}
                    item={this.getGenre}
                    items={this.state.genre}
                  />
                </View>
              </Modal>
              <TouchableHighlight
                underlayColor="#fff7fb"
                style={styles.openButton}
                onPress={() => {
                  this.setModalVisible(true);
                }}>
                <Text style={styles.textStyle}>
                  {this.state.genre.map((item, index) => item.title + ', ')}
                </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.singleInput}>
              <Text style={styles.textLabel}>Book cover</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={this.handleChoosePhoto}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.textStyle}>Upload</Text>
                    <FontAwesome name="upload" size={20} color="#3a4155" />
                  </View>
                </TouchableOpacity>
                <View style={styles.showImage}>
                  {photo ? (
                    <Image source={{uri: photo.uri}} style={styles.bookCover} />
                  ) : null}
                  {/* <Image
                    style={styles.bookCover}
                    source={require('../../assets/img/playbigger.jpg')}
                  /> */}
                </View>
              </View>
            </View>
            {this.checkPlateform(show, date, mode)}
            <View style={styles.singleInput}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View>
                  <Text style={styles.textLabel}>Publish</Text>
                  <Switch
                    trackColor={{false: '#767577', true: '#6ad83c'}}
                    thumbColor={isPublish ? '#d1ecf1' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={this.togglePublishSwitch}
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
                    onValueChange={this.togglePublicSwitch}
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
                  //maxLength={40}
                  style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    fontSize: 14,
                    color: '#333',
                  }}
                />
              </View>
            </View>
            <View style={styles.singleInput}>
              <TouchableOpacity style={styles.signIn}>
                <Text style={styles.textSign}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

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
