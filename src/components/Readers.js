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

const proURL = Config.PROFILE_URL;

const Readers = props => {
  onClosePress = () => {
    props.closeModal();
  };

  renderItem = ({item}) => (
    <View style={styles.userInfoSection}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{
            uri: `${proURL + item.user.propix}`,
          }}
          style={styles.avatar}
          size={50}
        />
        <View style={{marginLeft: 15}}>
          <Text style={styles.username}>{item.user.username}</Text>
          {item.status ? (
            <Text style={[styles.caption, {color: '#155724'}]}>active</Text>
          ) : (
            <Text style={[styles.caption, {color: '#721c24'}]}>not active</Text>
          )}
        </View>
      </View>
      {props.username === item.user.username && <Text>Admin</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.closeBtn}>
        <TouchableOpacity onPress={onClosePress}>
          <Ionicons
            name="md-close"
            size={30}
            style={{
              paddingRight: 20,
              color: '#e91e63',
              fontFamily: 'Nunito-BoldItalic',
            }}
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
        <Text style={styles.title}>
          Club Members ({props.selectedItem.length})
        </Text>
        <FlatList
          data={props.selectedItem}
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

export default Readers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito-BoldItalic',
    //alignSelf: 'center',
    marginBottom: 16,
  },
  userInfoSection: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    //backgroundColor: 'red',
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
});
