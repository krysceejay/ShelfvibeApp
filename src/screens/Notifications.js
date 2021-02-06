import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions} from 'react-native';
import moment from "moment";
import Config from 'react-native-config';
import {userNotificationAction, userSeenNoteAction} from '../actions/notificationActions';
import Empty from '../components/Empty';
import EmptyIcon from '../components/EmptyIcon';
import {stringToHslColor} from '../utils/theme';

const proURL = Config.IMAGE_URL;

const { width, height } = Dimensions.get('screen');

const Notifications = ({userNotificationAction, userSeenNoteAction, notifications, navigation}) => {

  const [isLoading, setIsLoading] = useState(false);

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

  const Message = ({data}) => {
    const {type, senderUser, club} = data;
    let msg;
    switch (type) {
      case 'JOIN_CLUB':
          msg = <View style={styles.message}>
            <TouchableOpacity style={{marginHorizontal: 3}}>
              <Text style={{fontFamily: 'Nunito-Bold'}}>{senderUser.username}</Text> 
              </TouchableOpacity>
              <Text>has joined your club</Text>
              <TouchableOpacity style={{marginHorizontal: 3}}
              onPress={() => {
                navigation.navigate('Details', {
                  item: club
                });
              }}>
              <Text style={{fontFamily: 'Nunito-Bold'}}>{club.name}</Text>
              </TouchableOpacity>
                 </View>
        break;

      case 'LIKE_CLUB':
          msg = <View style={styles.message}>
                  <TouchableOpacity style={{marginHorizontal: 3}}>
                   <Text style={{fontFamily: 'Nunito-Bold'}}>{senderUser.username}</Text> 
                  </TouchableOpacity>
                  <Text>has liked your club</Text>
                  <TouchableOpacity style={{marginHorizontal: 4}}
                  onPress={() => {
                    navigation.navigate('Details', {
                      item: club
                    });
                  }}>
                  <Text style={{fontFamily: 'Nunito-Bold'}}>{club.name}</Text>
                </TouchableOpacity>
                </View>
        break;
    
      default:
        break;
    }
    return msg;
  }

  const renderItem = ({item}) => {
    return ( <View style={styles.userInfoSection}>
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
              <Text style={styles.caption}> {moment(item.insertedAt).startOf('second').fromNow()}</Text>
            </View>
      </View>
      )
    };

  return (
    <View style={styles.center}>
      <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{
              justifyContent: 'center', 
              alignItems: 'center',
              height: 500
              }}>
              <Empty />
              <Text style={styles.textBody}>No notifications yet</Text>
            </View>
          )}
        /> 
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
    backgroundColor: '#eee'
  },
  userInfoSection: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    backgroundColor: '#fff',
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
  }
});
