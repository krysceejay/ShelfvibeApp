import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Profile extends Component {
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#eee'}}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={require('../../assets/img/avatar.jpg')}
              size={50}
            />
          </View>

          <View style={styles.row}>
            <View>
              <Text style={styles.fullName}>Diadem Royal</Text>
              <Text style={styles.userName}>@krysceejay</Text>
              <Text style={styles.userName}>Member Since: 2019-06-12</Text>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.iconContainer}>
                <FontAwesome name="pencil" size={20} color="#3a4155" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutHeader}>ABOUT</Text>
            <Text style={styles.aboutBodyText}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //marginHorizontal: 12,
    marginTop: 90,
    marginBottom: 20,
    padding: 12,
    //borderRadius: 15,
    //minHeight: 600,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  fullName: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Nunito-Light',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: '#00a2cc',
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  avatarContainer: {
    height: 160,
    width: 160,
    //backgroundColor: 'red',
    // position: 'absolute',
    // top: -50,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // justifyContent: 'center',
    alignSelf: 'center',
    marginTop: -90,
    borderColor: '#fff',
    borderWidth: 15,
    borderRadius: 80,
  },
  avatar: {
    height: '100%',
    width: '100%',
    borderRadius: 80,
    resizeMode: 'contain',
  },
  aboutContainer: {
    marginTop: 15,
  },
  aboutHeader: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    letterSpacing: 5,
    color: '#00a2cc',
    marginVertical: 5,
  },
  aboutBodyText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    lineHeight: 24,
  },
});
