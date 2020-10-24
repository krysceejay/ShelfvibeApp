import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const Skeleton = props => {
  const animatedValue = new Animated.Value(0);
  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear.inOut,
        useNativeDriver: true,
      }),
    ).start();
  });

  const translateXAxis = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const dataList = [{key: 1}, {key: 1}, {key: 1}, {key: 1}];

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <View style={styles.bookCoverContain} />

        {/* <View style={styles.bookDetails}>
          <Text style={styles.bookTitle} />
          <Text style={styles.bookAuthor} />
        </View> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AnimatedLG
        colors={['#a0a0a0', '#b0b0b0', '#b0b0b0', '#a0a0a0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          ...StyleSheet.absoluteFill,
          transform: [{translateX: translateXAxis}],
        }}
      />
      <FlatList
        data={dataList}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a0a0a0',
    borderColor: '#b0b0b0',
    height: height,
    width: width,
  },
  item: {
    flex: 1,
    margin: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,

    //backgroundColor: '#3232ff',
    alignItems: 'center',
    justifyContent: 'center',
    height: width / 1.4,
    textAlign: 'center',
  },
  bookCoverContain: {
    //backgroundColor: 'green',
    flex: 1,
    width: '100%',
    //borderColor: '#ccc',
    //borderWidth: 1,
  },
  bookCover: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  bookDetails: {
    //flex: 1,
    //backgroundColor: 'red',
    alignItems: 'center',
    padding: 5,
  },
  bookTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    textAlign: 'center',
  },
  bookAuthor: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: '#444444',
    textAlign: 'center',
  },
  bookAddedBy: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: '#444444',
    textAlign: 'center',
  },
});
