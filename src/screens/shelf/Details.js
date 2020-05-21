import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StarGroup from '../../components/StarGroup';
import Topics from '../../components/Topics';

export default class Details extends Component {
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#fff'}}>
        <View style={styles.container}>
          <View style={styles.bookCoverContain}>
            <Image
              style={styles.bookCover}
              source={require('../../assets/img/Leanin.jpg')}
            />
          </View>
          <View style={styles.bookDetails}>
            <Text style={styles.bookTitle}>Lean In</Text>
            <Text style={styles.bookAuthor}>Sheryl Sandberg</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.otherDetails}>
            <View style={styles.otherTopDetails}>
              <View style={styles.bookGenreView}>
                <Text style={styles.topDetailsTitle}>Genre</Text>
                <Text style={styles.bookGenre}>
                  Biography, Adventure, Romance
                </Text>
              </View>
              <View style={styles.bookStarRatingView}>
                <Text style={styles.topDetailsTitle}>Stars</Text>
                <StarGroup />
                <View style={styles.starText}>
                  <Text style={styles.starRateText}>4.5 of </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Rating');
                    }}>
                    <View style={styles.iconContainer}>
                      <Text style={styles.ratingText}>400 rating(s)</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.bookMeetingView}>
              <Text style={styles.topDetailsTitle}>Meeting Details</Text>
              <View style={styles.detailsGroupView}>
                <View style={styles.detailsGroup}>
                  <FontAwesome name="calendar" size={18} color="#f53ba3" />
                  <Text style={styles.detailsText}>Sat, 26 Jun 2019</Text>
                </View>
                <View style={styles.detailsGroup}>
                  <FontAwesome name="clock-o" size={18} color="#f53ba3" />
                  <Text style={styles.detailsText}>10 am GMT</Text>
                </View>
              </View>
            </View>

            <View>
              <Topics />
            </View>

            <View style={styles.joinDiscussionView}>
              <Text style={styles.joinDiscussionHead}>Join The Discussion</Text>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.chatBtn}>
                  <FontAwesome name="comment-o" size={16} color="#f53ba3" />
                  <Text style={styles.chatBtnText}>Chat</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.descriptionHead}>Description</Text>
              <Text style={styles.descriptionBody}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laboru.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginVertical: 20,
    //backgroundColor: '#fff',
  },

  bookCoverContain: {
    //flex: 1,
    //backgroundColor: 'red',
    //paddingHorizontal: 20,
    //flex: 1,
    width: '100%',
    height: 300,
    //borderRadius: 15,

    //alignSelf: 'center',
  },
  bookCover: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    //borderRadius: 5,
    //borderTopLeftRadius: 5,
    //borderWidth: 5,
    //borderColor: 'green',
  },
  bookDetails: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  bookTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  bookAuthor: {
    fontFamily: 'Nunito-Light',
    fontSize: 15,
    color: '#444444',
    textAlign: 'center',
  },
  horizontalLine: {
    marginVertical: 8,
    marginHorizontal: 20,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  otherDetails: {
    paddingHorizontal: 20,
  },
  otherTopDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  topDetailsTitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#444444',
  },
  bookGenreView: {
    flex: 1,
    //backgroundColor: 'purple',
    alignItems: 'center',
  },
  bookGenre: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    textAlign: 'center',
    //color: '#444444',
  },

  bookStarRatingView: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'green',
  },

  bookMeetingView: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'flex-end',
    //backgroundColor: 'red',
    //paddingHorizontal: 5,
  },

  descriptionHead: {
    fontFamily: 'Nunito-SemiBoldItalic',
    fontSize: 18,
    color: '#444444',
    marginVertical: 10,
  },
  descriptionBody: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    lineHeight: 23,
  },
  iconContainer: {
    borderRadius: 10,
    borderColor: '#f53ba3',
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
    //marginVertical: 7,
  },
  ratingText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 11,
  },
  starText: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  starRateText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 13,
  },
  detailsGroupView: {
    flexDirection: 'row',
    //justifyContent: 'space-around',
  },
  detailsGroup: {
    flexDirection: 'row',
    marginVertical: 5,
    marginRight: 15,
  },
  detailsText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    marginLeft: 5,
  },
  joinDiscussionView: {
    backgroundColor: '#fff7fb',
    borderRadius: 5,
    borderColor: '#ffe2f2',
    borderWidth: 1,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinDiscussionHead: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  chatBtn: {
    flexDirection: 'row',
    borderRadius: 5,
    borderColor: '#f53ba3',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatBtnText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    marginLeft: 5,
  },
});
