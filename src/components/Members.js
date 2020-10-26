import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const proURL = Config.PROFILE_URL;

const dataList = [
    {key: 1},
    {key: 2},
    {key: 3},
    {key: 4},
    {key: 5},
    {key: 6},
    {key: 7},
    {key: 8},
    {key: 9},
    {key: 10},
    {key: 11},
    {key: 12},
    {key: 13},
    {key: 14},
    {key: 15},
    {key: 16},
    {key: 17},
    {key: 18},
    {key: 19},
    {key: 20},
    {key: 21},
  ];

const Members = props => {
  onClosePress = () => {
    props.closeModal();
  };

  const leftSwipe = () => {
    return(
      <View style={styles.deleteBox}>
        <Text>Delete</Text>
      </View>
    )
  }

  renderItem = ({item}) => (
    <Swipeable renderLeftActions={leftSwipe}>
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
          <Text style={styles.username}>kryso</Text>
          
            <Text style={[styles.caption, {color: '#155724'}]}>active</Text>
          
            {/* <Text style={[styles.caption, {color: '#721c24'}]}>not active</Text> */}
          
        </View>
      </View>
      {/* {props.username === item.user.username && <Text>Admin</Text>} */}
    </View>
    </Swipeable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.closeBtn}>
        <Text style={styles.title}>
          Club Members (11)
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
        
        <FlatList
          data={dataList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.reviewText}>No member yet</Text>
          )}
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
    backgroundColor: '#ccc',
    
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
