import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Animated, Image, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { marketingImage } from './data';

const { width, height } = Dimensions.get('window');
const letterAnimation = {
    0: {opacity: 0, translateY: -42},
    1: {opacity: 1, translateY: -0}
}

const animation = {
    0: {translateX: width},
    1: {translateX: 0}
}

const CIRCLE_SIZE = Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2));

const Details2 = ({navigation, route}) => {
    const {item} = route.params;
    return (
        <SafeAreaView style={{flex: 1}}>
            <Ionicons name="md-close" size={26} color="#333" onPress={navigation.goBack} 
            style={{
              padding: 12,
              position: 'absolute',
              top: 25,
              right: 0,
              zIndex: 2,
            }} />
            <View style={[StyleSheet.absoluteFillObject, {alignItems: 'center', justifyContent: 'center'}]}>
                <View style={[styles.circle, {backgroundColor: item.color}]}/>
            </View>
            <Image source={item.imageUri} style={styles.image}/>
            <View style={{position: 'absolute', top: 48, left: 12}}>
                <View style={{flexDirection: 'row', overflow: 'hidden'}}>
                    {item.type.split('').map((letter, index) => {
                        return <Animatable.Text 
                            useNativeDriver
                            animation={letterAnimation}
                            delay={200 + (index * 50)}
                        key={`${letter} - ${index}`} 
                        style={styles.heading}
                        >
                            {letter}
                        </Animatable.Text>
                    })}
                </View>
                <View style={{ overflow: 'hidden'}}>
                    <Animatable.Text 
                    useNativeDriver
                    animation={letterAnimation}
                    delay={200 + (item.type.split('').length * 50) + 50}
                    style={{fontSize: 20, fontWeight: '800', textTransform: 'uppercase', color: item.color}}
                    >
                        {item.heading}
                    </Animatable.Text>
                </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', padding: 12}}>
                <Animatable.View useNativeDriver animation={animation} delay={300} style={{flex: 0.35, backgroundColor: '#fff', padding: 12, justifyContent: 'space-between', overflow: 'hidden', marginRight: 12}}>
                    <Animatable.View useNativeDriver animation={animation} delay={300 + 100}>
                        <Text style={{fontWeight: '800', textTransform: 'uppercase'}}>Advertising</Text>
                        <Text style={{fontWeight: '800', textTransform: 'uppercase'}}>Marketing</Text>
                    </Animatable.View>
                    <Animatable.View useNativeDriver animation={animation} delay={300 + 200} style={{flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center'}}>
                        <Text style={{fontWeight: '800', textTransform: 'uppercase', fontSize: 16, marginRight: 6 }}>Play Video</Text>
                        <Ionicons name="md-play" size={22} color="#333" />
                    </Animatable.View>
                </Animatable.View>
                <View style={{flex: 0.65, overflow: 'hidden'}}>
                    <Animatable.Image useNativeDriver animation={animation} delay={300 + 300} source={{ uri: marketingImage }} style={[StyleSheet.absoluteFillObject, {resizeMode: 'cover'}]}  />
                </View>
                

            </View>
        </SafeAreaView>
    )
}

export default Details2;

const styles = StyleSheet.create({
    heading: {
        color: '#333',
        textTransform: 'uppercase',
        fontSize: 38,
        height: 42,
        fontWeight: '800',
        letterSpacing: 2,
        marginBottom: 5,
        
      },
      image: {
          width: width * 0.9,
          height: width * 0.9,
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: 100
      },
      circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE ,
        position: 'absolute',
        opacity: 0.2,
      },
})
