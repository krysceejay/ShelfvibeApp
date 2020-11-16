import React from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList, Image } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

const FeaturedBooks = ({navigation}) => {
    _renderItem = ({item, index}) => {
        return (
          <TouchableOpacity activeOpacity={0.6} onPress={() => {
            navigation.navigate('Details')
            }}>
            <Animatable.View
            duration={700}
            delay={400 + index * 100}
            animation={zoomIn}
            style={{
              //backgroundColor: 'red',
              paddingBottom: 10,
              width: 120,
              height: 240,
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
              style={{width: '100%', height: '80%', resizeMode: 'cover', borderRadius: 5,}}
            />
            <View style={styles.textContainer}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bookTitle}>Think Big</Text>
            </View>
          </Animatable.View>
          </TouchableOpacity>
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
          contentContainerStyle={{paddingLeft: 12}}
        />
        </View>
    )
}

export default FeaturedBooks;

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    textContainer: {
        padding: 5,
        height: '20%'
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
