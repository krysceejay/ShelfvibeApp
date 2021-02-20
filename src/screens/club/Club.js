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
import { useTheme } from '@react-navigation/native';
import Config from 'react-native-config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import {fetchClubs, filterClub} from '../../actions/clubActions';
import Skeleton from '../../components/Skeleton';


const numColumns = 2;
const imgURL = Config.IMAGE_URL;
const {width} = Dimensions.get('window');

const Club = ({fetchClubs, filterClub, navigation, clubs, filterClubs}) => {
  const {colors} = useTheme();
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

  const searchClub = text => {
    filterClub(text, clubs);
  }

  const removeSearch = () => {
    searchClub('');
    setShowSearch(false);
  }

  _renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemContain}>
        <View style={styles.bookCoverContain}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details', {
                clubId: item.id
              });
            }}
            activeOpacity={0.9}>
              <Image
                source={{
                  uri: `${imgURL}/club/${item.image}`,
                }}
                style={styles.bookCover}
              /> 

          </TouchableOpacity>
          
        </View>
        
        <View style={styles.bookDetails}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.bookTitle}>
              {item.name}
            </Text>
              <Text style={styles.members} numberOfLines={1} ellipsizeMode="tail">
                {item.members.length} {item.members.length > 1 ? 'members' : 'member'}
              </Text>
        </View>
        </View>
      </View>
      
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <Skeleton /> : 
      <>
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
      <View style={[styles.header, {borderBottomColor: colors.borderBottomColor}]}>
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
        contentContainerStyle={{paddingBottom: 50, paddingTop: 12}}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No club found</Text>
      )}
      />
      </>
      }
      
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
    backgroundColor: '#fff'
  },
  item: {
    marginBottom: 12,
    width: width * 0.5,
  },
  itemContain: {
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#f5f5f5',
    overflow: 'hidden',
    //backgroundColor: 'red',
  },
  bookCoverContain: {
    width: '100%',
    height: 120,
  },
  bookCover: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  bookDetails: {
    paddingTop: 6,
    paddingBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    //marginBottom: 12
  },
  bookTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
  },
  members: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: '#444444',
    //marginTop: 3,
  },
  description: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    marginTop: 8,
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
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 5,
    height: 55,
    borderBottomWidth: 1
 },
    headerText: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    },
    emptyText: {
      fontFamily: 'Nunito-Regular',
      fontSize: 15,
      paddingHorizontal: 12,
      marginTop: 15
    },
    clubNoImage:{
      height: '100%',
    width: '100%',
    resizeMode: 'cover',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    initial: {
      fontFamily: 'Nunito-SemiBold',
      fontSize: 19,
      color: '#fff',
      textTransform: 'uppercase'
    },
    
});
