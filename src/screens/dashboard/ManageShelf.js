import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import Config from 'react-native-config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {AuthContext} from '../../utils/context';
import {getUserBooks} from '../../actions/bookActions';
import Skeleton from '../../components/Skeleton';
import Empty from '../../components/Empty';
import BorderButton from '../../components/BorderButton';
import Readers from '../../components/Readers';

const {width} = Dimensions.get('window');

const ManageShelf = ({getUserBooks, userBooks, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const numColumns = 2;
  const imgURL = Config.IMAGE_URL;
  //const imgURL = 'http://127.0.0.1:4000/images/bookcover/';

  formatData = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - totalRows * numColumns;
    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      dataList.push({key: 'blank', empty: true});
      totalLastRow++;
    }
    return dataList;
  };

  handleOnSelectItem = item => {
    setSelectedItem(item);
    //setModalVisible(true);
  };

  handleOnCloseModal = () => {
    setSelectedItem(null);
    //setModalVisible(!modalVisible);
  };

  _renderItem = ({item, index}) => {
    if (item.empty) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <View style={[StyleSheet.absoluteFill, styles.bookCoverContain]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details', {
                item,
              });
            }}>
            <Image
              source={{
                uri: `${imgURL + item.bookcover}`,
              }}
              style={styles.bookCover}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bookDetails}>
          {/* <Text style={styles.bookTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text
            style={styles.bookAuthor}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.author}
          </Text> */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BookTopic');
              }}>
              <View style={styles.iconContainer}>
                <FontAwesome name="book" size={16} color="#fff" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleOnSelectItem(item.readers)}>
              <View style={styles.iconContainer}>
                <FontAwesome name="users" size={16} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <View>
          <FlatList
            data={formatData(userBooks, numColumns)}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 15,
                }}>
                <Empty />
                <Text style={styles.textBody}>
                  Looks like you've not added a book.
                </Text>
                <BorderButton
                  onpress={() => {
                    navigation.navigate('AddShelf');
                  }}
                  text="Add a Book"
                />
              </View>
            )}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={selectedItem ? true : false}>
            <View style={styles.modalView}>
              <Readers
                closeModal={handleOnCloseModal}
                selectedItem={selectedItem}
                username={user.username}
              />
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  userBooks: state.book.userBooks,
});

export default connect(
  mapStateToProps,
  {getUserBooks},
)(ManageShelf);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
  },
  item: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: width / 1.4,
    textAlign: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    //padding: 10,
  },
  bookCoverContain: {
    flex: 1,
    width: '100%',
    //backgroundColor: 'green',
  },
  bookCover: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  bookDetails: {
    //alignItems: 'center',
    padding: 5,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    bottom: 0,
  },
  bookTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    textAlign: 'center',
  },
  bookAuthor: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: '#444444',
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    //marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-around',

    //backgroundColor: 'red',
  },
  iconContainer: {
    borderRadius: 30,
    borderColor: '#fff',
    borderWidth: 2,
    padding: 10,
    backgroundColor: '#00A2CC',
    borderWidth: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  textBody: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  modalView: {
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
});
