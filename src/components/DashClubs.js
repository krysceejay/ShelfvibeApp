import React from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Image } from 'react-native';
import Config from 'react-native-config';
import {stringToHslColor} from '../utils/theme';

const imgURL = Config.IMAGE_URL;

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
                    uri: `${imgURL}/club/${item.image}`,
                  }}
                  style={{width: '100%', height: 120, resizeMode: 'cover'}}
                />
              <View style={styles.textContainer}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.bookTitle}>{item.name}</Text>
              <Text style={styles.members} numberOfLines={1} ellipsizeMode="tail">
              {item.members.length} member(s)
              </Text>
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
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No club yet</Text>
        )}
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
    clubNoImage:{
      height: 120,
    width: '100%',
    resizeMode: 'cover',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    initial: {
      fontFamily: 'Nunito-SemiBold',
      fontSize: 14,
      color: '#fff',
      textTransform: 'uppercase'
    },
})
