import React, {useState, useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../components/Loader';
import AddPoll from '../../components/AddPoll';
import EditPoll from '../../components/EditPoll';
import {fetchClubPolls, setPollAction} from '../../actions/pollActions';
import {AuthContext} from '../../utils/context';

const numColumns = 1;

const Poll = ({route, fetchClubPolls, setPollAction, polls, navigation}) => {
  const {clubid} = route.params;
  const {dark, colors} = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [addPollShow, setAddPollShow] = useState(false);
  const [selectedPollItem, setSelectedPollItem] = useState(null);

  const user = useContext(AuthContext);

  // useEffect(() => {
  //   setIsLoading(true);
  //   getClubPolls(clubid);
  // }, [clubid]);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = navigation.addListener('focus', async () => {
      const getPolls = await fetchClubPolls(clubid);
      if (getPolls !== 'failed') {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [clubid]);

  // getClubPolls = async clubid => {
  //   const getPolls = await fetchClubPolls(clubid);
  //     if (getPolls !== 'failed') {
  //       setIsLoading(false);
  //   }
  // };

  handleOnCloseModal = () => {
    setAddPollShow(false);
  };

  handleOnSelectedItem = it => {
    setSelectedPollItem(it);
  };

  handleOnCloseEditModal = () => {
    setSelectedPollItem(null);
  };

  showPollBooks = (item, index) => {
    return <View key={index} style={[styles.progressSingle, {backgroundColor: colors.background}]}>
      <Text style={{color: colors.text}} numberOfLines={1} ellipsizeMode="tail">{item}</Text>
      {/* <Text>10%</Text> */}
    </View>
  };

  markCurrent = async (pollId) => {
    if(user === null){
      Alert.alert('Failed', 'Kindly login to proceed.');
      return;
    }
      await setPollAction({
      clubid,
      pollId
    });
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={[styles.item, {backgroundColor: colors.card, borderColor: colors.border}]}>
        <View style={styles.header}>
          <Text style={[styles.title, {color: colors.text}]}>{item.pollName}</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              markCurrent(item.id)
            }}>
            <Ionicons 
            name={item.current ? "ios-checkmark-circle-outline" : "ios-radio-button-off"} 
            size={25} 
            color={item.current ? dark ? '#90ee90': '#155724' : colors.icon} 
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleOnSelectedItem(item)}>
            <FontAwesome name="edit" size={25} color={colors.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.pollDetails}>

          {item.books !== null && item.books.map(showPollBooks)}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <View style={[styles.headerBlock, {borderBottomColor: colors.borderBottomColor}]}>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}
          style={{
            paddingHorizontal: 3,
            marginRight: 38
          }}
            activeOpacity={0.9}>
            <AntDesign
              name="left"
              size={28}
              color={colors.icon}
              />
          </TouchableOpacity>
          <Text style={[styles.headerText, {color: colors.text}]}>Poll</Text>
        </View>
    <View style={styles.container}>
        <TouchableOpacity onPress={() => {
            setAddPollShow(true);
            }}
            style={styles.floatingBtn}
            activeOpacity={0.9}>
            <Ionicons
              name="ios-add"
              size={40}
              color="#fff"
            />
            </TouchableOpacity>
        {isLoading ? <Loader 
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}/> :
      <FlatList
          data={polls}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 50, paddingTop: 12}}
          ListEmptyComponent={() => (
            <Text style={[styles.emptyText, {color: colors.text}]}>No poll found</Text>
        )}
        />
          }
          <Modal
        animationType="fade"
        transparent={true}
        visible={addPollShow}>
        <View style={[styles.memberModalView, {backgroundColor: colors.background}]}>
            <AddPoll closeModal={handleOnCloseModal} clubId={clubid} />
        </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={selectedPollItem !== null ? true : false}>
          <View style={[styles.memberModalView, {backgroundColor: colors.background}]}>
            <EditPoll
              closeModal={handleOnCloseEditModal}
              item={selectedPollItem}
              clubId={clubid}
            />
          </View>
        </Modal>  
    </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  polls: state.poll.polls,
});

export default connect(
  mapStateToProps,
  {fetchClubPolls, setPollAction},
)(Poll);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  item: {
    flex: 1,
    margin: 10,
    borderRadius: 12,
    overflow: 'hidden',
    padding: 20,
    borderWidth: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5
 },
  title: {
    fontSize: 15,
    fontFamily: 'Nunito-Bold',
    width: '60%'
  },
  bookDetails: {
    //flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    padding: 5,
    position: 'absolute',
    top: 5,
    left: 0,
    maxWidth: '100%',
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  pollDetails: {
      width: '100%',
      marginTop: 10,
  },
  progressSingle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    //height: 40,
    borderRadius: 5,
    //backgroundColor: '#ddd',
    marginVertical: 5,
    padding: 10,
  },
  memberModalView: {
    flex: 1,
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
    emptyText: {
      fontFamily: 'Nunito-Regular',
      fontSize: 15,
      paddingHorizontal: 12,
      marginTop: 15
    },
    headerBlock: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 5,
      height: 55,
      borderBottomWidth: 1
   },
    headerText: {
      fontFamily: 'Nunito-Regular',
      fontSize: 20,
    }
});
