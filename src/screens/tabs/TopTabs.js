import React, {useRef, createRef, forwardRef, useEffect, useState, useCallback} from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, FlatList, Animated, Image, findNodeHandle, TouchableOpacity, ScrollView } from 'react-native';


const {width, height} = Dimensions.get('screen');

const tabTitles = {
  club:
    'Manage Club',
  joined:
    'Joined Club',
 
};
const data = Object.keys(tabTitles).map((i) => ({
  key: i,
  title: tabTitles[i],
  ref: createRef()
}));

const Tab = forwardRef(({item, onItemPress}, ref) => {
    return <TouchableOpacity activeOpacity={0.8} onPress={onItemPress}>
        <View ref={ref}>
            <Text style={{color: '#444444', fontFamily: 'Nunito-Bold', fontSize: 18, textTransform: 'capitalize'}}>{item.title}</Text>
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
        height: 2.5, 
        width: indicatorWidth, 
        backgroundColor: '#777', 
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

    return <View style={{width, marginTop: 15, height: 30}}>
        <View ref={containerRef} style={{flex: 1, justifyContent: 'space-around', flexDirection: 'row'}}>
            {data.map((item, index) => {
                return <Tab key={item.key} item={item} ref={item.ref} onItemPress={() => onItemPress(index)} />
            })}
        </View>
        {measures.length > 0 && <Indicator measures={measures} scrollX={scrollX} />}
        
    </View>
}

const TopTabs = ({navigation}) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const ref = useRef();
    const onItemPress = useCallback(itemIndex => {
        ref?.current?.scrollTo({x: itemIndex * width, y: 0, animated: true})
    });
    
  return (
      <View>
          <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
        <Animated.ScrollView
            ref={ref}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: false}
            )}>
            <View style={styles.outer}>
            <Text>content</Text>
            </View>
            <View style={styles.outer}>
            <Text>content</Text>
            </View>
        </Animated.ScrollView>
        
        
      </View>
  );
}

export default TopTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outer: {
    width: width,
  },
  innerText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  red: {
    backgroundColor: '#dd4b39',
  },
  green: {
    backgroundColor: '#27ae60',
  },
});