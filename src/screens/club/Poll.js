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
} from 'react-native';
import Config from 'react-native-config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {fetchBooks} from '../../actions/bookActions';
import Skeleton from '../../components/Skeleton';
import AddPoll from '../../components/AddPoll';
import EditPoll from '../../components/EditPoll';

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
  ];

const Poll = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [addPollShow, setAddPollShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const numColumns = 1;

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
    setAddPollShow(false);
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
      <View style={styles.item}>
        <View style={styles.header}>
          <Text style={styles.title}>October Book Poll</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {}}>
            <Ionicons name="ios-checkmark-circle-outline" size={25} color="#155724" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {handleOnSelectItem(item)}}>
            <FontAwesome name="edit" size={25} color="#444444" />
          </TouchableOpacity>
        </View>
        <View style={styles.pollDetails}>
            <View style={styles.progressSingle}>
                <Text numberOfLines={1} ellipsizeMode="tail">A Designer's Art</Text>
                <Text>10%</Text>
            </View>
            <View style={styles.progressSingle}>
                <Text numberOfLines={1} ellipsizeMode="tail">Thinking with Type</Text>
                <Text>70%</Text>
            </View>
            <View style={styles.progressSingle}>
                <Text numberOfLines={1} ellipsizeMode="tail">Interaction of Color</Text>
                <Text>60%</Text>
            </View>
            <View style={styles.progressSingle}>
                <Text numberOfLines={1} ellipsizeMode="tail">Design of Everything</Text>
                <Text>50%</Text>
            </View>
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
            <AddPoll closeModal={handleOnCloseModal} />
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
              <EditPoll
                closeModal={handleOnCloseEditModal}
              />
            </View>
          </Modal>
    </View>
  );
};

export default Poll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
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
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
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
      }
});
