import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, Modal, StatusBar } from 'react-native'
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Bookstore from '../components/Bookstore';
import FeatClub from '../components/FeatClub';
import {featBookstore, featBooks} from '../actions/featActions';
import {fetchFeaturedClubs} from '../actions/clubActions';
import FeaturedBooks from '../components/FeaturedBooks';
import Loader from '../components/Loader';

const Home = ({navigation, featBookstore, featBooks, fetchFeaturedClubs, books, bookstore, featured}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = navigation.addListener('focus', async () => {
      const getBookstore = await featBookstore();
      const getBooks = await featBooks();
      const getFeatClubs = await fetchFeaturedClubs();
      if (getBookstore !== 'failed' && getBooks !== 'failed' && getFeatClubs !== 'failed') {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [navigation]);

  handleOnCloseModal = () => {
    setModalVisible(false);
  };

  return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar barStyle='dark-content' />
        <ImageBackground
        source={require('../assets/img/banner.jpg')}
        style={styles.image}
        >
         <View style={styles.imgContent}>
          <View style={styles.welcome}>
              <View style={styles.bookCoverContain}>
                  <Image
                  style={styles.bookCover}
                  source={require('../assets/img/logodark.png')}
                  />
              </View>
              <Text style={styles.leading}>...let the shelf vibe!!!</Text>
            </View>
            {isLoading ? <Loader /> :
           <TouchableOpacity activeOpacity={0.9} style={styles.seeFeatBooks} 
           onPress={() => {
            setModalVisible(true);
           }}>
              <View style={styles.iconContainer}>
                <FontAwesome name="book" size={16} color="#000" />
              </View>
              <Text style={styles.featText}>See Featured Books</Text>
            </TouchableOpacity> 
            }
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}>
              <View style={styles.memberModalView}>
                <FeaturedBooks
                  closeModal={handleOnCloseModal}
                  data={books}
                />
              </View>
            </Modal>
         </View> 
        </ImageBackground>
        <View style={styles.bottomView}>
        {isLoading ? <Loader /> :
          <>
          <Bookstore navigation={navigation} data={bookstore} />
          <FeatClub navigation={navigation} data={featured} />
          </>
          }
        </View>
      </ScrollView>
  )
}
const mapStateToProps = state => ({
  bookstore: state.feature.bookstore,
  books: state.feature.books,
  featured: state.club.featured,
});

export default connect(
  mapStateToProps,
  {featBookstore, featBooks, fetchFeaturedClubs},
)(Home);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    height: 300,
  },
  imgContent: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.03)'
  },
  welcome: {
    marginTop: 50,
    marginHorizontal: 12,
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
  leading: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: '#000'
  },
  bottomView: {
    marginTop: 20,
    //backgroundColor: 'red'
  },
  iconContainer: {
    backgroundColor: 'transparent',
    //padding: 5,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  featText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15,
    color: '#000'
  },
  seeFeatBooks: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 4,
    paddingRight: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginTop: 30,
    marginHorizontal: 12
  },
  memberModalView: {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
})
