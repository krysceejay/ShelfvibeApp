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
  TextInput,
  Alert
} from 'react-native';
import Config from 'react-native-config';

import {fetchClubs} from '../../actions/clubActions';
import Skeleton from '../../components/Skeleton';

const {width} = Dimensions.get('window');

const dataList = [
  {key: 1, name: 'James'},
  {key: 2, name: 'Shoe'},
  {key: 3, name: 'Addida'},
  {key: 4, name: 'John'},
  {key: 5, name: 'Gadd'},
  {key: 6, name: 'Faith'},
  {key: 7, name: 'Amaka'},
  {key: 8, name: 'Jack'},
  {key: 9, name: 'Jill'},
  {key: 10, name: 'Liller'},
  {key: 11, name: 'Tope'},
  {key: 12, name: 'Uduak'},
  {key: 13, name: 'Goodness'},
  {key: 14, name: 'Adams'},
  {key: 15, name: 'Falz'},
  {key: 16, name: 'Tomama'},
  {key: 17, name: 'Saidi'},
  {key: 18, name: 'Vickky'},
  {key: 19, name: 'Hommie'},
  {key: 20, name: 'Ziller'}
];

const Shelf = ({fetchClubs, navigation, clubs}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [filterClubs, setFilterClubs] = useState(dataList);

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

  const searchClub = text => {
    setFilterClubs(dataList.filter(item => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    }))
  }

  _renderItem = ({item, index}) => {
    if (item.empty) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
            activeOpacity={0.9}>
      <View style={styles.item}>
        
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
        <View style={styles.bookDetails}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bookTitle}>
            {item.name}
          </Text>
          <Text style={styles.members} numberOfLines={1} ellipsizeMode="tail">
            16 members
          </Text>
          
        </View>
        
      </View>
      </TouchableOpacity>
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
      <View style={styles.singleInput}>
        <TextInput placeholder="Search club" style={styles.textInput} onChangeText={text => searchClub(text)} />
      </View>
      <FlatList
        data={filterClubs}
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
)(Shelf);

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
    alignItems: 'center',
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
  textInput: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#444',
    backgroundColor: '#eee',
    height: 50,
    paddingHorizontal: 10,
  },
});
