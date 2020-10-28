import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Dimensions,
  Modal
} from 'react-native';
import {connect} from 'react-redux';
import Config from 'react-native-config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StarGroup from '../../components/StarGroup';
import Topics from '../../components/Topics';
import HtmlReader from '../../components/HtmlReader';
import ReadingList from '../../components/ReadingList';
import Members from '../../components/Members';
import BookPoll from '../../components/BookPoll';
import AdminComp from '../../components/AdminComp';

const {width} = Dimensions.get('window');

const Details = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pollModal, setPollModal] = useState(false);
  const [adminModal, setAdminModal] = useState(false);

  handleOnCloseModal = () => {
    setModalVisible(false);
  };

  handleOnClosePoll = () => {
    setPollModal(false);
  };

  handleOnCloseAdmin = () => {
    setAdminModal(false);
  };

  const stringToHslColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 50%, 70%)`;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#fff'}}>
      <SafeAreaView style={styles.container}>
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
            onPress={navigation.goBack}>
            <Ionicons name="md-arrow-back" size={22} color="#444444" />
          </TouchableOpacity>

          <Image
            style={styles.bookCover}
            source={require('../../assets/img/showup.jpg')}
          />
        </View>
        <View style={styles.clubDetails}>
          <Text style={styles.bookTitle}>The Designer's Club</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20,}}>
              <View style={styles.starText}>
                <StarGroup rating='3.5' />
                <Text
                  style={styles.starRateText}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  3.5 of 4,000
                  
                </Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.seeAll}>View More</Text>
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
                    <View style={styles.detailsTextPublic}>
                      <Text>public</Text>
                    </View>
                </View>
                </View>
          <View style={{marginTop: 8, marginHorizontal: 20,}}>
            <HtmlReader
              html="Need custom logistic service? We got it covered. From overland,
              air, rail and sea transportation. Fast, safe and accurate
              shipment provided all over the globe. air, rail and sea transportation. Fast, safe and accurate
              shipment provided all over the globe."
              style={styles.descriptionBody}
            />
          </View>
          <View style={styles.genre}>
            <View style={styles.singleGenre}>
              <Text style={styles.genreText}>psychology</Text>
            </View>
            <View style={styles.singleGenre}>
              <Text style={styles.genreText}>design</Text>
            </View>
            <View style={styles.singleGenre}>
              <Text style={styles.genreText}>graphics design</Text>
            </View>
            <View style={styles.singleGenre}>
              <Text style={styles.genreText}>product design</Text>
            </View>
            <View style={styles.singleGenre}>
              <Text style={styles.genreText}>design thinking</Text>
            </View>
            <View style={styles.singleGenre}>
              <Text style={styles.genreText}>ux design</Text>
            </View>
          </View>
          <View style={styles.readingListContainer}>
            <View style={styles.listTop}>
              <Text style={styles.listTitle}>Reading List</Text>
              <TouchableWithoutFeedback onPress={() => {
                setAdminModal(true);
              }}>
                <MaterialCommunityIcons name="dots-vertical" size={25} color="#444444" />
              </TouchableWithoutFeedback>
              <Modal
                animationType="slide"
                transparent={true}
                visible={adminModal}>
                  <View style={styles.modalView}>
                    <AdminComp
                      closeModal={handleOnCloseAdmin}
                    />
                  </View>
              </Modal>
            </View>
            
              <ReadingList />
          </View>
          <View style={styles.clubMembersContainer}>
          <Text style={styles.listTitle}>Club Members</Text>
          <View style={styles.membersAndExcess}>
            <View style={styles.clubMembers}>
              <View style={[styles.clubMembersSingle, {left: 0}]}>
              <Image
            style={styles.memberAvatar}
            source={require('../../assets/img/avatar.jpg')}
          />
                </View>
                <View style={[styles.clubMembersSingle, {backgroundColor: stringToHslColor('john'), left: 30}]}>
                <Text style={styles.initial}>{'john'.charAt(0)}</Text>
                </View>
                <View style={[styles.clubMembersSingle, {backgroundColor: stringToHslColor('femi'), left: 60}]}>
                <Text style={styles.initial}>{'femi'.charAt(0)}</Text>
                </View>
                <View style={[styles.clubMembersSingle, {backgroundColor: stringToHslColor('lizzy'), left: 90}]}>
                <Text style={styles.initial}>{'lizzy'.charAt(0)}</Text>
                </View>
                <View style={[styles.clubMembersSingle, {backgroundColor: stringToHslColor('opeyemi'), left: 120}]}>
                <Text style={styles.initial}>{'opeyemi'.charAt(0)}</Text>
                </View>
            </View>
            <Text style={styles.extra}>+7</Text>
            <TouchableWithoutFeedback onPress={() => {
              setModalVisible(true);
            }}>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableWithoutFeedback>
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.memberModalView}>
              <Members
                closeModal={handleOnCloseModal}
              />
            </View>
          </Modal>
          </View>

          <View style={styles.bookPoll}>
            <Text style={styles.pollTitle}>October book poll</Text>
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
                />
              </View>
          </Modal>
          </View>
          <TouchableOpacity style={styles.join} onPress={() => {}}>
            <Text style={styles.joinText}>Join Club</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default connect(
  null,
  null,
)(Details);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 20,
    //backgroundColor: 'blue',
    overflow: 'hidden',
  },

  bookCoverContain: {
    //flex: 1,
    width: '100%',
    height: 250,
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
    marginHorizontal: 20,
  },

  genre: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    marginHorizontal: 20,
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
    marginHorizontal: 20,
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
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    marginTop: 10,
    //backgroundColor: 'red'
  },
  clubMembersContainer: {
    marginHorizontal: 20,
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
    marginHorizontal: 20,
    
  },
  joinText: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#fff'
  },
  descriptionBody: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    lineHeight: 23,
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
    //flexDirection: 'column',
    marginVertical: 4,
    width: '75%',
    //backgroundColor: 'red',
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
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    marginLeft: 5,
    borderRadius: 5,
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: 4,
  },
  detailsTextPrivate: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    marginLeft: 5,
    borderRadius: 5,
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: 4,
  },
  modalView: {
    flex: 1,
    //marginVertical: 20,
    //backgroundColor: '#fff',
    //borderRadius: 20,
    //padding: 35,
    //alignItems: 'center',

    // marginHorizontal: 20,
    //height: 600,
    //width: '90%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    //alignSelf: 'center',
    //justifyContent: 'center'
    //flex: 1,
        //   flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
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
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 5
  },
  pollTitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
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
  }
  
});
