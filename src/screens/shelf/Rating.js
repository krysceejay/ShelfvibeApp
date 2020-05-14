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
  ScrollView,
  TextInput,
} from 'react-native';
import StarGroup from '../../components/StarGroup';
import ProgressBar from '../../components/ProgressBar';
import BorderButton from '../../components/BorderButton';
import RatingStarGroup from '../../components/RatingStarGroup';

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
const numColumns = 1;
const WIDTH = Dimensions.get('window').width;

export default class Shelf extends Component {
  _renderItem = ({item, index}) => {
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#fff'}}>
        <View style={styles.container}>
          <View style={styles.ratingView}>
            <View style={styles.ratingStats}>
              <View style={styles.ratingNumStar}>
                <Text style={styles.ratingBigNum}>4.5</Text>

                <StarGroup />

                <Text style={styles.ratingSmallNum}>400</Text>
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
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.submit}>
                <Text style={styles.submitText}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.reviewView}>
            <Text style={styles.reviewTitle}>Reviews</Text>

            <View style={styles.item}>
              <View style={styles.reviewTop}>
                <StarGroup />
                <Text style={styles.reviewDate}>10/05/2020</Text>
              </View>
              <View>
                <Text style={styles.reviewText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in.
                </Text>
              </View>
              <Text style={styles.reviewUser}>By StayAlive</Text>
            </View>
            <View style={styles.item}>
              <View style={styles.reviewTop}>
                <StarGroup />
                <Text style={styles.reviewDate}>10/05/2020</Text>
              </View>
              <View>
                <Text style={styles.reviewText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                </Text>
              </View>
              <Text style={styles.reviewUser}>By StayAlive</Text>
            </View>
            <View style={styles.item}>
              <View style={styles.reviewTop}>
                <StarGroup />
                <Text style={styles.reviewDate}>10/05/2020</Text>
              </View>
              <View>
                <Text style={styles.reviewText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </Text>
              </View>
              <Text style={styles.reviewUser}>By StayAlive</Text>
            </View>

            {/* <TouchableOpacity onPress={() => {}}>
              <View style={styles.viewAll}>
                <Text style={styles.viewAllText}>View All</Text>
              </View>
            </TouchableOpacity> */}
            <BorderButton onpress={() => {}} text="View All" />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
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
