import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';

const imgURL = Config.IMAGE_URL;

const Bookstore = ({navigation, data}) => {
    _renderItem = ({item, index}) => {
        return (
          <TouchableOpacity activeOpacity={0.6} onPress={() => {
              navigation.navigate('Detail',{
                item
              })
            }}>
            <View
            style={{
              //backgroundColor: 'red',
              padding: 0,
              marginRight: 12,
             overflow: 'hidden',
            //marginHorizontal: 10,
            }}>
            <Image
             source={{uri: `${imgURL}/featured/${item.displayimg}`}}
             style={{width: 150, height: 100, resizeMode: 'cover', borderRadius: 5}}
            />
          </View>
          <Text style={styles.featName} numberOfLines={1}>{item.name}</Text>
          </TouchableOpacity>
        );
      };

    return (
        <View style={styles.container}>
          <Text style={styles.listTitle}>Features</Text>
          <FlatList
          data={data}
           keyExtractor={(item, index) => index.toString()}
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
        //marginVertical: 15,
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
    listTitle: {
      fontFamily: 'Nunito-Bold',
      fontSize: 18,
      letterSpacing: 1,
      marginHorizontal: 12,
      marginBottom: 15,
    },
    featName: {
      width: 150, 
      marginTop: 5,
      fontFamily: 'Nunito-SemiBold',
      fontSize: 15,
    }
})
