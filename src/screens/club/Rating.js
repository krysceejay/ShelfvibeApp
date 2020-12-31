import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  
} from 'react-native';
import StarGroup from '../../components/StarGroup';
import ProgressBar from '../../components/ProgressBar';
import BorderButton from '../../components/BorderButton';

const Rating = ({ navigation, ratings}) => {
  
  let totalRatings = 0;

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

  sumRatings = item => {
    totalRatings += parseInt(item.rating);
  };
  ratings.forEach(sumRatings);

  calRating = () => {
    let actualRating;
    if (ratings.length == 0) {
      actualRating = '0.0';
    } else {
      actualRating = (totalRatings / ratings.length).toFixed(1);
    }
    return actualRating;
  };

  const data = {ratingActual: calRating()};

  ratingPercent = rate => {
    let convertToPercent;
    if (ratings.map(getRatings).length == 0) {
      convertToPercent = 0;
    } else {
      convertToPercent =
        (countOccurrences(ratings.map(getRatings), rate) /
        ratings.length) *
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

                  <Text style={styles.ratingSmallNum}>{ratings.length}</Text>
                </View>
                <View style={styles.ratingMetrics}>{progressNum}</View>
              </View>
              <View style={styles.ratingProgress}>{progress}</View>
            </View>
            <Text style={styles.reviewTitle}>Reviews</Text>
          </View>
        }
        data={ratings.slice(0, 5)}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.reviewText}>No review yet</Text>
        )}
        contentContainerStyle={{marginVertical: 10}}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          ratings.length > 5 && (
            <BorderButton
              onpress={() => {
                navigation.navigate('All Ratings', {
                  rating: ratings,
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

const mapStateToProps = state => ({
  ratings: state.rate.ratings
});

export default connect(
  mapStateToProps,
  null,
)(Rating);

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
  
  
});
