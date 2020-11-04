import React, {useState, useEffect} from 'react';
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
  Image
} from 'react-native';
import Config from 'react-native-config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {fetchBooks} from '../../actions/bookActions';
import Skeleton from '../../components/Skeleton';
import AddBook from '../../components/AddBook';
import EditBook from '../../components/EditBook';

const {width} = Dimensions.get('window');

const dataList = [
    {key: 1},
    {key: 2},
    {key: 3},
    {key: 4},
    {key: 5},
    {key: 6},
    {key: 7},
    {key: 8},
    {key: 9},
  {key: 10},
  {key: 11},
  {key: 12},
  {key: 13},
  {key: 14},
  {key: 15},
  {key: 16},
  {key: 17},
  {key: 18},
  {key: 19},
  {key: 20},
  ];

const ReadingList = ({navigation}) => {
  const [addBookShow, setAddBookShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [current, setCurrent] = useState(false);
  const numColumns = 3;

  formatData = (dataList, numColumns) => {
    if (dataList !== null) {
      const totalRows = Math.floor(dataList.length / numColumns);
      let totalLastRow = dataList.length - totalRows * numColumns;
      while (totalLastRow !== 0 && totalLastRow !== numColumns) {
        dataList.push({key: 'blank', empty: true});
        totalLastRow++;
      }
    }
    return dataList;
  };

  handleOnCloseModal = () => {
    setAddBookShow(false);
  };

  handleOnSelectItem = item => {
    setSelectedItem(item);
  };

  handleOnCloseEditModal = () => {
    setSelectedItem(null);
  };

  _renderItem = ({item, index}) => {
    if (item.empty) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
        <View
            style={{
                backgroundColor: '#fff',
                padding: 6,
                width: width * 1/3,
                height: width * 0.56,
                marginVertical: 3,
                position: 'relative'

            }}>
            <Image
                source={require('../../assets/img/showup.jpg')}
                style={{width: '100%', height: '80%', resizeMode: 'cover'}}
            />
            
                <View style={styles.current}>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
                        <Ionicons name="ios-checkmark-circle-outline" size={30} color="#155724" />
                    </TouchableOpacity>
                    <Text style={styles.textMonth}>Current</Text>
                </View>
            
            
            <TouchableOpacity
            style={{
              //paddingHorizontal: 12,
              position: 'absolute',
              bottom: 50,
              right: 10,
              zIndex: 2,
              backgroundColor: '#242c42',
              borderRadius: 15,
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.6}
            onPress={() => {handleOnSelectItem(item)}}>
            <FontAwesome name="edit" size={18} color="#fff" />
          </TouchableOpacity>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bookTitle}>The Richest Man In Babylon The Richest Man In Babylon</Text>
        </View>
    );
  };

  return (
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
        {/* <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={navigation.goBack}>
            <Ionicons name="md-arrow-back" size={25} color="#444444" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Reading List (21)</Text>
          <TouchableOpacity onPress={() => {
            setAddBookShow(true);
            }}
            activeOpacity={0.9}>
            <Ionicons
              name="ios-add"
              size={30}
              color="#444444"
            />
          </TouchableOpacity>
        </View> */}
        <Modal
        animationType="fade"
        transparent={true}
        visible={addBookShow}>
        <View style={styles.memberModalView}>
            <AddBook closeModal={handleOnCloseModal} />
        </View>
        </Modal>
      <FlatList
          data={formatData(dataList, numColumns)}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
        />
        <Modal
            animationType="fade"
            transparent={true}
            visible={selectedItem ? true : false}>
            <View style={styles.memberModalView}>
              <EditBook
                closeModal={handleOnCloseEditModal}
              />
            </View>
          </Modal>
    </View>
  );
};

export default ReadingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
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
        backgroundColor: '#fff',
    },
    current: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(238,238,238, 0.95)',
        top: 6,
        left: 6,
        width: '100%',
        padding: 6
    },
    textMonth: {
        fontFamily: 'Nunito-Regular',
        fontSize: 14,
        color: '#333',
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
          }
});
