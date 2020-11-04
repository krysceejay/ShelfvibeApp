import React from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList, Image } from 'react-native'
import * as Animatable from 'react-native-animatable';

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

const ReadingList = () => {
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
              height: 260,
              marginRight: 12,
            borderRadius: 12,
            overflow: 'visible',
            //marginHorizontal: 10,
            }}>
            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1533292362155-d79af6b08b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
              }}
              style={{width: '100%', height: '80%', resizeMode: 'cover', borderRadius: 12,}}
            />
            <View style={styles.textContainer}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bookTitle}>Activity Activity Activity Activity Activity Activity #{item + 1}</Text>
            <Text style={styles.readingMonth}>Current Book</Text>
            </View>
            
          </Animatable.View>
        );
      };

    return (
        <View style={styles.container}>
        <FlatList
        data={[...Array(8).keys()]}
          keyExtractor={item => String(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={_renderItem}
          contentContainerStyle={{paddingHorizontal: 12}}
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
        height: '20%',
        marginTop: 3,
        paddingHorizontal: 10,
    },
    bookTitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: 13,
    },
    readingMonth: {
        fontFamily: 'Nunito-Regular',
        fontSize: 11,
    }
})
