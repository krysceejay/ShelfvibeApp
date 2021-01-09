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
import moment from "moment";
import {AuthContext} from '../../utils/context';
import {getUserClubs} from '../../actions/clubActions';
import AddClub from '../../components/AddClub';
import EditClub from '../../components/EditClub';
import {stringToHslColor} from '../../utils/theme';
import Skeleton from '../../components/Skeleton';
import Empty from '../../components/Empty';

const {width} = Dimensions.get('window');

const dataList = [
  {key: 1},
  {key: 2},
  {key: 3},
];

const numColumns = 1;
const imgURL = Config.IMAGE_URL;

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
        
        <View style={styles.bookCoverContain}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details', {
                item
              });
            }}
            activeOpacity={0.9}>
            {item.image !== "noimage.jpg" ? <Image
                source={{
                  uri: `${imgURL}/club/${item.image}`,
                }}
                style={styles.bookCover}
              /> : <View style={[styles.clubNoImage, {backgroundColor: stringToHslColor(item.name)}]}>
              <Text style={styles.initial}>{item.name}</Text>
             </View> }
            {/* <Image
              style={styles.bookCover}
              source={require('../../assets/img/showup.jpg')}
            /> */}
          </TouchableOpacity>
          
        </View>
        
        <View style={styles.bookDetails}>
          <View style={styles.nameAndEdit}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bookTitle}>
              {item.name}
            </Text>
            <TouchableOpacity
            style={{
              zIndex: 2,
              width: 34,
              height: 34,
            }}
            activeOpacity={0.9}
            onPress={() => {handleOnSelectItem(item)}}>
            <FontAwesome name="edit" size={22} color="#444444" />
          </TouchableOpacity>
          </View>
          <View style={styles.afterName}>
              <Text style={styles.members} numberOfLines={1} ellipsizeMode="tail">
              {item.members.length} member(s)
              </Text>
              <Text style={styles.clubDate} numberOfLines={1} ellipsizeMode="tail">
                Created on {moment(item.insertedAt).format("Do MMM YYYY")}
              </Text>
            </View>
            <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
              {item.description}
            </Text>
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
        contentContainerStyle={{paddingBottom: 40}}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No club found</Text>
      )}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={selectedItem ? true : false}>
        <View style={styles.memberModalView}>
          <EditClub
            closeModal={handleOnCloseEditModal}
            item={selectedItem}
          />
        </View>
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
    padding: 12,
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 12
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
      fontSize: 15,
      paddingHorizontal: 12,
      marginTop: 15
    },
});
