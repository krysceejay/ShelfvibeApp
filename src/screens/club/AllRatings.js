import React from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import StarGroup from '../../components/StarGroup';

const numColumns = 1;

const AllRatings = ({route}) => {
  const {rating} = route.params;

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <View style={styles.reviewTop}>
          <StarGroup rating={item.rating.toString()} />
          <Text style={styles.reviewDate}>{item.updatedAt}</Text>
        </View>
        <View>
          <Text style={styles.reviewText}>{item.comment}</Text>
        </View>
        <Text style={styles.reviewUser}>By {item.user.username}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rating}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        contentContainerStyle={{paddingVertical: 15}}
        //showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AllRatings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    //marginVertical: 15,
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
    marginVertical: 5,
    padding: 15,
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
});
