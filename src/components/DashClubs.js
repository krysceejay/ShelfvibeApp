import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Empty from '../components/Empty';
import BorderButton from '../components/BorderButton';

const {width} = Dimensions.get('window');
const numColumns = 1;

const dataList = [
    {key: 1},
    {key: 2},
    {key: 3},
];

const DashClubs = ({navigation}) => {

    _renderItem = ({item, index}) => {
        return (
          <View style={styles.item}>
            <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Details');
                }}
                activeOpacity={0.9}>
            
            <View style={styles.bookCoverContain}>
                <Image
                  style={styles.bookCover}
                  source={require('../assets/img/showup.jpg')}
                />
              
            </View>
            </TouchableOpacity>
            <View style={styles.bookDetails}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bookTitle}>
                Club Name Club Name
              </Text>
              <Text style={styles.members} numberOfLines={1} ellipsizeMode="tail">
                16 members
              </Text>
              
            </View>
            
          </View>
          
        );
      };

    return (
        
      <FlatList
        data={dataList}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        ListHeaderComponent={() => (
            dataList.length !== 0 &&
            <TouchableOpacity activeOpacity={0.3} style={styles.showAll} onPress={() => {
                navigation.navigate('ManageShelf');
            }}>
                <Text style={styles.showAllText}>Show all</Text>
            </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 15,
              }}>
                <Empty />
              <Text style={styles.textBody}>
                Looks like you've not started a club.
              </Text>
              <BorderButton
                  onpress={() => {
                    
                  }}
                  text="Start a Club"
                />
            </View>
          )}
      />
    
    )
}

export default DashClubs; 

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
      },
      item: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 15,
        overflow: 'hidden',
        //alignItems: 'center',
        justifyContent: 'flex-start',
        height: 100,
        borderWidth: 2,
        borderColor: '#f5f5f5',
        borderRadius: 10
      },
      bookCoverContain: {
        //borderRadius: 12,
        width: 120,
        overflow: 'hidden',
      },
      bookCover: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
      },
      bookDetails: {
        marginLeft: 15,
        width: '60%',
        paddingVertical: 10,
        //backgroundColor: 'red'
      },
      bookTitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
      },
      members: {
        fontFamily: 'Nunito-Regular',
        fontSize: 15,
        color: '#444444',
        marginTop: 5,
      },
      itemInvisible: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      textBody: {
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
      },
      showAll: {
        alignSelf: 'flex-end', 
        paddingHorizontal: 20,
        marginBottom: 5
    },
    showAllText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 15,
    }
})
