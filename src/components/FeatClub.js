import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Config from 'react-native-config';

const imgURL = Config.IMAGE_URL;

const FeatClub = ({data, navigation}) => {
  const {colors} = useTheme();
    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
            navigation.navigate('Details', {
              clubId: item.id
              });
            }}
            style={{
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
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.bookTitle, {color: colors.text}]}>{item.name}</Text>
              <Text style={[styles.members, {color: colors.text}]} numberOfLines={1} ellipsizeMode="tail">
              {item.members.length} {item.members.length > 1 ? 'members' : 'member'}
              </Text>
            </View>
            
          </TouchableOpacity>
        );
      };

    return (
        <View style={styles.container}>
            <View style={styles.featuredHead}>
              <Text style={[styles.listTitle, {color: colors.text}]}>Top Clubs</Text>
              {data.length > 1 &&
                <TouchableOpacity activeOpacity={0.6} onPress={() => {
                    navigation.navigate('Club');
                  }}>
                <Text style={[styles.seeAll, {color: colors.text}]}>See all</Text>
                </TouchableOpacity>
              }
            </View>
            
        <FlatList
        data={data}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={_renderItem}
          contentContainerStyle={{paddingLeft: 12}}
          ListEmptyComponent={() => (
            <View style={{ paddingBottom: 30}}>
          <Text style={styles.emptyText}>No club</Text>
          </View>
        )}
        />
        </View>
    )
}

export default FeatClub;

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
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
      fontSize: 13
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
      color: '#bbb'
    },
    listTitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        letterSpacing: 1
      },
      seeAll: {
        fontSize: 15,
        fontFamily: 'Nunito-Regular',
        textAlign: 'center'
      },
      featuredHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 12,
        marginBottom: 15,
        overflow: 'hidden'
      },
})
