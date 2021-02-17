import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Modal,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import Config from 'react-native-config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StarGroup from '../../components/StarGroup';
import ReadingList from '../../components/ReadingList';
import Members from '../../components/Members';
import BookPoll from '../../components/BookPoll';
import AdminComp from '../../components/AdminComp';
import {stringToHslColor} from '../../utils/theme';
import {fetchClubMembers, createMemberAction, checkMemberClub, getSingleClub} from '../../actions/clubActions';
import {getFavByUserAndClub} from '../../actions/favActions';
import {fetchClubCurrentPolls} from '../../actions/pollActions';
import {getClubRatingsAction} from '../../actions/rateActions';
import {sendNotificationAction} from '../../actions/notificationActions';
import {AuthContext} from '../../utils/context';
import Loader from '../../components/Loader';

const imgURL = Config.IMAGE_URL;

const Details = ({route, navigation, fetchClubMembers, getSingleClub, club, fetchClubCurrentPolls, currentpoll, getFavByUserAndClub, createMemberAction, checkMemberClub, 
   getClubRatingsAction, sendNotificationAction, members, userFavClub, ratings, isMember}) => {
  const {clubId} = route.params;
  const user = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [pollModal, setPollModal] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   getClubSingle(clubId);
  //   getClubRatings(clubId);
  //   getClubMembers(clubId);
  //   getClubCurrentPoll(clubId);
  //   checkFav(clubId);
  //   checkMember(clubId);
  // }, [navigation, clubId]);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = navigation.addListener('focus', async () => {
      const singleClub = await getSingleClub(clubId);
      await getClubRatingsAction(clubId);
      await fetchClubMembers(clubId);
      await fetchClubCurrentPolls(clubId);
      await getFavByUserAndClub(clubId);
      checkMember(clubId);

      if (singleClub !== 'failed') {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, [navigation, clubId]);

  // useEffect(() => {
  //   const unsubscribe = async () => {
  //     getClubSingle(clubId);
  //     getClubRatings(clubId);
  //     getClubMembers(clubId);
  //     getClubCurrentPoll(clubId);
  //     checkFav(clubId);
  //     checkMember(clubId);
  //   };
  //   return unsubscribe;
  // }, [navigation, clubId]);

  getClubRatings = async clubid => {
    await getClubRatingsAction(clubid);
  };

  getClubSingle = async clubid => {
    await getSingleClub(clubid);
  };

  getClubCurrentPoll = async clubid => {
    await fetchClubCurrentPolls(clubid);
  };

  getClubMembers = async clubid => {
    await fetchClubMembers(clubid);
  };

  checkFav = async clubid => {
    await getFavByUserAndClub(clubid);
  };

  checkMember = async clubid => {
    if(user !== null) await checkMemberClub(clubid);
  };

  let totalRatings = 0;
  //let currentPoll;

  handleOnCloseModal = () => {
    setModalVisible(false);
  };

  handleOnClosePoll = () => {
    setPollModal(false);
  };

  handleOnCloseAdmin = () => {
    setAdminModal(false);
  };

  formatGenre = (item, index) => {
    return <View key={index} style={styles.singleGenre}>
    <Text style={styles.genreText}>{item}</Text>
  </View>
  };

  showMembers = (item, index) => {
    let left = 30 * index;
    if(item.user.propix !== "noimage.png"){
      return <View key={index} style={[styles.clubMembersSingle, {left}]}>
          <Image
            style={styles.memberAvatar}
            source={{
              uri: `${imgURL}/profiles/${item.user.propix}`,
            }}
          />
      </View>
    }else{
      return <View key={index} style={[styles.clubMembersSingle, {backgroundColor: stringToHslColor(item.user.username), left}]}>
          <Text style={styles.initial}>{item.user.username.charAt(0)}</Text>
         </View>
    }
  };

  sumRatings = item => {
    totalRatings += parseInt(item.rating);
  };
  ratings.forEach(sumRatings);

  calRating = () => {
    let actualRating;
    if (ratings.length == 0) {
      actualRating = '0.0';
    } else {
      actualRating = (totalRatings / ratings.length).toFixed(1);
    }
    return actualRating;
  };

  // if (item.polls.length !== 0) {
  //   currentPoll = item.polls.find(poll => {
  //     return poll.current == true; 
  //   });
  //   if(currentPoll == undefined) currentPoll = {};
  // }else{
  //   currentPoll = {}
  // }

  const isEmpty = (obj) => {
    for(let key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
        }
        return true;
    }

  const data = {ratingActual: calRating(), numberOfRev: ratings.length};

  joinClub = async () => {
    if(user === null){
      Alert.alert('Login', 'Kindly login to join the club.');
      return;
    }
    const userJoinClub = await createMemberAction({
      clubId,
      status: club.public
    });

    if (userJoinClub !== 'failed') {
      await sendNotificationAction({
        clubId,
        receiverUserId: club.user.id,
        type: "JOIN_CLUB"
      })
      if(club.public){
        Alert.alert('Success', 'You have joined this club!!!');
      }else{
        Alert.alert('Success', 'The owner of this private book club has been notified. Kindly wait for approval. Thanks.');
      }
    }
  }

  const joinClubBtn = () =>
      Alert.alert(
        'Join Club',
        'Click OK to proceed?',
        [
          {
            text: 'Cancel',
            onPress: () => false,
            style: 'cancel',
          },
          {text: 'OK', onPress: () => joinClub()},
        ],
        {cancelable: false},
      ); 

  return (
    <SafeAreaView style={styles.container}>
      {isLoading || club === null ? (
        <>
           <TouchableOpacity
            style={{
              //paddingHorizontal: 12,
              position: 'absolute',
              top: 25,
              left: 15,
              zIndex: 2,
              backgroundColor: '#fff',
              borderRadius: 17,
              width: 34,
              height: 34,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.9}
            onPress={navigation.goBack}>
            <Ionicons name="md-arrow-back" size={22} color="#444444" />
          </TouchableOpacity>
        <Loader
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />
        </>
      ) : 
      <>
      {user === null || isMember === false ? <TouchableOpacity onPress={joinClubBtn}
        style={styles.floatingBtn}
        activeOpacity={0.9}>
        <Text style={styles.joinText}>Join</Text>
      </TouchableOpacity> : null}
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#fff'}}>
      <View style={{marginBottom: 20,}}>
        <View style={styles.bookCoverContain}>
          <TouchableOpacity
            style={{
              //paddingHorizontal: 12,
              position: 'absolute',
              top: 25,
              left: 15,
              zIndex: 2,
              backgroundColor: '#fff',
              borderRadius: 17,
              width: 34,
              height: 34,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.9}
            onPress={navigation.goBack}>
            <Ionicons name="md-arrow-back" size={22} color="#444444" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
                setAdminModal(true);
              }}
              style={{
                position: 'absolute',
                top: 25,
                right: 15,
                zIndex: 2,
                backgroundColor: '#fff',
                borderRadius: 17,
                width: 34,
                height: 34,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              activeOpacity={0.9}
              >
                <MaterialCommunityIcons name="dots-vertical" size={25} color="#444444" />
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={adminModal}
                >
                  <TouchableOpacity style={styles.adminModalView} onPress={handleOnCloseAdmin} activeOpacity={1}>
                    <AdminComp
                      closeModal={handleOnCloseAdmin}
                      navigation={navigation}
                      userFav={userFavClub}
                      clubid = {clubId}
                      ownerId={club.user.id}
                    />
                  </TouchableOpacity>
              </Modal>
              <Image
                source={{
                  uri: `${imgURL}/club/${club.image}`,
                }}
                style={styles.bookCover}
              /> 

        </View>
        <View style={styles.clubDetails}>
            <Text style={styles.bookTitle}>{club.name}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 12,}}>
              <View style={styles.starText}>
                <View style={styles.starGroup}>
                  <StarGroup rating={data.ratingActual} />
                  <Text
                    style={styles.starRateText}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {data.ratingActual} of {data.numberOfRev}
                  </Text>
                </View>
                
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Rating');
                }}>
                  <Text style={styles.seeAll}>View</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Rating');
                  }}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.ratingText}>view more</Text>
                  </View>
                </TouchableOpacity> */}
              </View>
              <View style={styles.detailsGroup}>
                  <MaterialCommunityIcons
                    name="cards-club"
                    size={22}
                    color="#373435"
                  />
                  {club.public ? 
                    <View style={styles.detailsTextPublic}>
                      <Text style={styles.justTextPublic}>public</Text>
                    </View> :
                    <View style={styles.detailsTextPrivate}>
                    <Text style={styles.justTextPrivate}>private</Text>
                  </View>
                    }
                </View>
                </View>
          <View style={{marginTop: 5, marginHorizontal: 12}}>
            <Text style={styles.descriptionBody}>{club.description}</Text>
          </View>
          <View style={styles.genre}>
            {club.genre.map(formatGenre)}
          </View>
          <View style={styles.readingListContainer}>
            <View style={styles.listTop}>
              <Text style={styles.listTitle}>Reading List</Text>
              {/* <TouchableWithoutFeedback onPress={() => {
                setAdminModal(true);
              }}
              >
                <MaterialCommunityIcons name="dots-vertical" size={25} color="#444444" />
              </TouchableWithoutFeedback> */}
              
            </View>
              <ReadingList bookLists={club.lists} />
          </View>
          <View style={styles.clubMembersContainer}>
          <Text style={styles.listTitle}>Club Members</Text>
            <View style={styles.membersAndExcess}>
              <View style={styles.clubMembers}>
                {members.slice(0, 5).map(showMembers)}
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                {members.length > 5 && 
                <Text style={styles.extra}>+{members.length - 5}</Text>
                }
                <TouchableWithoutFeedback onPress={() => {
                  setModalVisible(true);
                }}>
                    <Text style={styles.seeAll}>View</Text>
                  </TouchableWithoutFeedback>
              </View>
            </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.memberModalView}>
              <Members
                closeModal={handleOnCloseModal}
                clubid={clubId}
                owner={club.user.id}
              />
            </View>
          </Modal>
          </View>
            
              <View style={styles.bookPollContainer}>
                <Text style={styles.listTitle}>Book Poll</Text>
              </View>
              <View style={styles.bookPoll}>
                {isEmpty(currentpoll) ?
                <Text style={styles.noPoll}>No active poll for this club.</Text> 
                :
                <>
                  <Text style={styles.pollTitle}>{currentpoll.pollName}</Text>
                  <TouchableOpacity style={styles.bookPollBtn} onPress={() => {
                    setPollModal(true);
                  }}>
                    <Text style={styles.pollText}>Vote now</Text>
                  </TouchableOpacity>
                  <Modal
                  animationType="slide"
                  transparent={true}
                  visible={pollModal}>
                    <View style={styles.modalView}>
                      <BookPoll
                        closeModal={handleOnClosePoll}
                        currentPoll={currentpoll}
                        clubId={clubId}
                      />
                    </View>
                </Modal>
                </>
                }
              </View> 
              <View style={styles.bookPollContainer}>
                <Text style={styles.listTitle}>Meeting Details</Text>
              </View>
              <View style={{marginHorizontal: 12}}>
                <Text style={styles.descriptionBody}>
                  {user !== null && isMember === true ? 
                  club.details !== null ? club.details : 'No details at the moment.'
                  : 
                  'Join club to see meeting details.'}
                </Text>
              </View>
              
            
          
          {/* <TouchableOpacity style={styles.join} onPress={() => {}}>
            <Text style={styles.joinText}>Join Club</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
    </>
      }
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  ratings: state.rate.ratings,
  members: state.club.members,
  isMember: state.club.isMember,
  club: state.club.club,
  userFavClub: state.fav.userFavClub,
  currentpoll: state.poll.currentpoll,
});

export default connect(
  mapStateToProps,
  {fetchClubMembers, fetchClubCurrentPolls, getFavByUserAndClub, getClubRatingsAction,
    createMemberAction, checkMemberClub, sendNotificationAction, getSingleClub},
)(Details);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    //marginBottom: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },

  bookCoverContain: {
    //flex: 1,
    width: '100%',
    height: 220,
  },
  bookCover: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  clubDetails: {
    marginTop: 20,
  },
  bookTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    marginHorizontal: 12,
  },

  genre: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginHorizontal: 12,
  },
  singleGenre: {
    backgroundColor: '#f0f1f3',
    padding: 5,
    marginVertical: 5,
    marginLeft: 0,
    marginRight: 10,
    borderRadius: 5,
  },
  genreText: {
    fontFamily: 'Nunito-Italic',
  },
  readingListContainer: {
    marginVertical: 25,
  },
  listTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  listTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    letterSpacing: 2,
  },
  seeAll: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
  },
  membersAndExcess: {
    // flexDirection: 'row', 
    // justifyContent: 'flex-start', 
    // alignItems: 'center', 
    marginTop: 10,
    //backgroundColor: 'red'
  },
  clubMembersContainer: {
    marginHorizontal: 12,
  },
  clubMembers: {
    position: 'relative',
    //backgroundColor: 'green',
    height: 40,
    width: '45%',
  },
  clubMembersSingle:{
    height: 40,
    width: '25%',
    borderRadius: 20,
    position: 'absolute',
    overflow: 'hidden',
    borderColor: '#f3fbfd',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberAvatar: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  extra: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    marginRight: 10,
    marginLeft: 2
  },
  initial: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    color: '#fff',
    textTransform: 'uppercase'
  },
  join: {
    //width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 10,
    backgroundColor: '#242c42',
    marginHorizontal: 12,
    
  },
  joinText: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#fff'
  },
  descriptionBody: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
  },
  iconContainer: {
    borderRadius: 10,
    borderColor: '#00a2cc',
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginVertical: 3,
  },
  ratingText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 11,
    textAlign: 'center',
  },
  starText: {
    flexDirection: 'row',
    marginVertical: 4,
    //width: '75%',
    //backgroundColor: 'red',
  },
  starGroup: {
    marginRight: 10
  },
  starRateText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 13,
  },
  detailsGroupView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    //backgroundColor: 'red',
  },
  detailsGroup: {
    flexDirection: 'row',
    marginVertical: 5,
    //marginRight: 15,
  },
  detailsTextPublic: {
    marginLeft: 5,
    borderRadius: 5,
    backgroundColor: '#d4edda',
    padding: 4,
  },
  justTextPublic: {
    color: '#155724',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
  },
  detailsTextPrivate: {
    marginLeft: 5,
    borderRadius: 5,
    backgroundColor: '#f8d7da',
    padding: 4,
  },
  justTextPrivate: {
    color: '#721c24',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
   justifyContent: 'flex-end',
   alignItems: 'center'
  },
  adminModalView: {
    flex: 1,
    //backgroundColor: 'rgba(0, 0, 0, 0.7)',
    //top: 100
   //justifyContent: 'flex-end',
   alignItems: 'flex-end',
  },
  memberModalView: {
    flex: 1,
    //marginVertical: 20,
    backgroundColor: '#fff',
    //borderRadius: 20,
    //padding: 35,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookPoll: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 12,
    //marginTop: 30,
    marginBottom: 5
  },
  pollTitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15,
    marginRight: 15
  },
  bookPollBtn: {
    backgroundColor: '#00a2cc',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20
  },
  pollText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 25,
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
    noPoll: {
      fontFamily: 'Nunito-Regular',
      fontSize: 15,
    },
    bookPollContainer: {
      marginTop: 20,
      marginBottom: 5,
      marginHorizontal: 12
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