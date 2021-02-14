import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import Config from 'react-native-config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import {AuthContext} from '../../utils/context';
import {getUserClubs} from '../../actions/clubActions';
import AddClub from '../../components/AddClub';
import Manage from '../../components/Manage';
import Skeleton from '../../components/Skeleton';

const numColumns = 2;
const imgURL = Config.IMAGE_URL;
const {width} = Dimensions.get('window');

const ManageClub = ({getUserClubs, userClubs, navigation}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [addClubShow, setAddClubShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const user = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = navigation.addListener('focus', async () => {
      const getUserShelf = await getUserClubs(user.id);
      if (getUserShelf !== 'failed') {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [navigation]);

  handleOnCloseModal = () => {
    setAddClubShow(false);
  };

  handleOnSelectItem = item => {
    setSelectedItem(item);
  };

  handleOnCloseEditModal = () => {
    setSelectedItem(null);
  };

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemContain}>
        <View style={styles.bookCoverContain}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details', {
                item
              });
            }}
            activeOpacity={0.9}>
              <Image
                source={{
                  uri: `${imgURL}/club/${item.image}`,
                }}
                style={styles.bookCover}
              />
          </TouchableOpacity>
        </View>
        
        <View style={styles.bookDetails}>
          <View style={styles.nameAndEdit}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.bookTitle}>
              {item.name}
            </Text>
            <TouchableOpacity
            style={{
              justifyContent: 'flex-end'
            }}
            activeOpacity={0.9}
            onPress={() => {handleOnSelectItem(item)}}>
            <MaterialCommunityIcons name="dots-vertical" size={22} color="#444444" />
          </TouchableOpacity>
          </View>
            <Text style={styles.members} numberOfLines={1} ellipsizeMode="tail">
            {item.members.length} {item.members.length > 1 ? 'members' : 'member'}
            </Text>
        </View>
        </View>
      </View>
      
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Skeleton /> :
      <>
      <TouchableOpacity onPress={() => {
        setAddClubShow(true);
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
        visible={addClubShow}>
        <View style={styles.memberModalView}>
            <AddClub closeModal={handleOnCloseModal} />
        </View>
        </Modal>
      <FlatList
        data={userClubs}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50, paddingTop: 12}}
        ListEmptyComponent={() => (
          <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center', height: 600}}>
          <Text style={styles.emptyText}>Looks like you have not added any club.</Text>
          </View>
      )}
      />
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={selectedItem ? true : false}>
        <View style={styles.memberModalView}>
          <EditClub
            closeModal={handleOnCloseEditModal}
            item={selectedItem}
          />
        </View>
      </Modal> */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={selectedItem ? true : false}>
          <TouchableOpacity onPress={handleOnCloseEditModal} activeOpacity={1} style={styles.modalView}>
            <Manage
            closeModal = {handleOnCloseEditModal}
            item={selectedItem}
            navigation={navigation}
            />
          </TouchableOpacity>
      </Modal>
      </>
      }
    </View>
  );
};

const mapStateToProps = state => ({
  userClubs: state.club.userClubs,
});

export default connect(
  mapStateToProps,
  {getUserClubs},
)(ManageClub);

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
    height: 120,
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
    //marginBottom: 12
  },
  nameAndEdit: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    maxWidth: '90%'
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
        marginTop: 8,
      },
      memberModalView: {
        flex: 1,
        backgroundColor: '#fff',
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
    modalView: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
     justifyContent: 'center',
     alignItems: 'center'
    },
});
