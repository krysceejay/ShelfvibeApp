import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from 'react-native';
import Config from 'react-native-config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fetchClubs, filterClub} from '../../actions/clubActions';
import Skeleton from '../../components/Skeleton';

const Club = ({fetchClubs, filterClub, navigation, clubs, filterClubs}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      // Call any action
      const getClubs = await fetchClubs();
      if (getClubs !== 'failed') {
        setIsLoading(false);
      }
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const numColumns = 1;
  const imgURL = Config.IMAGE_URL;
  //const imgURL = 'http://127.0.0.1:4000/images/bookcover/';

  const searchClub = text => {
    filterClub(text, clubs);
  }

  const removeSearch = () => {
    searchClub('');
    setShowSearch(false);
    console.log(showSearch);
  }

  _renderItem = ({item, index}) => {
    return (
      
      <View style={styles.item}>
        
        <View style={styles.bookCoverContain}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
            activeOpacity={0.9}>
            <Image
                source={{
                  uri: `${imgURL}/club/${item.image}`,
                }}
                style={styles.bookCover}
              />
            {/* <Image
              style={styles.bookCover}
              source={require('../../assets/img/showup.jpg')}
            /> */}
          </TouchableOpacity>
          
        </View>
        
        <View style={styles.bookDetails}>
          <View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bookTitle}>
              {item.name}
            </Text>
            <View style={styles.afterName}>
              <Text style={styles.members} numberOfLines={1} ellipsizeMode="tail">
                16 members
              </Text>
              <Text style={styles.clubDate} numberOfLines={1} ellipsizeMode="tail">
                Created on 2nd Jan 2020 {item.insertedAt}
              </Text>
            </View>
            <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
              Need custom logistic service? We got it covered. From overland,
              air, rail and sea transportation. Fast, safe and accurate
              shipment provided all over the globe. air, rail and sea transportation. Fast safe and accurate
              shipment provided all over the globe
            </Text>
          </View>
          
        </View>
      </View>
      
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {showSearch ? <View style={styles.singleInput}>
      <TouchableOpacity style={styles.disableSearch} onPress={removeSearch}
            activeOpacity={0.3}>
            <Ionicons
              name="md-arrow-back"
              size={25}
              color="#444444"
            />
          </TouchableOpacity>
        <TextInput placeholder="Search club" style={styles.textInput} onChangeText={text => searchClub(text)} />
      </View> : 
      <View style={styles.header}>
          <Text style={styles.headerText}>All Clubs</Text>
          <TouchableOpacity onPress={() => {
            setShowSearch(true);
          }}
            activeOpacity={0.9}>
            <Ionicons
              name="md-search"
              size={30}
              color="#444444"
            />
          </TouchableOpacity>
        </View>}
      <FlatList
        data={filterClubs}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 40}}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No club found</Text>
      )}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  clubs: state.club.clubs,
  filterClubs: state.club.filterClub,
});

export default connect(
  mapStateToProps,
  {fetchClubs, filterClub},
)(Club);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 5,
    backgroundColor: '#fff'
  },
  item: {
    flex: 1,
    marginTop: 12,
    //marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    //height: width / 1.4,
    textAlign: 'center',
    //borderRadius: 12,
    overflow: 'hidden',
    //borderBottomWidth: 2,
    //borderColor: '#f5f5f5',
    //backgroundColor: 'green',
  },
  bookCoverContain: {
    flex: 3,
    width: '100%',
    height: 200
    //backgroundColor: 'green',
  },
  bookCover: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  bookDetails: {
    padding: 18,
    width: '100%',
    backgroundColor: '#fff',
  },
  bookTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 17,
    maxWidth: '90%'
    //textAlign: 'center',
  },
  members: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: '#444444',
    //marginTop: 3,
  },
  description: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    marginTop: 5,
  },
  clubDate: {
    fontFamily: 'Nunito-Italic',
    fontSize: 12,
    color: '#444444',
    //marginTop: 3,
  },
  singleInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  disableSearch: {
    flex: 1,
    marginRight: 10,
  },
  textInput: {
    flex: 20,
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: '#444',
    backgroundColor: '#eee',
    height: 60,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', 
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 5,
    height: 55,
 },
    headerText: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    },
    afterName: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    emptyText: {
      fontFamily: 'Nunito-Regular',
      fontSize: 15,
      paddingHorizontal: 12,
      marginTop: 15
    },
    
});
