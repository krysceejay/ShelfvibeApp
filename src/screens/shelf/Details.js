import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, ScrollView} from 'react-native';

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
              source={require('../../assets/img/playbigger.jpg')}
            />
          </View>
          <View style={styles.bookDetails}>
            <Text style={styles.bookTitle}>Lean In</Text>
            <Text style={styles.bookAuthor}>Sheryl Sandberg</Text>
          </View>
          <View style={styles.bottomDrawerSection} />
          <View style={styles.otherDetails}>
            <View style={styles.otherTopDetails}>
              <Text style={styles.bookGenre}>Biography, Adventure</Text>
              <Text style={styles.bookStarRating}>Stars</Text>
              <Text style={styles.bookMeeting}>Meeting Details</Text>
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
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
    borderRadius: 5,
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
  bottomDrawerSection: {
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
    justifyContent: 'space-around',
    marginVertical: 15,
  },

  bookGenre: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: '#444444',
    //backgroundColor: 'red',
  },
  bookStarRating: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: '#444444',
    //backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  bookMeeting: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: '#444444',
    //backgroundColor: 'yellow',
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
});
