import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal} from 'react-native';
import { useTheme } from '@react-navigation/native';
import moment from "moment";
import Config from 'react-native-config';
import {userNotificationAction, userSeenNoteAction} from '../actions/notificationActions';
import Empty from '../components/Empty';
import Loader from '../components/Loader';
import Profile from '../components/Profile';
import {stringToHslColor} from '../utils/theme';

const proURL = Config.IMAGE_URL;

const Notifications = ({userNotificationAction, userSeenNoteAction, notifications, navigation}) => {
  const {colors} = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = navigation.addListener('focus', async () => {
      await userSeenNoteAction();
      const getNotify = await userNotificationAction();
      if (getNotify !== 'failed') {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [navigation]);

  handleOnSelectItem = item => {
    setSelectedItem(item);
  };

  handleOnCloseEditModal = () => {
    setSelectedItem(null);
  };

  const Message = ({data}) => {
    const {type, senderUser, club} = data;
    let msg;
    switch (type) {
      case 'JOIN_CLUB':
          msg = <View style={styles.message}>
              <TouchableOpacity style={{marginHorizontal: 3}} onPress={() => {
                handleOnSelectItem(senderUser);
              }}>
                <Text style={{fontFamily: 'Nunito-Bold', color: colors.text}}>{senderUser.username}</Text> 
                </TouchableOpacity>
                <Text style={{color: colors.text}}>has joined your club</Text>
                <TouchableOpacity style={{marginHorizontal: 3}}
                onPress={() => {
                  navigation.navigate('Details', {
                    clubId: club.id
                  });
                }}>
                <Text style={{fontFamily: 'Nunito-Bold', color: colors.text}}>{club.name}</Text>
                </TouchableOpacity>
              </View>
        break;

      case 'LIKE_CLUB':
          msg = <View style={styles.message}>
                  <TouchableOpacity style={{marginHorizontal: 3}} onPress={() => {
                handleOnSelectItem(senderUser);
              }}>
                   <Text style={{fontFamily: 'Nunito-Bold', color: colors.text}}>{senderUser.username}</Text> 
                  </TouchableOpacity>
                  <Text style={{color: colors.text}}>has liked your club</Text>
                  <TouchableOpacity style={{marginHorizontal: 4}}
                  onPress={() => {
                    navigation.navigate('Details', {
                      clubId: club.id
                    });
                  }}>
                  <Text style={{fontFamily: 'Nunito-Bold', color: colors.text}}>{club.name}</Text>
                </TouchableOpacity>
                </View>
        break;

      case 'ADD_REVIEW':
          msg = <View style={styles.message}>
                  <TouchableOpacity style={{marginHorizontal: 3}} onPress={() => {
                handleOnSelectItem(senderUser);
              }}>
                   <Text style={{fontFamily: 'Nunito-Bold', color: colors.text}}>{senderUser.username}</Text> 
                  </TouchableOpacity>
                  <Text style={{color: colors.text}}>has added a review to your club</Text>
                  <TouchableOpacity style={{marginHorizontal: 4}}
                  onPress={() => {
                    navigation.navigate('Details', {
                      clubId: club.id
                    });
                  }}>
                  <Text style={{fontFamily: 'Nunito-Bold', color: colors.text}}>{club.name}</Text>
                </TouchableOpacity>
                </View>
        break;
    
      default:
        break;
    }
    return msg;
  }

  const renderItem = ({item}) => {
    return ( <View style={[styles.userInfoSection, {backgroundColor: colors.card}]}>
          {item.senderUser.propix !== "noimage.png" ?
            <Image
              style={styles.avatar}
              source={{
                uri: `${proURL}/profiles/${item.senderUser.propix}`,
              }}
            /> : <View style={[styles.clubMembersSingle, {backgroundColor: stringToHslColor(item.senderUser.username)}]}>
            <Text style={styles.initial}>{item.senderUser.username.charAt(0)}</Text>
           </View>}

            <View style={{paddingLeft: 10, maxWidth: '90%'}}>
                <Message data={item} />
              <Text style={[styles.caption, {color: colors.text}]}> {moment(item.insertedAt).startOf('second').fromNow()}</Text>
            </View>
      </View>
      )
    };

  return (
    <View style={styles.center}>
      {isLoading ? <Loader 
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}/> :
      <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 50, paddingTop: 12}}
          ListEmptyComponent={() => (
            <View style={{
              justifyContent: 'center', 
              alignItems: 'center',
              height: 500
              }}>
              <Empty />
              <Text style={[styles.textBody, {color: colors.text}]}>No notification yet</Text>
            </View>
          )}
        /> 
        }
       <Modal
        animationType="fade"
        transparent={true}
        visible={selectedItem ? true : false}>
        <View style={styles.memberModalView}>
          <Profile
            closeModal={handleOnCloseEditModal}
            user={selectedItem}
          />
        </View>
      </Modal> 
    </View>
  );
};

const mapStateToProps = state => ({
  notifications: state.notify.notifications
});

export default connect(
  mapStateToProps,
  {userNotificationAction, userSeenNoteAction},
)(Notifications);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    //backgroundColor: '#eee'
  },
  userInfoSection: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 10,
    //width: '100%',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  message: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    // fontSize: 14,
    marginBottom: 3,
    // //fontWeight: 'bold',
    // fontFamily: 'Nunito-Regular',
    //backgroundColor: 'red'
  },
  caption: {
    fontSize: 13,
    fontFamily: 'Nunito-Light',
  },
  textBody: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    marginVertical: 5,
  },
  clubMembersSingle:{
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: '#f3fbfd',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
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
