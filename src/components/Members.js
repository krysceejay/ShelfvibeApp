import React from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';
import { SwipeListView } from 'react-native-swipe-list-view';

const proURL = Config.PROFILE_URL;

const dataList = [
    {key: "1"},
    {key: "2"},
    {key: "3"},
    {key: "4"},
    {key: "5"},
  ];

const Members = ({closeModal}) => {
  const onClosePress = () => {
    closeModal();
  };

  const deActivateMember =  (id) => {
    //console.log(id);
    return;
  };

  const deActivate = (id) =>
    Alert.alert(
  'Deactivate',
  'Are you sure you want to deactivate this member?',
  [
    {
      text: 'Cancel',
      onPress: () => false,
      style: 'cancel',
    },
    {text: 'OK', onPress: () => deActivateMember(id)},
  ],
  {cancelable: false},
);

const removeMember =  (id) => {
  //console.log(id);
  return;
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
    <View style={styles.userInfoSection}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <Image
          source={{
            uri: `${proURL + item.user.propix}`,
          }}
          style={styles.avatar}
          size={50}
        /> */}
        <Image
            style={styles.avatar}
            source={require('../assets/img/avatar.jpg')}
            size={50}
          />
        <View style={{marginLeft: 15}}>
      <Text style={styles.username}>kryso{data.item.key}</Text>
          <Text style={[styles.caption, {color: '#155724'}]}>active</Text>
            {/* <Text style={[styles.caption, {color: '#721c24'}]}>not active</Text> */}
        </View>
      </View>
      {/* {props.username === item.user.username && <Text>Admin</Text>} */}
    </View>
    )
  }

  const renderItem = (data, rowMap) => (
    <VisibleItem data={data}/>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.closeBtn}>
        <Text style={styles.title}>
          Members (11)
        </Text>
        <TouchableOpacity onPress={onClosePress}
        style={{
          
          zIndex: 2,
          backgroundColor: '#fff',
          borderRadius: 17,
          width: 34,
          height: 34,
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
          paddingHorizontal: 20,
          marginBottom: 10,
        }}>
        
        {/* <FlatList
          data={dataList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.reviewText}>No member yet</Text>
          )}
        /> */}
        <SwipeListView
            data={dataList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            renderHiddenItem={(data, rowMap) => (
                <View style={{backgroundColor: '#f0f0f0', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginVertical: 10, height: 60}}>
                  <TouchableOpacity
                    style={{
                      zIndex: 2,
                      width: 34,
                      height: 34,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 10,
                      
                    }}
                    onPress={() => {deActivate(1)}}>
                    <Icon name="toggle-off" size={22} color="#444444" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      zIndex: 2,
                      width: 34,
                      height: 34,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 10,
                      
                    }}
                    onPress={() => {remove(1)}}>
                    <Ionicons name="md-remove-circle-outline" size={22} color="#444444" />
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
        />
      </View>
    </SafeAreaView>
  );
};

export default Members;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito-BoldItalic',
    //alignSelf: 'center',
    //marginBottom: 16,
  },
  userInfoSection: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
    height: 60,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
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
  deleteBox: {

  }
});
