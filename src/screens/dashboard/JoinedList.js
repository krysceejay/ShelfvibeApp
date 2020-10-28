import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import Config from 'react-native-config';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {fetchClubs} from '../../actions/clubActions';
import Skeleton from '../../components/Skeleton';


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
  {key: 21},
];

const JoinedClub = ({fetchClubs, navigation, clubs}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      // Call any action
      const getClubs = await fetchClubs();
      if (getClubs !== 'failed') {
        setIsLoading(false);
      }
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
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

  const removeClub =  (id) => {
    return;
  };

  const createTwoButtonAlert = (id) =>
    Alert.alert(
  'Leave',
  'Are you sure you want to leave this club?',
  [
    {
      text: 'Cancel',
      onPress: () => false,
      style: 'cancel',
    },
    {text: 'OK', onPress: () => removeClub(id)},
  ],
  {cancelable: false},
);

  _renderItem = ({item, index}) => {
    if (item.empty) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      
      <View style={styles.item}>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}>
        
        <View style={styles.bookCoverContain}>
          
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
          
        </View>
        </TouchableOpacity>
        <View style={styles.bookDetails}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bookTitle}>
            Club Name Club Name
          </Text>
          <Text style={styles.members} numberOfLines={1} ellipsizeMode="tail">
            16 members
          </Text>
          
        </View>
        <TouchableOpacity
            style={{
              zIndex: 2,
              width: 34,
              height: 34,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
              marginVertical: 15
              
            }}
            onPress={() => {createTwoButtonAlert(1)}}>
            <Ionicons name="md-remove-circle-outline" size={22} color="#444444" />
          </TouchableOpacity>
        
      </View>
      
    );
  };

  //   return (
  //     <View style={styles.container}>
  //       {isLoading ? (
  //         <Skeleton />
  //       ) : (
  //         <FlatList
  //           data={formatData(dataList, numColumns)}
  //           renderItem={_renderItem}
  //           keyExtractor={(item, index) => index.toString()}
  //           numColumns={numColumns}
  //           showsVerticalScrollIndicator={false}
  //         />
  //       )}
  //     </View>
  //   );
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
  clubs: state.club.clubs,
});

export default connect(
  mapStateToProps,
  {fetchClubs},
)(JoinedClub);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#fff'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 15,
    overflow: 'hidden',
    //alignItems: 'center',
    justifyContent: 'flex-start',
    height: 120,
    borderWidth: 2,
    borderColor: '#f5f5f5',
    borderRadius: 10
  },
  bookCoverContain: {
    //borderRadius: 12,
    width: 150,
    overflow: 'hidden',
  },
  bookCover: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  bookDetails: {
    marginLeft: 15,
    width: '40%',
    paddingVertical: 15,
    //backgroundColor: 'red'
  },
  bookTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
  },
  members: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: '#444444',
    marginTop: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
});
