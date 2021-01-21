import React from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Bookstore = ({navigation}) => {
    _renderItem = ({item, index}) => {
        return (
          <TouchableOpacity activeOpacity={0.6} onPress={() => {
            navigation.navigate('Details')
            }}>
            <View
            style={{
              //backgroundColor: 'red',
              padding: 0,
              width: 100,
              height: 100,
              marginRight: 12,
            borderRadius: 12,
            overflow: 'hidden',
            //marginHorizontal: 10,
            }}>
            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1533292362155-d79af6b08b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
              }}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            />
          </View>
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

export default Bookstore;

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
