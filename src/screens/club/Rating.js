import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarGroup from '../../components/StarGroup';
import ProgressBar from '../../components/ProgressBar';
import BorderButton from '../../components/BorderButton';

const Rating = ({ navigation, ratings}) => {

  const {dark, colors} = useTheme();

  let totalRatings = 0;
  let progress = [];
  let progressNum = [];

  _renderItem = ({item, index}) => {
    return (
      <View style={[styles.item, {backgroundColor: colors.card}]}>
        <View style={styles.reviewTop}>
          <StarGroup rating={item.rating.toString()} />
          <Text style={[styles.reviewDate, {color: colors.text}]}>{item.updatedAt}</Text>
        </View>
        <View>
          <Text style={[styles.reviewText, {color: colors.text}]}>{item.comment}</Text>
        </View>
        <Text style={[styles.reviewUser, {color: colors.text}]}>By {item.user.username}</Text>
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

  getProgress = (prog) => {
    for (let i = 5; i > 0; i--) {
      prog.push(<ProgressBar percent={ratingPercent(i)} key={i} />);
    }
    return prog;
  }

  getProgressNum = (num) => {
    for (let i = 5; i > 0; i--) {
      num.push(<Text key={i} style={[styles.ratingMetricsSingleText, {color: colors.text}]}>{i}</Text>);
    }
    return num;
  }
  
  getRatings = item => {
    return item.rating;
  };

  const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
        <View style={[styles.header, {borderBottomColor: colors.borderBottomColor}]}>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}
          style={{
            paddingHorizontal: 3,
            marginRight: 38
          }}
            activeOpacity={0.9}>
            <AntDesign
              name="left"
              size={28}
              color={colors.icon}
              />
          </TouchableOpacity>
          <Text style={[styles.headerText, {color: colors.text}]}>Rating</Text>
        </View>
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <View style={styles.ratingView}>
              <View style={styles.ratingStats}>
                <View style={styles.ratingNumStar}>
                  <Text style={[styles.ratingBigNum, {color: colors.text}]}>{data.ratingActual}</Text>

                  <StarGroup rating={data.ratingActual} />

                  <Text style={[styles.ratingSmallNum, {color: colors.text}]}>{ratings.length}</Text>
                </View>
                <View style={styles.ratingMetrics}>{getProgressNum(progressNum)}</View>
              </View>
              <View style={styles.ratingProgress}>{getProgress(progress)}</View>
            </View>
            <Text style={[styles.reviewTitle, {color: colors.text}]}>Reviews</Text>
          </View>
        }
        data={ratings.slice(0, 5)}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <Text style={[styles.reviewText, {color: colors.text}]}>No review yet</Text>
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
    </SafeAreaView>
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
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
    marginBottom: 5,
    height: 55,
    borderBottomWidth: 1
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
  headerText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
  }
  
  
});
