import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import Config from 'react-native-config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import {getUserJoinedClubs, leaveClubAction} from '../../actions/clubActions';
import {stringToHslColor} from '../../utils/theme';
import Skeleton from '../../components/Skeleton';
import {AuthContext} from '../../utils/context';

const numColumns = 1;
const imgURL = Config.IMAGE_URL;

const JoinedList = ({getUserJoinedClubs, leaveClubAction, joinedClub, navigation}) => {

  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = navigation.addListener('focus', async () => {
      const getJoined = await getUserJoinedClubs();
      if (getJoined !== 'failed') {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [navigation]);

  leaveClub = async id => {
    await leaveClubAction(id);
  } 

  const leaveClubBtn = clubId =>
    Alert.alert(
      'Leave Club',
      'Click OK to proceed?',
      [
        {
          text: 'Cancel',
          onPress: () => false,
          style: 'cancel',
        },
        {text: 'OK', onPress: () => leaveClub(clubId)},
      ],
      {cancelable: false},
    );

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        
        <View style={styles.bookCoverContain}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details', {
                item: item.club
              });
            }}
            activeOpacity={0.9}>
          
          {item.club.image !== "noimage.jpg" ? <Image
                source={{
                  uri: `${imgURL}/club/${item.club.image}`,
                }}
                style={styles.bookCover}
              /> : <View style={[styles.clubNoImage, {backgroundColor: stringToHslColor(item.club.name)}]}>
              <Text style={styles.initial}>{item.club.name}</Text>
             </View> }
          </TouchableOpacity>
          
        </View>
        
        <View style={styles.bookDetails}>
          <View style={styles.nameAndEdit}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bookTitle}>
            {item.club.name}
            </Text>
            {user !== null && user.id !== item.club.user.id && <TouchableOpacity
            style={{
              zIndex: 2,
              width: 34,
              height: 34,
            }}
            onPress={() => leaveClubBtn(item.club.id)}
            activeOpacity={0.9}>
              <Ionicons name="md-remove-circle-outline" size={25} color="#444444" />
          </TouchableOpacity> }
          </View>
          <View style={styles.afterName}>
              <Text style={styles.members} numberOfLines={1} ellipsizeMode="tail">
              {item.club.members.length} members
              </Text>
              <Text style={styles.clubDate} numberOfLines={1} ellipsizeMode="tail">
                Created on {moment(item.club.insertedAt).format("Do MMM YYYY")}
              </Text>
            </View>
            <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
              {item.club.description}
            </Text>
        </View>
      </View>
      
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Skeleton /> :
      <FlatList
        data={joinedClub}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 40}}
      />
      }
    </View>
  );
};

const mapStateToProps = state => ({
  joinedClub: state.club.joinedClub,
});

export default connect(
  mapStateToProps,
  {getUserJoinedClubs, leaveClubAction},
)(JoinedList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingVertical: 15,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    marginTop: 12,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    //height: width / 1.4,
    textAlign: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#f5f5f5',
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
    clubNoImage:{
      height: '100%',
    width: '100%',
    resizeMode: 'cover',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    initial: {
      fontFamily: 'Nunito-SemiBold',
      fontSize: 19,
      color: '#fff',
      textTransform: 'uppercase'
    },
});


