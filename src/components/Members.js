import React, {useEffect,useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';
import { SwipeListView } from 'react-native-swipe-list-view';
import {AuthContext} from '../utils/context';
import {stringToHslColor} from '../utils/theme';
import {fetchClubMembers, setMemberStatusAction, removeMemberAction} from '../actions/clubActions';

const proURL = Config.IMAGE_URL;

const Members = ({closeModal, members, owner, clubid, fetchClubMembers, setMemberStatusAction, removeMemberAction}) => {
  const user = useContext(AuthContext);
  const {dark, colors} = useTheme();

  useEffect(() => {
    //setIsLoading(true);
    getClubMembers(clubid);
  }, [clubid]);

  getClubMembers = async clubid => {
    await fetchClubMembers(clubid);
  };

  const onClosePress = () => {
    closeModal();
  };

  const deActivateMember =  async (userid) => {
    if(user !== null && user.id === owner){
      await setMemberStatusAction({
        userid,
        clubid
      })
    }else{
      Alert.alert('Failed', 'Kindly login to proceed.');
      return;
    }
  };

  const activateMember =  async (userid) => {
    if(user !== null && user.id === owner){
      await setMemberStatusAction({
        userid,
        clubid
      });
    }else{
      Alert.alert('Failed', 'You are not allowed to perform this action.');
      return;
    }
  };

  const deActivate = (userid) =>
    Alert.alert(
  'Deactivate',
  'Are you sure you want to deactivate this member?',
  [
    {
      text: 'Cancel',
      onPress: () => false,
      style: 'cancel',
    },
    {text: 'OK', onPress: () => deActivateMember(userid)},
  ],
  {cancelable: false},
);
  const activate = (userid) =>
    Alert.alert(
  'Activate',
  'Are you sure you want to activate this member?',
  [
    {
      text: 'Cancel',
      onPress: () => false,
      style: 'cancel',
    },
    {text: 'OK', onPress: () => activateMember(userid)},
  ],
  {cancelable: false},
);

const removeMember =  async (id) => {
  if(user !== null && user.id === owner){
    await removeMemberAction(id);
  }else{
    Alert.alert('Failed', 'You are not allowed to perform this action.');
    return;
  }
};

const remove = (id) =>
  Alert.alert(
'Remove',
'Are you sure you want to remove this member?',
[
  {
    text: 'Cancel',
    onPress: () => false,
    style: 'cancel',
  },
  {text: 'OK', onPress: () => removeMember(id)},
],
{cancelable: false},
);

  const VisibleItem = ({data}) => {
    return(
    <View style={[
      styles.userInfoSection, 
      {
        backgroundColor: colors.background, 
        borderColor: colors.border,
        }]}>
      <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12}}>
        {data.item.user.propix !== "noimage.png" ? 
          <Image
          style={styles.avatar}
          source={{
            uri: `${proURL}/profiles/${data.item.user.propix}`,
          }}
        /> :
        <View key={data.index} style={[styles.clubMembersSingle, {backgroundColor: stringToHslColor(data.item.user.username)}]}>
          <Text style={styles.initial}>{data.item.user.username.charAt(0)}</Text>
         </View>
        }
        <View style={{paddingHorizontal: 10}}>
      <Text style={[styles.username, {color: colors.text}]} numberOfLines={1}>{data.item.user.username}</Text>
      {data.item.status ?  
        <Text style={[styles.caption, {color: dark ? '#90ee90' : '#155724'}]}>active</Text>
        :
        <Text style={[styles.caption, {color: dark ? '#ff1a1a' : '#721c24'}]}>not active</Text>
        }
        </View>
      </View>
      {owner === data.item.user.id && <Text style={[styles.adminText, {color: colors.text}]}>Admin</Text>}
    </View>
    )
  }

  const renderItem = (data, rowMap) => (
    <VisibleItem data={data}/>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.closeBtn}>
        <Text style={[styles.title, {color: colors.text}]}>
          Members ({members.length})
        </Text>
        <TouchableOpacity onPress={onClosePress}
        style={{
          zIndex: 2,
          backgroundColor: '#fff',
          borderRadius: 15,
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#bbb'
        }}>
          <Ionicons
            name="md-close"
            size={20}
            color="#444444"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          marginBottom: 10,
        }}>
         
        <SwipeListView
            data={members}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            renderHiddenItem={(data, rowMap) => (
                <View style={{backgroundColor: colors.profileCard, flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginVertical: 5, height: 60, paddingHorizontal: 12,}}>
                  <TouchableOpacity
                    style={{
                      width: 34,
                      height: 34,
                      alignItems: 'center',
                      justifyContent: 'center',
                      //marginHorizontal: 10,
                    }}
                    onPress={() => {
                      user !== null && owner !== data.item.user.id && 
                      (data.item.status ? deActivate(data.item.user.id) : activate(data.item.user.id))
                      }
                      }>
                      {
                      user !== null && owner !== data.item.user.id && (data.item.status ? 
                      <Icon name="toggle-on" size={22} color={colors.icon} /> : 
                      <Icon name="toggle-off" size={22} color={colors.icon} />)
                      }
                    
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 34,
                      height: 34,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      user !== null && owner !== data.item.user.id && remove(data.item.id)
                      }}>
                    {user !== null && owner !== data.item.user.id && 
                    <Ionicons name="md-remove-circle-outline" size={22} color={colors.icon} />
                    }
                  </TouchableOpacity>
                    {/* <Text>Left</Text>
                    <Text>Right</Text> */}
                </View>
            )}
            showsVerticalScrollIndicator={false}
            leftOpenValue={75}
            rightOpenValue={-75}
            stopLeftSwipe={50}
            stopRightSwipe={-50}
            disableLeftSwipe={user !== null && user.id === owner ? false : true}
            disableRightSwipe={user !== null && user.id === owner ? false : true}
        />
        
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  members: state.club.members
});

export default connect(
  mapStateToProps,
  {fetchClubMembers, setMemberStatusAction, removeMemberAction},
)(Members);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito-BoldItalic',
    //alignSelf: 'center',
    //marginBottom: 16,
  },
  userInfoSection: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
    borderWidth: 1,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  username: {
    fontSize: 16,
    marginTop: 3,
    marginBottom: 3,
    //fontWeight: 'bold',
    fontFamily: 'Nunito-Bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: 'Nunito-Light',
  },
  reviewText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    lineHeight: 24,
  },
  adminText: {
    paddingHorizontal: 12,
    fontFamily: 'Nunito-SemiBold',
  },
  clubMembersSingle:{
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    color: '#fff',
    textTransform: 'uppercase'
  },
});
