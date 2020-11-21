import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import StarGroup from '../../components/StarGroup';
import ProgressBar from '../../components/ProgressBar';
import BorderButton from '../../components/BorderButton';
import RatingStarGroup from '../../components/RatingStarGroup';

const Rating = ({route, navigation}) => {
  const {data, item} = route.params;
  let progress = [];
  let progressNum = [];
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

  ratingPercent = rate => {
    let convertToPercent;
    if (item.rates.map(getRatings).length == 0) {
      convertToPercent = 0;
    } else {
      convertToPercent =
        (countOccurrences(item.rates.map(getRatings), rate) /
          data.numberOfRev) *
        100;
    }
    return convertToPercent;
  };

  getRatings = item => {
    return item.rating;
  };

  const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  for (let i = 5; i > 0; i--) {
    progress.push(<ProgressBar percent={ratingPercent(i)} key={i} />);
  progressNum.push(<Text key={i} style={styles.ratingMetricsSingleText}>{i}</Text>);
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <View style={styles.ratingView}>
              <View style={styles.ratingStats}>
                <View style={styles.ratingNumStar}>
                  <Text style={styles.ratingBigNum}>{data.ratingActual}</Text>

                  <StarGroup rating={data.ratingActual} />

                  <Text style={styles.ratingSmallNum}>{data.numberOfRev}</Text>
                </View>
                <View style={styles.ratingMetrics}>{progressNum}</View>
              </View>
              <View style={styles.ratingProgress}>{progress}</View>
            </View>
            <View style={styles.ratingActionView}>
              <View style={{alignSelf: 'center', marginVertical: 15}}>
                <RatingStarGroup />
              </View>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderColor: '#ccc',
                  borderWidth: 2,
                }}>
                <TextInput
                  multiline
                  numberOfLines={2}
                  editable
                  placeholder="Review comment"
                  //maxLength={40}
                  style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    fontSize: 15,
                    color: '#333',
                  }}
                />
              </View>
              <View style={{alignItems: 'flex-start'}}>
                <TouchableOpacity onPress={() => {}}>
                  <View style={styles.submit}>
                    <Text style={styles.submitText}>Submit</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.reviewTitle}>Reviews</Text>
          </View>
        }
        data={item.rates.slice(0, 3)}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.reviewText}>No review yet</Text>
        )}
        contentContainerStyle={{marginVertical: 10}}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          item.rates.length > 3 && (
            <BorderButton
              onpress={() => {
                navigation.navigate('All Ratings', {
                  rating: item.rates,
                });
              }}
              text="View All"
            />
          )
        }
        ListFooterComponentStyle={{
          paddingVertical: 15,
        }}
      />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,

    //paddingHorizontal: 10,
    //paddingTop: 5,
    //paddingVertical: 15,
  },
  ratingView: {
    flexDirection: 'row',
  },
  ratingStats: {
    flex: 2,
    flexDirection: 'row',
    //backgroundColor: 'green',
    justifyContent: 'space-between',
  },
  ratingNumStar: {
    flex: 2,
    //backgroundColor: 'red',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBigNum: {
    fontFamily: 'Nunito-Bold',
    fontSize: 35,
    marginVertical: 6,
  },

  ratingSmallNum: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    marginVertical: 6,
  },
  ratingMetrics: {
    flex: 1,
    //paddingHorizontal: 8,
    //backgroundColor: 'yellow',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ratingMetricsSingle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  ratingMetricsSingleText: {
    //marginRight: 10,
    fontFamily: 'Nunito-Regular',
  },
  ratingProgress: {
    flex: 3,
    //backgroundColor: 'orange',
    justifyContent: 'space-around',
  },
  reviewTitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    //marginHorizontal: 20,
    marginVertical: 5,
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
  ratingActionView: {
    //flexDirection: 'column',
    marginBottom: 20,
    //alignItems: 'flex-start',
  },
  submit: {
    backgroundColor: '#242c42',
    width: 100,
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
  },
  submitText: {
    color: '#fff',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});
