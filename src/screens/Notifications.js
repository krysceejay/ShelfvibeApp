import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

const dataList = [
  {key: "1"},
  {key: "2"},
  {key: "3"},
  {key: "4"},
  {key: "5"},
  {key: "6"},
  {key: "7"},
  {key: "8"},
  {key: "9"},
  {key: "10"},
];

const Notifications = () => {

  const renderItem = ({item}) => {
    return ( <TouchableOpacity activeOpacity={0.6} onPress={() => {}} style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Image
              style={styles.avatar}
              source={require('../assets/img/avatar.jpg')}
            />
        <View style={{width: '85%', paddingHorizontal: 10}}>
          <Text style={styles.username}>Kryso has joined your club Designer's 1 Club benm
          Krysomm has joined your club Designer's Club</Text>
          <Text style={styles.caption}>2 min ago</Text>
        </View>
        </View>
      </TouchableOpacity>
      )
    };

  return (
    <View style={styles.center}>
      <FlatList
          data={dataList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.reviewText}>No notifications yet</Text>
          )}
        /> 
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    //marginHorizontal: 12,
    backgroundColor: '#fff'
  },
  userInfoSection: {
    paddingVertical: 5,
    marginVertical: 6,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    width: '100%',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  username: {
    fontSize: 14,
    marginBottom: 3,
    //fontWeight: 'bold',
    fontFamily: 'Nunito-Regular',
  },
  caption: {
    fontSize: 13,
    fontFamily: 'Nunito-Light',
  },
});
