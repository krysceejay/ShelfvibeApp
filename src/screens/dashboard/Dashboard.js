import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import {styles} from '../../assets/styles';

const WIDTH = Dimensions.get('window').width;

export default class Dashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome Chris</Text>

        <View style={styles.rowView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ManageShelf');
            }}
            style={styles.manageShelf}>
            <FontAwesome name="book" size={35} color="#fff" />
            <Text style={styles.text}>Manage Shelf</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('JoinedList');
            }}
            style={styles.joinedList}>
            <FontAwesome name="handshake-o" size={35} color="#fff" />
            <Text style={styles.text}>Joined List</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowView}>
          <View style={styles.addShelf}>
            <FontAwesome name="plus-square-o" size={35} color="#fff" />
            <Text style={styles.text}>Add To Shelf</Text>
          </View>
          <View style={styles.profle}>
            <FontAwesome name="id-card-o" size={35} color="#fff" />
            <Text style={styles.text}>Profile</Text>
          </View>
        </View>
        <View style={styles.rowView}>
          <View style={styles.uploadPix}>
            <FontAwesome name="upload" size={35} color="#fff" />
            <Text style={styles.text}>Upload Picture</Text>
          </View>
          <View style={styles.contact}>
            <FontAwesome name="user-circle-o" size={35} color="#fff" />
            <Text style={styles.text}>Contact Admin</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  welcomeText: {
    fontSize: 25,
    fontFamily: 'Nunito-Regular',
    color: '#333',
    textAlign: 'center',
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
  },
  manageShelf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#6ad83c',
    margin: 20,
    borderRadius: 15,
  },
  joinedList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#00bcae',
    margin: 20,
    borderRadius: 15,
  },
  addShelf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#27c2ff',
    margin: 20,
    borderRadius: 15,
  },
  profle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffbb43',
    margin: 20,
    borderRadius: 15,
  },
  uploadPix: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fe586c',
    margin: 20,
    borderRadius: 15,
  },
  contact: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#8150e4',
    margin: 20,
    borderRadius: 15,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#333',
  },
});
