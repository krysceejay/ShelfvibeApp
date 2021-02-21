import React, {useState, useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Config from 'react-native-config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loader from '../../components/Loader';
import AddBook from '../../components/AddBook';
import EditBook from '../../components/EditBook';
import {AuthContext} from '../../utils/context';
import {fetchClubReadList, setBookAction} from '../../actions/bookListActions';

const {width} = Dimensions.get('window');
const numColumns = 3;
const imgURL = Config.IMAGE_URL;

const ReadingList = ({route, fetchClubReadList, bookLists, setBookAction, navigation}) => {
  const {clubid} = route.params;
  const {dark, colors} = useTheme();
  const [addBookShow, setAddBookShow] = useState(false);
  const [selectedBookItem, setSelectedBookItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useContext(AuthContext);

  // useEffect(() => {
  //   setIsLoading(true);
  //   getClubReadList(clubid);
  // }, [clubid]);

  // getClubReadList = async clubid => {
  //   const getReadList = await fetchClubReadList(clubid);
  //     if (getReadList !== 'failed') {
  //       setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = navigation.addListener('focus', async () => {
      const getReadList = await fetchClubReadList(clubid);
      if (getReadList !== 'failed') {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [clubid]);

  handleOnCloseModal = () => {
    setAddBookShow(false);
  };

  handleOnSelectBookItem = item => {
    setSelectedBookItem(item);
  };

  handleOnCloseEditModal = () => {
    setSelectedBookItem(null);
  };

  markCurrent = async (bookId) => {
    if(user === null){
      Alert.alert('Failed', 'Kindly login to proceed.');
      return;
    }
      await setBookAction({
      clubid,
      bookId
    });
  }

  _renderItem = ({item, index}) => {
    return (
        <View
            style={{
                backgroundColor: colors.background,
                padding: 6,
                width: width * 1/3,
                //height: width * 0.56,
                marginVertical: 3,
                position: 'relative',
            }}>
            <Image
                source={{
                  uri: `${imgURL}/bookcover/${item.bookcover}`,
                }}
                style={{width: '100%', height: width * 0.40, resizeMode: 'cover'}}
              />
              <View style={[styles.current, {backgroundColor: colors.card}]}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => {
                  markCurrent(item.id)
                }}>
                  <Ionicons 
                    name={item.current ? "ios-checkmark-circle-outline" : "ios-radio-button-off"} 
                    size={25} 
                    color={item.current ? dark ? '#90ee90': '#155724' : colors.icon} 
                  />
                </TouchableOpacity>
                  {item.current && <Text style={[styles.textMonth, {color: colors.text}]}>Current</Text>}
              </View>
            <TouchableOpacity
            style={{
              //paddingHorizontal: 12,
              position: 'absolute',
              bottom: 25,
              right: 6,
              zIndex: 2,
              backgroundColor: colors.card,
              borderRadius: 15,
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.6}
            onPress={() => handleOnSelectBookItem(item)}>
            <FontAwesome name="edit" size={18} color={colors.icon} />
          </TouchableOpacity>
          <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.bookTitle, {color: colors.text}]}>{item.title}</Text>
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
          <Text style={[styles.headerText, {color: colors.text}]}>Reading List</Text>
        </View>
    <View style={styles.container}>
        <TouchableOpacity onPress={() => {
            setAddBookShow(true);
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
        visible={addBookShow}>
        <View style={[styles.memberModalView, {backgroundColor: colors.background}]}>
            <AddBook closeModal={handleOnCloseModal} clubId={clubid} />
        </View>
        </Modal>
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
          data={bookLists}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={[styles.emptyText, {color: colors.text}]}>No book found</Text>
        )}
        contentContainerStyle={{paddingBottom: 45}}
        />
        }
        <Modal
          animationType="fade"
          transparent={true}
          visible={selectedBookItem ? true : false}>
          <View style={[styles.memberModalView, {backgroundColor: colors.background}]}>
            <EditBook
              closeModal={handleOnCloseEditModal}
              item={selectedBookItem}
              clubId={clubid}
            />
          </View>
        </Modal>
    </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  bookLists: state.booklist.bookLists,
});

export default connect(
  mapStateToProps,
  {fetchClubReadList, setBookAction},
)(ReadingList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', 
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 5
 },
    headerText: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    },
    textContainer: {
        height: '20%',
        marginTop: 3,
        paddingHorizontal: 10,
    },
    bookTitle: {
        fontFamily: 'Nunito-Regular',
        fontSize: 13,
    },
    readingMonth: {
        fontFamily: 'Nunito-Regular',
        fontSize: 11,
    },
    itemInvisible: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    memberModalView: {
        flex: 1,
    },
    current: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        //backgroundColor: 'rgba(238,238,238, 0.95)',
        top: 6,
        left: 6,
        width: '100%',
        padding: 6
    },
    textMonth: {
        fontFamily: 'Nunito-Regular',
        fontSize: 14,
        marginLeft: 15
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
