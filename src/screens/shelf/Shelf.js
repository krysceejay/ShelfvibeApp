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
} from 'react-native';
import Config from 'react-native-config';

import {fetchBooks} from '../../actions/bookActions';
import Skeleton from '../../components/Skeleton';

const {width} = Dimensions.get('window');

const Shelf = ({fetchBooks, navigation, books}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      // Call any action
      const getShelf = await fetchBooks();
      if (getShelf !== 'failed') {
        setIsLoading(false);
      }
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const numColumns = 2;
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
          {/* <Text numberOfLines={1} ellipsizeMode="tail" style={styles.bookTitle}>
            {item.title}
          </Text>
          <Text
            style={styles.bookAuthor}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.author}
          </Text> */}
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.bookAddedBy, {fontSize: 14}]}>
            {item.user.username}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <FlatList
          data={formatData(books, numColumns)}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  books: state.book.books,
});

export default connect(
  mapStateToProps,
  {fetchBooks},
)(Shelf);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    //paddingHorizontal: 10,
    //paddingTop: 5,
    //paddingVertical: 15,
  },
  item: {
    flex: 1,
    margin: 10,
    //borderColor: '#ccc',
    //borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    //padding: 10,

    //backgroundColor: '#3232ff',
    alignItems: 'center',
    justifyContent: 'center',
    height: width / 1.4,
    textAlign: 'center',
  },
  bookCoverContain: {
    //backgroundColor: 'green',
    flex: 1,
    width: '100%',
  },
  bookCover: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
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
  bookTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    textAlign: 'center',
  },
  bookAuthor: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: '#444444',
    textAlign: 'center',
  },
  bookAddedBy: {
    fontFamily: 'Nunito-Regular',
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    //margin: 10,
    borderColor: 'transparent',
    //borderWidth: 1,
  },
});
