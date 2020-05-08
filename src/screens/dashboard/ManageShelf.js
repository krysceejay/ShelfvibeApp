import React, {Component} from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
const numColumns = 2;
const WIDTH = Dimensions.get('window').width;

export default class ManageShelf extends Component {
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
        {/* <Text style={styles.itemText}>{item.key}</Text> */}
        <View style={styles.bookCoverContain}>
          <Image
            style={styles.bookCover}
            source={require('../../assets/img/playbigger.jpg')}
          />
        </View>
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>Think Big</Text>
          <Text style={styles.bookAuthor}>Ben Carson, Phil James</Text>
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('BookTopic');
              }}>
              <View style={styles.iconContainer}>
                <FontAwesome name="book" size={16} color="#3a4155" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Members');
              }}>
              <View style={styles.iconContainer}>
                <FontAwesome name="users" size={16} color="#3a4155" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.formatData(dataList, numColumns)}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

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
    height: WIDTH / 1.45,
    textAlign: 'center',
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
    justifyContent: 'space-evenly',
  },
  iconContainer: {
    borderRadius: 30,
    borderColor: '#f53ba3',
    borderWidth: 2,
    padding: 10,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
