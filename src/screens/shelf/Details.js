import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Config from 'react-native-config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import StarGroup from '../../components/StarGroup';
import Topics from '../../components/Topics';
import HtmlReader from '../../components/HtmlReader';

const Details = ({route, navigation}) => {
  const {item} = route.params;
  //const imgURL = Config.IMAGE_URL;
  const imgURL = 'http://127.0.0.1:4000/images/bookcover/';

  const formatGenre = (item, index, arr) => {
    let genre;
    if (index == arr.length - 1) {
      genre = item;
    } else {
      genre = item + ', ';
    }
    return genre;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.bookCoverContain}>
          <Image
            source={{
              uri: `${imgURL + item.bookcover}`,
            }}
            style={styles.bookCover}
          />
        </View>
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookAuthor}>{item.author}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.otherDetails}>
          <View style={styles.otherTopDetails}>
            <View style={styles.bookGenreView}>
              <Text style={styles.topDetailsTitle}>Genre</Text>
              <Text style={styles.bookGenre}>
                {item.genre.map(formatGenre)}
              </Text>
            </View>
            <View style={styles.bookStarRatingView}>
              <Text style={styles.topDetailsTitle}>Stars</Text>
              <View style={styles.starText}>
                <StarGroup />
              </View>
              <View style={styles.starText}>
                <Text style={styles.starRateText}>4.5 of </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Rating');
                  }}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.ratingText}>400 rating(s)</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.bookMeetingView}>
            {/* <Text style={styles.topDetailsTitle}>Meeting Details</Text> */}
            <View style={styles.detailsGroupView}>
              <View style={styles.detailsGroup}>
                <MaterialCommunityIcons
                  name="cards-club"
                  size={20}
                  color="#373435"
                />
                {item.public ? (
                  <View style={styles.detailsTextPublic}>
                    <Text>public</Text>
                  </View>
                ) : (
                  <View style={styles.detailsTextPrivate}>
                    <Text>private</Text>
                  </View>
                )}
              </View>
              {/* <View style={styles.detailsGroup}>
                <FontAwesome name="clock-o" size={18} color="#373435" />
                <Text style={styles.detailsText}>10 am GMT</Text>
              </View> */}
            </View>
          </View>

          <View>
            <Topics />
          </View>

          <View style={styles.joinDiscussionView}>
            <Text style={styles.joinDiscussionHead}>Join The Discussion</Text>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.chatBtn}>
                <FontAwesome name="comment-o" size={16} color="#00a2cc" />
                <Text style={styles.chatBtnText}>Chat</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.descriptionHead}>Description</Text>
            <HtmlReader html={item.description} />
            {/* <Text style={styles.descriptionBody}>{item.description}</Text> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default connect(
  null,
  null,
)(Details);

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
    paddingHorizontal: 15,
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
    //alignItems: 'center',
  },
  bookGenre: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    //textAlign: 'center',
    //color: '#444444',
  },

  bookStarRatingView: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: 'green',
    paddingLeft: 20,
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
    borderColor: '#00a2cc',
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 3,
    //marginVertical: 7,
  },
  ratingText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 11,
  },
  starText: {
    flexDirection: 'row',
    marginVertical: 4,
    width: '70%',
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
  detailsTextPublic: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    marginLeft: 5,
    borderRadius: 5,
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: 4,
  },
  detailsTextPrivate: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    marginLeft: 5,
    borderRadius: 5,
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: 4,
  },
  joinDiscussionView: {
    backgroundColor: '#e6f6fa',
    borderRadius: 5,
    borderColor: '#ccecf5',
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
    borderColor: '#00a2cc',
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
