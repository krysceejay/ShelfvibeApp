import React, {useEffect} from 'react';
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

const WIDTH = Dimensions.get('window').width;

const Shelf = ({fetchBooks, navigation, books}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      fetchBooks();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const numColumns = 2;
  const imgURL = Config.IMAGE_URL;

  formatData = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - totalRows * numColumns;
    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      dataList.push({key: 'blank', empty: true});
      totalLastRow++;
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
            <Image
              source={{
                uri: `${imgURL + item.bookcover}`,
              }}
              style={styles.bookCover}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bookDetails}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.bookTitle}>
            {item.title}
          </Text>
          <Text
            style={styles.bookAuthor}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.author}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            Added By
            <Text style={styles.bookAddedBy}> {item.user.username}</Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={formatData(books, numColumns)}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
      />
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
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,

    //backgroundColor: '#3232ff',
    alignItems: 'center',
    justifyContent: 'center',
    height: WIDTH / 1.4,
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
    resizeMode: 'contain',
  },
  bookDetails: {
    //flex: 1,
    //backgroundColor: 'red',
    alignItems: 'center',
    padding: 5,
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
    fontSize: 13,
    color: '#444444',
    textAlign: 'center',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    //margin: 10,
    borderColor: 'transparent',
    //borderWidth: 1,
  },
});
