import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  Image,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
import {tutorial2Spec} from '../utils/theme';

const {ITEM_HEIGHT, ITEM_WIDTH, RADIUS, SPACING, FULL_SIZE} = tutorial2Spec;

const {width} = Dimensions.get('window');

const zoomIn = {
  0: {
    opacity: 0,
    scale: 0,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};

const Details = ({navigation, route}) => {
  const {item} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Ionicons
        name="md-arrow-back"
        size={28}
        color="#fff"
        style={{
          paddingHorizontal: SPACING,
          position: 'absolute',
          top: 50,
          left: 10,
          zIndex: 2,
        }}
        onPress={navigation.goBack}
      />
      <SharedElement
        id={`item.${item.key}.photo`}
        style={[StyleSheet.absoluteFill]}>
        <View style={[StyleSheet.absoluteFill, {borderRadius: 0}]}>
          <Image
            source={{uri: item.image}}
            style={[StyleSheet.absoluteFill, {resizeMode: 'cover'}]}
          />
        </View>
      </SharedElement>
      <SharedElement
        id={`item.${item.key}.location`}
        style={[StyleSheet.absoluteFill]}>
        <Text style={[styles.location]}>{item.location}</Text>
      </SharedElement>
      <View style={{position: 'absolute', bottom: 120}}>
        <Text
          style={{
            fontSize: 16,
            width: '100%',
            textTransform: 'uppercase',
            fontWeight: '800',
            color: '#fff',
            marginHorizontal: SPACING,
          }}>
          Activities
        </Text>
        <FlatList
          data={[...Array(8).keys()]}
          keyExtractor={item => String(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{padding: SPACING}}
          renderItem={({item, index}) => {
            return (
              <Animatable.View
                duration={700}
                delay={400 + index * 100}
                animation={zoomIn}
                style={{
                  backgroundColor: '#fff',
                  padding: SPACING,
                  width: width * 0.33,
                  height: width * 0.5,
                  marginRight: SPACING,
                }}>
                <Image
                  source={{
                    uri:
                      'https://images.unsplash.com/photo-1533292362155-d79af6b08b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
                  }}
                  style={{width: '100%', height: '70%', resizeMode: 'cover'}}
                />
                <Text>Activity #{item + 1}</Text>
              </Animatable.View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

Details.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  return [
    {
      id: `item.${item.key}.photo`,
    },
    {
      id: `item.${item.key}.location`,
    },
  ];
};

export default Details;

const styles = StyleSheet.create({
  location: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '800',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: 100,
    left: SPACING * 2,
  },
});
