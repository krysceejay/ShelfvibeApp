import React, {useState, useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Skeleton from '../../components/Skeleton';
import AddPoll from '../../components/AddPoll';
import EditPoll from '../../components/EditPoll';
import {fetchClubPolls, setPollAction} from '../../actions/pollActions';
import {AuthContext} from '../../utils/context';

const numColumns = 1;

const Poll = ({route, fetchClubPolls, setPollAction, polls}) => {
  const {clubid} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [addPollShow, setAddPollShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const user = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    getClubPolls(clubid);
  }, []);

  getClubPolls = async clubid => {
    const getPolls = await fetchClubPolls(clubid);
      if (getPolls !== 'failed') {
        setIsLoading(false);
    }
  };

  handleOnCloseModal = () => {
    setAddPollShow(false);
  };

  handleOnSelectItem = item => {
    setSelectedItem(item);
  };

  handleOnCloseEditModal = () => {
    setSelectedItem(null);
  };

  showPollBooks = (item, index) => {
    return <View key={index} style={styles.progressSingle}>
      <Text numberOfLines={1} ellipsizeMode="tail">{item}</Text>
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
      <View style={styles.item}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.pollName}</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              markCurrent(item.id)
            }}>
            <Ionicons 
            name={item.current ? "ios-checkmark-circle-outline" : "ios-radio-button-off"} 
            size={25} 
            color={item.current ? "#155724" : "#ccc"} 
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {handleOnSelectItem(item)}}>
            <FontAwesome name="edit" size={25} color="#444444" />
          </TouchableOpacity>
        </View>
        <View style={styles.pollDetails}>
          {item.books.map(showPollBooks)}
        </View>
      </View>
    );
  };

  return (
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
        <Modal
        animationType="fade"
        transparent={true}
        visible={addPollShow}>
        <View style={styles.memberModalView}>
            <AddPoll closeModal={handleOnCloseModal} clubId={clubid} />
        </View>
        </Modal>
      <FlatList
          data={polls}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No poll found</Text>
        )}
        />
        <Modal
            animationType="fade"
            transparent={true}
            visible={selectedItem ? true : false}>
            <View style={styles.memberModalView}>
              <EditPoll
                closeModal={handleOnCloseEditModal}
                item={selectedItem}
                clubId={clubid}
              />
            </View>
          </Modal>
    </View>
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
    //paddingVertical: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  item: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 20,
    borderWidth: 2,
    borderColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', 
    backgroundColor: '#fff',
    //paddingHorizontal: 15,
    //paddingVertical: 12,
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
    backgroundColor: '#ddd',
    marginVertical: 5,
    padding: 10,
  },
  memberModalView: {
    flex: 1,
    backgroundColor: '#fff',
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
});
