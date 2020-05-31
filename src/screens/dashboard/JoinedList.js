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

export default class JoinedList extends Component {
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
            source={require('../../assets/img/showup.jpg')}
          />
        </View>
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>Think Big</Text>
          <Text style={styles.bookAuthor}>Ben Carson, Phil James</Text>
          <View style={styles.addedByView}>
            <Text style={styles.addedByText}>Added By</Text>
            <Text style={styles.bookAddedBy}> Diadem</Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.iconContainer}>
              {/* <FontAwesome name="book" size={18} color="#3a4155" /> */}
              <Text style={styles.undoText}>Undo Join</Text>
            </View>
          </TouchableOpacity>
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
        {/* <View style={styles.center}>
          <Text style={styles.title}> Feeds </Text>
          <Button
            title="Go to Details"
            onPress={() => {
              this.props.navigation.navigate('Details');
            }}
          />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: 10,
    //paddingTop: 5,
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
    height: WIDTH / 1.3,
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
  addedByView: {
    flexDirection: 'row',
  },
  addedByText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
  },
  bookAddedBy: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: '#444444',
    textAlign: 'center',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  iconContainer: {
    borderRadius: 5,
    borderColor: '#00a2cc',
    borderWidth: 1.5,
    padding: 5,
    marginVertical: 7,
  },
  undoText: {
    fontFamily: 'Nunito-Italic',
    fontSize: 11,
  },
});
