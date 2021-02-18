import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import Config from 'react-native-config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import {stringToHslColor} from '../utils/theme';

const proURL = Config.IMAGE_URL;
const Profile = ({user, closeModal}) => {

    const onClosePress = () => {
        closeModal();
      };

    return (
        <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableOpacity
            style={{
              //paddingHorizontal: 12,
              position: 'absolute',
              top: 25,
              left: 15,
              zIndex: 2,
              backgroundColor: '#fff',
              borderRadius: 17,
              width: 34,
              height: 34,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.9}
            onPress={onClosePress}>
            <Ionicons name="md-arrow-back" size={22} color="#444444" />
          </TouchableOpacity>
        <View style={styles.body}>
          <View style={styles.avatarContainer}>
          {user.propix !== "noimage.png" ?
            <Image
              style={styles.avatar}
              source={{
                uri: `${proURL}/profiles/${user.propix}`,
              }}
              size={50}
            /> : <View style={[styles.clubMembersSingle, {backgroundColor: stringToHslColor(user.username)}]}>
            <Text style={styles.initial}>{user.username.charAt(0)}</Text>
           </View>}
          </View>

          <View style={styles.row}>
            <View>
              <Text style={styles.fullName}>{`${user.firstName} ${user.lastName}`}</Text>
              <Text style={styles.userName}>{user.username}</Text>
              <Text style={styles.userName}>Member Since: {moment(user.insertedAt).format("Do MMM YYYY")}</Text>
            </View>
          </View>
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutHeader}>ABOUT</Text>
            <Text style={styles.aboutBodyText}>
              {user.about}
            </Text>
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    backgroundColor: '#fff',
    },

  body: {
    backgroundColor: '#fafafa',
    marginHorizontal: 12,
    marginTop: 100,
    marginBottom: 20,
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
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
    borderColor: '#fafafa',
    borderWidth: 15,
    borderRadius: 80,
  },
  avatar: {
    height: '100%',
    width: '100%',
    borderRadius: 80,
    resizeMode: 'cover',
  },
  aboutContainer: {
    marginTop: 15,
  },
  aboutHeader: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    letterSpacing: 3,
    color: '#00a2cc',
    marginVertical: 5,
  },
  aboutBodyText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    lineHeight: 24,
  },
  clubMembersSingle:{
    height: '100%',
    width: '100%',
    borderRadius: 80,
    overflow: 'hidden',
    borderColor: '#f3fbfd',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 40,
    color: '#fff',
    textTransform: 'uppercase'
  },
  memberModalView: {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
