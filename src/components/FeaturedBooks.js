import React, {useState, useRef} from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';
const { width, height } = Dimensions.get('screen');

const imageW = width * 0.7;
const imageH = imageW * 1.54;
const imgURL = Config.IMAGE_URL;
const IMAGE_SIZE = 80;
const SPACING = 12;

const FeaturedBooks = ({closeModal, data}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onClosePress = () => {
    closeModal();
    };  

    const scrollX = useRef(new Animated.Value(0)).current;
    const topRef = useRef();
    const thumbRef = useRef();

    const scrollToActiveIndex = index => {
      setActiveIndex(index);
      topRef?.current?.scrollToOffset({
        offset: index * width,
        animated: true
      })
      if(index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2){
        thumbRef?.current?.scrollToOffset({
          offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
          animated: true
        })
      }else {
        thumbRef?.current?.scrollToOffset({
          offset: 0,
          animated: true
        })
      }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ccc' }}>
            {/* <StatusBar hidden /> */}
            <View style={StyleSheet.absoluteFillObject}>
                
                {data.map((item, index) => {
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
              top: 50,
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
            onPress={onClosePress}>
            <Ionicons name="md-arrow-back" size={22} color="#444444" />
          </TouchableOpacity>
            <View style={{height}}>
            <Animated.FlatList
            ref={topRef}
            data={data}
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true}
            )}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={ev => {
              scrollToActiveIndex(Math.ceil(ev.nativeEvent.contentOffset.x / width))
            }}
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
             />
             <FlatList
             ref={thumbRef}
            data={data}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              height: 30
            }}
            contentContainerStyle={{paddingHorizontal: SPACING}}
            renderItem={({item, index}) => {
              return <TouchableOpacity activeOpacity={0.6} onPress={() => {
                scrollToActiveIndex(index)
              }}>
                    <Image source={{uri: `${imgURL}/featured/${item.bookcover}`}} 
                      style={{
                        width: IMAGE_SIZE, 
                        height: IMAGE_SIZE,
                        resizeMode: 'cover',
                        borderRadius: 12,
                        marginRight: SPACING,
                        borderWidth: 2,
                        borderColor: activeIndex === index ? '#cdfef9' : 'transparent'
                        }} 
                      />
              </TouchableOpacity>
                  }}
                />
             </View>
             
             
        </View>
    );
};
  
  export default FeaturedBooks;

  const styles = StyleSheet.create({
    emptyText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 15,
        paddingHorizontal: 12,
      },
      header: {
        // position: 'absolute',
        // top: 25,
        marginTop: 30,
        zIndex: 2,
        alignSelf: 'center',
      },
      headerText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 20,
        letterSpacing: 1
      }
  })