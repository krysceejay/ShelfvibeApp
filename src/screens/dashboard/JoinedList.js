import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import Config from 'react-native-config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getUserJoinedClubs, leaveClubAction} from '../../actions/clubActions';
import Skeleton from '../../components/Skeleton';
import {AuthContext} from '../../utils/context';

const numColumns = 2;
const imgURL = Config.IMAGE_URL;
const {width} = Dimensions.get('window');

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
        <View style={styles.itemContain}>
        <View style={styles.bookCoverContain}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details', {
                item: item.club
              });
            }}
            activeOpacity={0.9}>
          
              <Image
                source={{
                  uri: `${imgURL}/club/${item.club.image}`,
                }}
                style={styles.bookCover}
              />
          </TouchableOpacity>
        </View>
        
        <View style={styles.bookDetails}>
          <View style={styles.nameAndEdit}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.bookTitle}>
            {item.club.name}
            </Text>
            {user !== null && user.id !== item.club.user.id && <TouchableOpacity
            style={{
              justifyContent: 'flex-end'
            }}
            onPress={() => leaveClubBtn(item.club.id)}
            activeOpacity={0.9}>
              <Ionicons name="md-remove-circle-outline" size={22} color="#444444" />
          </TouchableOpacity> }
          </View>
            <Text style={styles.members} numberOfLines={1} ellipsizeMode="tail">
             {item.club.members.length} {item.club.members.length > 1 ? 'members' : 'member'}
            </Text>
        </View>
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
        contentContainerStyle={{paddingBottom: 50, paddingTop: 12}}
        ListEmptyComponent={() => (
          <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center', height: 600}}>
          <Text style={styles.emptyText}>You have not joined any club yet.</Text>
          </View>
      )}
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
    marginBottom: 12,
    width: width * 0.5,
  },
  itemContain: {
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#f5f5f5',
    overflow: 'hidden',
    //backgroundColor: 'red',
  },
  bookCoverContain: {
    width: '100%',
    height: 120
  },
  bookCover: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  bookDetails: {
    paddingTop: 6,
    paddingBottom: 12,
    paddingHorizontal: 8,
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
    fontSize: 14,
    maxWidth: '90%'
    //textAlign: 'center',
  },
  members: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
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
    emptyText: {
      fontFamily: 'Nunito-Regular',
      fontSize: 25,
      paddingHorizontal: 12,
      marginTop: 15,
      textAlign: 'center',
      color: '#bbb'
    },
});


