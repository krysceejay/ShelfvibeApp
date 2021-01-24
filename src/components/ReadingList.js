import React, {useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Config from 'react-native-config';
import {fetchClubReadList} from '../actions/bookListActions';

const zoomIn = {
    0: {
      opacity: 0,
      scale: 0,
    },
    1: {
      opacity: 1,
      scale: 1,
    },
  };
const imgURL = Config.IMAGE_URL;

const ReadingList = ({fetchClubReadList, bookLists, clubId}) => {

   useEffect(() => {
    getClubReadList(clubId);
  }, [clubId]);

  getClubReadList = async clubid => {
    await fetchClubReadList(clubid);
  };

    _renderItem = ({item, index}) => {
        return (
            <Animatable.View
            duration={700}
            delay={400 + index * 100}
            animation={zoomIn}
            style={{
              //backgroundColor: 'red',
              paddingBottom: 10,
              width: 130,
              height: 240,
              marginRight: 12,
            borderRadius: 12,
            overflow: 'visible',
            //marginHorizontal: 10,
            }}>
            <Image
                source={{
                  uri: `${imgURL}/bookcover/${item.bookcover}`,
                }}
                style={{width: '100%', height: '80%', resizeMode: 'cover', borderRadius: 12,}}
              />
            <View style={styles.textContainer}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bookTitle}>{item.title}</Text>
              {item.current && <Text style={[styles.readingMonth, {color: '#155724'}]}>Current Book</Text>}
            
            </View>
            
          </Animatable.View>
        );
      };

    return (
        <View style={styles.container}>
        <FlatList
        data={bookLists}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={_renderItem}
          contentContainerStyle={{paddingLeft: 12}}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No book found</Text>
        )}
        />
        </View>
    )
}

const mapStateToProps = state => ({
  bookLists: state.booklist.bookLists,
});

export default connect(
  mapStateToProps,
  {fetchClubReadList},
)(ReadingList);

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    textContainer: {
        height: '20%',
        marginTop: 3,
        paddingHorizontal: 10,
    },
    bookTitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: 13,
    },
    readingMonth: {
        fontFamily: 'Nunito-SemiBoldItalic',
        fontSize: 12,
    },
    emptyText: {
      fontFamily: 'Nunito-Regular',
      fontSize: 15,
      marginTop: 15
    },
})
