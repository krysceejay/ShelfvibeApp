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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthContext} from '../../utils/context';
import {getUserBooks} from '../../actions/bookActions';
import Skeleton from '../../components/Skeleton';
import Empty from '../../components/Empty';

const {width} = Dimensions.get('window');

const dataList = [
  {key: 1},
  {key: 2},
  {key: 3},
];

const ManageClub = ({getUserBooks, userBooks, navigation}) => {

  const [isLoading, setIsLoading] = useState(false);
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

  const numColumns = 1;
  const imgURL = Config.IMAGE_URL;
  //const imgURL = 'http://127.0.0.1:4000/images/bookcover/';

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

  _renderItem = ({item, index}) => {
    if (item.empty) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      
      <View style={styles.item}>
        
        <View style={styles.bookCoverContain}>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}>
          
            {/* <Image
                source={{
                  uri: `${imgURL + item.bookcover}`,
                }}
                style={styles.bookCover}
              /> */}
            <Image
              style={styles.bookCover}
              source={require('../../assets/img/showup.jpg')}
            />
          </TouchableOpacity>
          
        </View>
        
        <View style={styles.bookDetails}>
          <View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bookTitle}>
              Club Name Club Name
            </Text>
            <Text style={styles.members} numberOfLines={1} ellipsizeMode="tail">
              16 members
            </Text>
            <Text style={styles.clubDate} numberOfLines={1} ellipsizeMode="tail">
              Created on 2nd Jan 2020
            </Text>
          </View>
          <TouchableOpacity
            style={{
              zIndex: 2,
              width: 34,
              height: 34,
              alignItems: 'center',
              justifyContent: 'center',
              
            }}
            onPress={() => {
              
            }}>
            <MaterialCommunityIcons name="dots-vertical" size={25} color="#444444" />
          </TouchableOpacity>
        </View>
      </View>
      
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={formatData(dataList, numColumns)}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
      />
      
    </View>
  );
};

const mapStateToProps = state => ({
  userBooks: state.book.userBooks,
});

export default connect(
  mapStateToProps,
  {getUserBooks},
)(ManageClub);

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
    //height: width / 1.4,
    textAlign: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    //padding: 10,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    width: '100%',
    backgroundColor: '#fff',
  },
  bookTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 17,
    //textAlign: 'center',
  },
  members: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: '#444444',
    marginTop: 5,
  },
  clubDate: {
    fontFamily: 'Nunito-Italic',
    fontSize: 13,
    color: '#444444',
    marginTop: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
});
