import React from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import * as Animatable from 'react-native-animatable';
import Config from 'react-native-config';
import { useTheme } from '@react-navigation/native';

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

const ReadingList = ({ bookLists}) => {
  const {dark, colors} = useTheme();
    _renderItem = ({item, index}) => {
        return (
            <Animatable.View
            duration={700}
            delay={400 + index * 100}
            animation={zoomIn}
            style={{
              paddingBottom: 10,
              width: 110,
              marginRight: 12,
            borderRadius: 12,
            overflow: 'hidden',
            }}>
            <Image
                source={{
                  uri: `${imgURL}/bookcover/${item.bookcover}`,
                }}
                style={{width: '100%', height: 165, resizeMode: 'cover', borderRadius: 12,}}
              />
            <View style={styles.textContainer}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.bookTitle, {color: colors.text}]}>{item.title}</Text>
              {item.current && <Text style={[styles.readingMonth, {color: dark ? '#90ee90' : '#155724'}]}>Current Book</Text>}
            
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
            <Text style={[styles.emptyText, {color: colors.text}]}>No book found</Text>
        )}
        />
        </View>
    )
}

export default ReadingList;

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    textContainer: {
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
