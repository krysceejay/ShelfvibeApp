import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList, Dimensions} from 'react-native';
import StarGroup from './StarGroup';

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
const WIDTH = Dimensions.get('window').width;

export default class AllRatings extends Component {
  _renderItem = () => {
    return (
      <View style={styles.item}>
        <View style={styles.reviewTop}>
          <StarGroup />
          <Text style={styles.reviewDate}>10/05/2020</Text>
        </View>
        <View>
          <Text style={styles.reviewText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in.
          </Text>
        </View>
        <Text style={styles.reviewUser}>By StayAlive</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.descriptionHead}>Topics</Text>
        <FlatList
          data={dataList}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          //showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    //paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  reviewTitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    //marginHorizontal: 20,
    marginVertical: 10,
  },
  item: {
    //flex: 1,
    marginVertical: 10,
    padding: 15,
    width: WIDTH - 40,
    marginRight: 20,

    backgroundColor: '#f4f4f4',
    borderRadius: 5,
  },
  reviewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  reviewDate: {
    fontFamily: 'Nunito-Italic',
    fontSize: 14,
  },
  reviewText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    lineHeight: 24,
  },
  reviewUser: {
    textAlign: 'right',
    fontFamily: 'Nunito-Italic',
    fontSize: 12,
    marginTop: 5,
  },
  descriptionHead: {
    fontFamily: 'Nunito-SemiBoldItalic',
    fontSize: 18,
    color: '#444444',
    marginVertical: 10,
  },
});
