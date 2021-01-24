import React, {useState, useEffect, useRef} from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';
import {featBooks} from '../actions/featActions';
import Loader from '../components/Loader';
const { width } = Dimensions.get('screen');

const imageW = width * 0.7;
const imageH = imageW * 1.54;
const imgURL = Config.IMAGE_URL;

const FeaturedBooks = ({navigation, featBooks, books}) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = navigation.addListener('focus', async () => {
          const getBooks = await featBooks();
          if (getBooks !== 'failed') {
            setIsLoading(false);
          }
        });
        return unsubscribe;
      }, [navigation]);

    const scrollX = useRef(new Animated.Value(0)).current;
    return (
        <View style={{ flex: 1, backgroundColor: '#ccc' }}>
            <StatusBar hidden />
            <View style={StyleSheet.absoluteFillObject}>
                
                {books.map((item, index) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width
                    ];
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0]
                    });
                    return <Animated.Image 
                    key={`image-${index}`}
                    source={{uri: `${imgURL}/featured/${item.bookcover}`}}
                    style={[
                        StyleSheet.absoluteFillObject,
                        {opacity}
                    ]}
                    blurRadius={40}
                    />
                })}
            </View>
            
            <TouchableOpacity
            style={{
              position: 'absolute',
              top: 25,
              left: 15,
              zIndex: 2,
              backgroundColor: '#fff',
              borderRadius: 17,
              width: 34,
              height: 34,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.9}
            onPress={navigation.goBack}>
            <Ionicons name="md-arrow-back" size={22} color="#444444" />
          </TouchableOpacity>
            <View style={styles.header}>
             <Text style={styles.headerText}>FEATURED BOOKS</Text>
            </View>
            {isLoading ? <Loader 
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                alignItems: 'center',
                justifyContent: 'center',
            }}/> :
            <Animated.FlatList
            data={books}
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true}
            )}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
                <Text style={styles.emptyText}>No club yet</Text>
            )}
            renderItem={({item}) => {
                return <View style={{ 
                    width, justifyContent: 'center', alignItems: 'center',
                    shadowColor: '#000',
                    shadowOpacity: 0.5,
                    shadowOffset: {
                        width: 0,
                        height: 0
                    },
                    shadowRadius: 20
                    }}>
                    <Image source={{uri: `${imgURL}/featured/${item.bookcover}`}} style={{
                        width: imageW, 
                        height: imageH,
                        resizeMode: 'cover',
                        borderRadius: 16
                    }} />
                </View>
            }}
             />}
        </View>
    );
};

const mapStateToProps = state => ({
    books: state.feature.books,
  });
  
  export default connect(
    mapStateToProps,
    {featBooks},
  )(FeaturedBooks);

  const styles = StyleSheet.create({
    emptyText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 15,
        paddingHorizontal: 12,
      },
      header: {
        position: 'absolute',
        top: 25,
        zIndex: 2,
        alignSelf: 'center',
      },
      headerText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 20,
        letterSpacing: 1
      }
  })