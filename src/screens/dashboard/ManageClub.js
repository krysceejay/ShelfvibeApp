import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  FlatList,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import Config from 'react-native-config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {AuthContext} from '../../utils/context';
import {getUserBooks} from '../../actions/bookActions';
import Skeleton from '../../components/Skeleton';
import Empty from '../../components/Empty';

const {width} = Dimensions.get('window');

const dataList = [
  {key: 1},
  {key: 2},
  {key: 3},
];

const ManageClub = ({getUserBooks, userBooks, navigation}) => {

  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = navigation.addListener('focus', async () => {
      const getUserShelf = await getUserBooks(user.id);
      if (getUserShelf !== 'failed') {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [navigation]);

  const numColumns = 1;
  const imgURL = Config.IMAGE_URL;
  //const imgURL = 'http://127.0.0.1:4000/images/bookcover/'

  _renderItem = ({item, index}) => {
    return (
      
      <View style={styles.item}>
        
        <View style={styles.bookCoverContain}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
            activeOpacity={0.9}>
          
            {/* <Image
                source={{
                  uri: `${imgURL + item.bookcover}`,
                }}
                style={styles.bookCover}
              /> */}
            <Image
              style={styles.bookCover}
              source={require('../../assets/img/showup.jpg')}
            />
          </TouchableOpacity>
          
        </View>
        
        <View style={styles.bookDetails}>
          <View style={styles.nameAndEdit}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bookTitle}>
              Club Name Club Name
            </Text>
            <TouchableOpacity
            style={{
              zIndex: 2,
              width: 34,
              height: 34,
            }}
            activeOpacity={0.9}
            onPress={() => {createTwoButtonAlert(1)}}>
            <FontAwesome name="edit" size={22} color="#444444" />
          </TouchableOpacity>
          </View>
          <View style={styles.afterName}>
              <Text style={styles.members} numberOfLines={1} ellipsizeMode="tail">
                16 members
              </Text>
              <Text style={styles.clubDate} numberOfLines={1} ellipsizeMode="tail">
                Created on 2nd Jan 2020
              </Text>
            </View>
            <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
              Need custom logistic service? We got it covered. From overland,
              air, rail and sea transportation. Fast, safe and accurate
              shipment provided all over the globe. air, rail and sea transportation. Fast safe and accurate
              shipment provided all over the globe
            </Text>
        </View>
      </View>
      
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}
        style={styles.floatingBtn}
        activeOpacity={0.9}>
        <Ionicons
          name="ios-add"
          size={40}
          color="#fff"
        />
      </TouchableOpacity>
      <FlatList
        data={dataList}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 40}}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  userBooks: state.book.userBooks,
});

export default connect(
  mapStateToProps,
  {getUserBooks},
)(ManageClub);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingVertical: 15,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    marginTop: 12,
    //marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    //height: width / 1.4,
    textAlign: 'center',
    //borderRadius: 12,
    overflow: 'hidden',
    //borderBottomWidth: 2,
    //borderColor: '#f5f5f5',
  },
  bookCoverContain: {
    flex: 3,
    width: '100%',
    height: 200
    //backgroundColor: 'green',
  },
  bookCover: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  bookDetails: {
    padding: 18,
    width: '100%',
    backgroundColor: '#fff',
  },
  nameAndEdit: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bookTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 17,
    maxWidth: '90%'
    //textAlign: 'center',
  },
  members: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: '#444444',
  },
  clubDate: {
    fontFamily: 'Nunito-Italic',
    fontSize: 13,
    color: '#444444',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    zIndex: 2,
    backgroundColor: '#00a2cc',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.0,
    elevation: 4,
      },
      afterName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      description: {
        fontFamily: 'Nunito-Regular',
        fontSize: 13,
        marginTop: 5,
      },
});
