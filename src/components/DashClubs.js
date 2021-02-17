import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';

const imgURL = Config.IMAGE_URL;

const DashClubs = ({data, navigation}) => {
    _renderItem = ({item, index}) => {
        return (
          <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
          navigation.navigate('Details', {
            clubId: item.id
              })
            }}
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
              {item.members.length} {item.members.length > 1 ? 'members' : 'member'}
              </Text>
            </View>
            
          </TouchableOpacity>
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
            <View style={{ paddingBottom: 30}}>
          <Text style={styles.emptyText}>You don't have any club yet.</Text>
          </View>
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
    emptyText: {
      fontFamily: 'Nunito-Regular',
      fontSize: 20,
      paddingHorizontal: 12,
      marginTop: 15,
      color: '#bbb'
    },
})
