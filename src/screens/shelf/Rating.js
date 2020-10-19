import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import StarGroup from '../../components/StarGroup';
import ProgressBar from '../../components/ProgressBar';
import BorderButton from '../../components/BorderButton';
import RatingStarGroup from '../../components/RatingStarGroup';

const Rating = ({route, navigation}) => {
  const {data, item} = route.params;
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
        ListHeaderComponent={
          <View>
            <View style={styles.ratingView}>
              <View style={styles.ratingStats}>
                <View style={styles.ratingNumStar}>
                  <Text style={styles.ratingBigNum}>4.5</Text>

                  <StarGroup rating={data.ratingActual} />

                  <Text style={styles.ratingSmallNum}>{data.numberOfRev}</Text>
                </View>
                <View style={styles.ratingMetrics}>
                  <Text style={styles.ratingMetricsSingleText}>5</Text>

                  <Text style={styles.ratingMetricsSingleText}>4</Text>
                  <Text style={styles.ratingMetricsSingleText}>3</Text>
                  <Text style={styles.ratingMetricsSingleText}>2</Text>
                  <Text style={styles.ratingMetricsSingleText}>1</Text>
                </View>
              </View>
              <View style={styles.ratingProgress}>
                <ProgressBar percent={100} />
                <ProgressBar percent={80} />
                <ProgressBar percent={60} />
                <ProgressBar percent={40} />
                <ProgressBar percent={20} />
              </View>
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
                  numberOfLines={3}
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
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.submit}>
                  <Text style={styles.submitText}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.reviewTitle}>Reviews</Text>
          </View>
        }
        data={item.ratings}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => <Text>No review yet</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>

    // <ScrollView
    //   showsVerticalScrollIndicator={false}
    //   style={{backgroundColor: '#fff'}}>
    //   <View style={styles.container}>

    //     <View style={styles.reviewView}>
    //       <Text style={styles.reviewTitle}>Reviews</Text>

    //       {/* <FlatList
    //       ListHeaderComponent={

    //       }
    //         data={item.ratings}
    //         renderItem={_renderItem}
    //         keyExtractor={(item, index) => index.toString()}
    //         ListEmptyComponent={() => <Text>No review yet</Text>}
    //         showsVerticalScrollIndicator={false}
    //       /> */}

    //       {/* <TouchableOpacity onPress={() => {}}>
    //           <View style={styles.viewAll}>
    //             <Text style={styles.viewAllText}>View All</Text>
    //           </View>
    //         </TouchableOpacity> */}
    //       <BorderButton
    //         onpress={() => {
    //           this.props.navigation.navigate('All Ratings');
    //         }}
    //         text="View All"
    //       />
    //     </View>
    //   </View>
    // </ScrollView>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,

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
    marginVertical: 10,
  },
  item: {
    //flex: 1,
    marginVertical: 20,
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
    marginVertical: 30,
  },
  submit: {
    backgroundColor: '#242c42',
    width: '30%',
    marginTop: 15,
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
