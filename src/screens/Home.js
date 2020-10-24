import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {tutorial2Spec} from '../utils/theme';

const {ITEM_HEIGHT, ITEM_WIDTH, RADIUS, SPACING, FULL_SIZE} = tutorial2Spec;

const data = [
  {
    key: '1',
    location: 'Abuja',
    numberOfDays: 9,
    image:
      'https://images.unsplash.com/photo-1533292362155-d79af6b08b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
    color: '#0c212D',
  },
  {
    key: '2',
    location: 'Kano',
    numberOfDays: 10,
    image:
      'https://images.unsplash.com/45/eDLHCtzRR0yfFtU0BQar_sylwiabartyzel_themap.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1657&q=80',
    color: '#0c212D',
  },
  {
    key: '3',
    location: 'Lagos',
    numberOfDays: 11,
    image:
      'https://images.unsplash.com/photo-1567018823138-6380fc976b0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
    color: '#0c212D',
  },
  {
    key: '4',
    location: 'Edo',
    numberOfDays: 12,
    image:
      'https://images.unsplash.com/photo-1547030129-2cefb92ed257?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    color: '#0c212D',
  },
  {
    key: '5',
    location: 'Abia',
    numberOfDays: 13,
    image:
      'https://images.unsplash.com/photo-1504273066284-53fb4c703113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2103&q=80',
    color: '#0c212D',
  },
];

const Home = ({navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={FULL_SIZE}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * FULL_SIZE,
            index * FULL_SIZE,
            (index + 1) * FULL_SIZE,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.1, 1],
          });
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.push('TravelListDetails', {item});
              }}
              style={styles.itemContainer}>
              <SharedElement
                id={`item.${item.key}.photo`}
                style={[StyleSheet.absoluteFill]}>
                <View
                  style={[
                    StyleSheet.absoluteFill,
                    {overflow: 'hidden', borderRadius: RADIUS},
                  ]}>
                  <Animated.Image
                    source={{uri: item.image}}
                    style={[
                      StyleSheet.absoluteFill,
                      {resizeMode: 'cover', transform: [{scale}]},
                    ]}
                  />
                </View>
              </SharedElement>
              <SharedElement
                id={`item.${item.key}.location`}
                style={[StyleSheet.absoluteFill]}>
                <Animated.Text
                  style={[styles.location, {transform: [{translateX}]}]}>
                  {item.location}
                </Animated.Text>
              </SharedElement>
              <View style={styles.days}>
                <Text style={styles.daysValue}>{item.numberOfDays}</Text>
                <Text style={styles.daysLabel}>days</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: SPACING,
  },
  location: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '800',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: SPACING * 2,
    left: SPACING,
  },
  days: {
    position: 'absolute',
    bottom: SPACING,
    left: SPACING,
    width: 52,
    height: 52,
    backgroundColor: 'tomato',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysValue: {
    fontWeight: '800',
    color: '#fff',
    fontSize: 18,
  },
  daysLabel: {
    color: '#fff',
    fontSize: 10,
  },
});
