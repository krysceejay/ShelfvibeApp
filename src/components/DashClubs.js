import React from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Image } from 'react-native';

const DashClubs = ({data}) => {
    _renderItem = ({item, index}) => {
        return (
            <View
            style={{
              backgroundColor: '#fafafa',
              //paddingBottom: 10,
              width: 150,
              //height: 200,
              marginRight: 12,
            borderRadius: 5,
            overflow: 'hidden',
            marginBottom: 15,
            }}>
            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1533292362155-d79af6b08b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
              }}
              style={{width: '100%', height: 120, resizeMode: 'cover'}}
            />
            <View style={styles.textContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.bookTitle}>Think Big</Text>
            <Text style={styles.members} numberOfLines={1} ellipsizeMode="tail">16 members</Text>
            </View>
            
          </View>
        );
      };

    return (
        <View style={styles.container}>
        <FlatList
        data={data}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={_renderItem}
          contentContainerStyle={{paddingLeft: 12}}
        />
        </View>
    )
}

export default DashClubs;

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    textContainer: {
        padding: 10,
        //height: 50
    },
    bookTitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: 13,
    },
    readingMonth: {
        fontFamily: 'Nunito-Regular',
        fontSize: 11,
    },
    members: {
      fontFamily: 'Nunito-Regular',
      fontSize: 13,
      color: '#444444',
    },
})
