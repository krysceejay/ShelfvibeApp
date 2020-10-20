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
} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../utils/context';
import {getUserBooks} from '../../actions/bookActions';
import Skeleton from '../../components/Skeleton';
import Empty from '../../components/Empty';
import BorderButton from '../../components/BorderButton';

const {width} = Dimensions.get('window');

const ManageShelf = ({getUserBooks, userBooks, navigation}) => {
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

  const numColumns = 2;
  //const imgURL = Config.IMAGE_URL;
  const imgURL = 'http://127.0.0.1:4000/images/bookcover/';

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
          <Image
            source={{
              uri: `${imgURL + item.bookcover}`,
            }}
            style={styles.bookCover}
          />
        </View>
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text
            style={styles.bookAuthor}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.author}
          </Text>
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BookTopic');
              }}>
              <View style={styles.iconContainer}>
                <FontAwesome name="book" size={16} color="#fff" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Members');
              }}>
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

    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  bookCoverContain: {
    flex: 1,
    width: '100%',
    //backgroundColor: 'green',
  },
  bookCover: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  bookDetails: {
    //alignItems: 'center',
    padding: 5,
    width: '80%',
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
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconContainer: {
    borderRadius: 30,
    borderColor: '#fff',
    borderWidth: 2,
    padding: 10,
    backgroundColor: '#00a2cc',
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
});
