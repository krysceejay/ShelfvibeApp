import React, {useRef, createRef, forwardRef, useEffect, useState, useCallback} from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, FlatList, Animated, Image, findNodeHandle, TouchableOpacity } from 'react-native';

const {width, height} = Dimensions.get('screen');

const images = {
  man:
    'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids:
    'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: createRef()
}));

const Tab = forwardRef(({item, onItemPress}, ref) => {
    return <TouchableOpacity activeOpacity={0.8} onPress={onItemPress}>
        <View ref={ref}>
            <Text style={{color: '#fff', fontSize: 84/data.length, fontWeight: 'bold', textTransform: 'uppercase'}}>{item.title}</Text>
        </View>
    </TouchableOpacity>
})

const Indicator = ({measures, scrollX}) => {
    const inputRange = data.map((_, i) => i * width);
    const indicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measures.map(measure => measure.width)
    });
    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measures.map(measure => measure.x)
    });
    return <Animated.View 
    style={{
        position: 'absolute', 
        height: 4, 
        width: indicatorWidth, 
        backgroundColor: '#fff', 
        bottom: -10,
        left: 0,
        transform: [{
            translateX
        }]
        }}>

    </Animated.View>
}

const Tabs = ({data, scrollX, onItemPress}) => {
    const [measures, setMeasures] = useState([]);
    const containerRef = useRef();
    useEffect(() => {
        const m = [];
        data.forEach(item => {
            item.ref.current.measureLayout(containerRef.current, (x, y, width, height) => {
                m.push({
                    x, y, width, height
                });
                if(m.length === data.length){
                    setMeasures(m);
                }
            })
        })
    }, []);

    return <View style={{position: 'absolute', top: 50, width}}>
        <View ref={containerRef} style={{flex: 1, justifyContent: 'space-evenly', flexDirection: 'row'}}>
            {data.map((item, index) => {
                return <Tab key={item.key} item={item} ref={item.ref} onItemPress={() => onItemPress(index)} />
            })}
        </View>
        {measures.length > 0 && <Indicator measures={measures} scrollX={scrollX} />}
        
    </View>
}

const AnimatedTabs = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const ref = useRef();
    const onItemPress = useCallback(itemIndex => {
        ref?.current?.scrollToOffset({
            offset: itemIndex * width
        })
    })
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {/* <Text style={{ fontSize: 42 }}>❤️</Text>
      <Text
        style={{
          fontFamily: 'Menlo',
          marginTop: 10,
          fontWeight: '800',
          fontSize: 16,
        }}
      >
        Expo
      </Text>
      <Text style={{ fontFamily: 'Menlo', fontStyle: 'italic', fontSize: 12 }}>
        (expo.io)
      </Text> */}
      <Animated.FlatList 
        ref={ref}
        data={data}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false}
        )}
        renderItem={({item}) => {
            return <View style={{width, height}}>
                <Image source={{uri: item.image}} style={{flex: 1, resizeMode: 'cover'}} />
                <View style={[StyleSheet.absoluteFillObject, {backgroundColor: 'rgba(0,0,0,0.3)'}]} />
            </View>
        }}
      />
      <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
    </View>
  );
}

export default AnimatedTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});