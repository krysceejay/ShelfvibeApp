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
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
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

  handleChoosePhoto = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
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
    const {modalVisible, photo, show, date, mode} = this.state;
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
                <TouchableOpacity
                  style={styles.uploadImage}
                  onPress={this.handleChoosePhoto}>
                  <Text style={styles.textStyle}>Upload</Text>
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
              <Text style={styles.textLabel}>Publish</Text>
              <TextInput
                placeholder="Your first name..."
                style={styles.textInput}
              />
            </View>
            <View style={styles.singleInput}>
              <Text style={styles.textLabel}>Join Status</Text>
              <TextInput
                placeholder="Your first name..."
                style={styles.textInput}
              />
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
                    fontSize: 16,
                    color: '#333',
                  }}
                />
              </View>
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
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
    marginBottom: 5,
  },
  textInput: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    height: 50,
    paddingHorizontal: 10,
  },
  textArea: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
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
    padding: 10,
    //elevation: 2,
    //height: 80,
    minHeight: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textStyle: {
    //textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    fontSize: 18,
    color: '#333',
    paddingHorizontal: 10,
  },
  uploadImage: {
    width: '40%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#f53ba3',
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
});
