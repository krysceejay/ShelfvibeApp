import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Bookstore from '../components/Bookstore';

const dataList = [
    {key: 1},
    {key: 2},
    {key: 3},
    {key: 4},
  ];

const HomeP = ({navigation}) => {
    const renderItem = ({item}) => {
        return(
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
                style={styles.avatar}
                source={require('../assets/img/avatar.jpg')}
                size={50}
              />
            <View style={{marginLeft: 15, width: '60%',}}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.clubname}>Club name {item.key}</Text>
              <Text style={[styles.caption, {color: '#155724'}]}>16 members</Text>
            </View>
          </View>
          <View style={[styles.publicContainer, {backgroundColor: '#d4edda'}]}>
            <Text style={styles.public}>Private</Text>
          </View>
        </View>
        )
      }

    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.bookCoverContain}>
                <Image
                style={styles.bookCover}
                source={require('../assets/img/logodark.png')}
            />
          </View> */}
            <FlatList
            ListHeaderComponent={() => (
            <View>
              <View style={styles.topView}>
                  <View style={styles.welcome}>
                      <View style={styles.bookCoverContain}>
                          <Image
                          style={styles.bookCover}
                          source={require('../assets/img/logodark.png')}
                          />
                      </View>
                      {/* <Text style={styles.textPrimary}>Hello!</Text> */}
                      <Text style={styles.leading}>Talk about it if it's so interesting!!</Text>
                  </View>
              <View style={styles.bookStoreAndfeat}>
                  <Text style={styles.listTitle}>Bookstores</Text>
                  {/* <TouchableOpacity activeOpacity={0.9} style={styles.seeFeatBooks} onPress={() => {
                    navigation.navigate('FeaturedBooks')
                  }}>
                    <View style={styles.iconContainer}>
                      <FontAwesome name="book" size={16} color="#fff" />
                    </View>
                    <Text style={styles.featText}>Featured books</Text>
                  </TouchableOpacity> */}
              </View>
                  <Bookstore navigation={navigation} />
              </View>
              <View style={styles.bottomView}>
                  <View style={styles.feat}>
                  <Text style={styles.listTitle}>Featured Clubs</Text>
                  </View>
              </View>
            </View>
            
            )}
            data={dataList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                <Text style={styles.emptyText}>No club yet</Text>
            )}
            contentContainerStyle={{paddingBottom: 10}}
            />
            {/* <View style={styles.bottomView}>
                <View style={styles.feat}>
                <Text style={styles.listTitle}>Featured Clubs</Text>
                </View>
                <FeaturedClubs />
            </View> */}
        </SafeAreaView>
    )
}

export default HomeP;

const styles = StyleSheet.create({
    container: {
     flex: 1,
     backgroundColor: '#fff',
    },
    welcome: {
     marginTop: 10,
     marginHorizontal: 12,
    },
    textPrimary: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 30,
    },
    leading: {
        fontFamily: 'Nunito-Regular',
        fontSize: 15,
        color: '#444'
    },
    bookCoverContain: {
        //flex: 1,
        width: '45%',
        height: 45,
        //backgroundColor: 'rgba(0,0,0,0.3)'
      },
    bookCover: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        resizeMode: 'contain',
      },
      feat: {
        marginHorizontal: 12,
        marginTop: 20,
        marginBottom: 5
      },
      listTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 17,
        letterSpacing: 1,
      },
      bottomView: {
          backgroundColor: '#fff'
      },
      topView: {
          backgroundColor: '#fafafa'
      },
      userInfoSection: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        width: '100%',
        height: 60,
        paddingHorizontal: 12,
      },
      avatar: {
        height: 60,
        width: 60,
        borderRadius: 10,
      },
      clubname: {
        fontSize: 16,
        marginVertical: 3,
        fontFamily: 'Nunito-SemiBold',
      },
      caption: {
        fontSize: 13,
        lineHeight: 15,
        fontFamily: 'Nunito-Light',
      },
      public: {
        fontFamily: 'Nunito-Regular',
        fontSize: 14,
      },
      emptyText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 15,
        paddingHorizontal: 12,
      },
      publicContainer: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20
      },
      seeFeatBooks: {
        backgroundColor: '#00a2cc',
        padding: 4,
        paddingRight: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
      },
      bookStoreAndfeat: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 12,
        marginTop: 20,
        //marginBottom: 5
      },
      iconContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        //padding: 5,
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 3
      },
      featText: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 13,
        color: "#fff"
      },
})
