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
import moment from "moment";
import {AuthContext} from '../../utils/context';
import {stringToHslColor} from '../../utils/theme';
import EditProfile from '../../components/EditProfile';

const proURL = Config.IMAGE_URL;
const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const user = useContext(AuthContext);

  handleOnCloseModal = () => {
    setModalVisible(false);
  };

    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#eee'}}>
        <View style={styles.container}>
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
            <TouchableOpacity onPress={() => {
              setModalVisible(true);
            }}>
              <View style={styles.iconContainer}>
                <FontAwesome name="pencil" size={20} color="#3a4155" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutHeader}>ABOUT</Text>
            <Text style={styles.aboutBodyText}>
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

        </View>
      </ScrollView>
    );
  
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 90,
    marginBottom: 20,
    padding: 12,
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
