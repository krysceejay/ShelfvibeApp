import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';

const imgURL = Config.IMAGE_URL;

const Bookstore = ({navigation, data}) => {
    _renderItem = ({item, index}) => {
        return (
          <TouchableOpacity activeOpacity={0.6} onPress={() => {
              navigation.navigate('Details',{
                item
              })
            }}>
            <View
            style={{
              //backgroundColor: 'red',
              padding: 0,
              width: 60,
              height: 60,
              marginRight: 12,
             borderRadius: 30,
             overflow: 'hidden',
            //marginHorizontal: 10,
            }}>
            <Image
             source={{uri: `${imgURL}/featured/${item.displayimg}`}}
             style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            />
          </View>
          </TouchableOpacity>
        );
      };

    return (
        <View style={styles.container}>
        <FlatList
        data={data}
          keyExtractor={item => String(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={_renderItem}
          contentContainerStyle={{paddingLeft: 12}}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No store found</Text>
        )}
        />
        </View>
    )
}

export default Bookstore;

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
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
    },
    emptyText: {
      fontFamily: 'Nunito-Regular',
      fontSize: 15,
    },
})
