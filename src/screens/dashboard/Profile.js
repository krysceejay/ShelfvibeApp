import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';
import Config from 'react-native-config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';
import moment from "moment";
import {AuthContext} from '../../utils/context';
import {stringToHslColor} from '../../utils/theme';
import EditProfile from '../../components/EditProfile';
import ProImage from '../../components/ProImage';

const proURL = Config.IMAGE_URL;

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editImg, setEditImg] = useState(false);
  const user = useContext(AuthContext);
  const {colors} = useTheme();

  handleOnCloseModal = () => {
    setModalVisible(false);
  };

  handleCloseEditPix = () => {
    setEditImg(false);
  };

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {backgroundColor: colors.profileCard}]}>
          <View style={[styles.avatarContainer, {borderColor: colors.profileCard}]}>
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
           <TouchableOpacity
            style={{
              //paddingHorizontal: 12,
              position: 'absolute',
              bottom: 0,
              right: 15,
              zIndex: 2,
              backgroundColor: '#fff',
              borderRadius: 17,
              width: 34,
              height: 34,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.9}
            onPress={() => {
              setEditImg(true)
            }}>
            <MaterialCommunityIcons name="account-edit" size={25} color="#444444" />
          </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View>
              <Text style={[styles.fullName, {color: colors.text}]}>{`${user.firstName} ${user.lastName}`}</Text>
              <Text style={[styles.userName, {color: colors.text}]}>{user.username}</Text>
              <Text style={[styles.userName, {color: colors.text}]}>Member Since: {moment(user.insertedAt).format("Do MMM YYYY")}</Text>
            </View>
            <TouchableOpacity onPress={() => {
              setModalVisible(true);
            }}>
              <View style={styles.iconContainer}>
                <FontAwesome name="pencil" size={20} color={colors.icon} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.aboutContainer}>
            <Text style={[styles.aboutHeader, {color: colors.text}]}>ABOUT</Text>
            <Text style={[styles.aboutBodyText, {color: colors.text}]}>
              {user.about}
            </Text>
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.memberModalView}>
              <EditProfile
                closeModal={handleOnCloseModal}
                user={user}
              />
            </View>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={editImg}>
            <View style={styles.memberModalView}>
              <ProImage
                closeModal={handleCloseEditPix}
                userimg={user.propix}
              />
            </View>
          </Modal>

        </View>
      </ScrollView>
    );
  
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginTop: 90,
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
    alignSelf: 'center',
    marginTop: -90,
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
