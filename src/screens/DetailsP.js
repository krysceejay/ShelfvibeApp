import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {stringToHslColor} from '../utils/theme';

const DetailsP = ({navigation}) => {
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: stringToHslColor('Born A Crime')}]}>
            <ScrollView
            showsVerticalScrollIndicator={false}
           >
            
            <View style={styles.bookCoverContain}>
          <TouchableOpacity
            style={{
              //paddingHorizontal: 12,
              position: 'absolute',
              top: 25,
              left: 15,
              zIndex: 3,
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
          <Image
            style={styles.bookCover}
            source={require('../assets/img/Leanin.jpg')}
          />
          <View style={styles.topView}>
            <Image
                style={styles.bookCoverShow}
                source={require('../assets/img/Leanin.jpg')}
            />
            <View style={styles.bookDetails}>
              <Text style={styles.bookTitle} numberOfLines={3}>Book Title</Text>
              <Text style={styles.bookAuthor} numberOfLines={2}>Book Author</Text>
            </View>
          </View>
        </View>
        <View style={styles.descriptionView}>
            <Text style={styles.descriptHead}>Description</Text>
            <Text style={styles.description}>
              Need custom logistic service? We got it covered. From overland,
              air, rail and sea transportation. Fast, safe and accurate
              shipment provided all over the globe. air, rail and sea transportation. Fast, safe and accurate
              shipment provided all over the globe.
            </Text>
        </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailsP;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        //backgroundColor: 'purple',
        overflow: 'hidden',
        //opacity: 0.9,
      },
    
      bookCoverContain: {
        //flex: 2,
        width: '100%',
        height: 500,
      },
      bookCover: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        opacity: 0.1
      },
      topView: {
          position: 'absolute',
          top: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'transparent',
          zIndex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      bookCoverShow: {
        height: 300,
        width: 200,
        resizeMode: 'contain',
        //backgroundColor: 'red'
      },
      bookDetails: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        width: '90%',
        marginTop: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 3

      },
      bookTitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        textAlign: 'center',
        color: '#e6e6e6'
      },
      bookAuthor: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 14,
        color: '#ccc',
        textAlign: 'center',
      },
      descriptionView: {
          //flex: 1,
          //backgroundColor: 'rgba(0,0,0,0.2)',
          paddingVertical: 15,
          paddingHorizontal: 20
          //height: 100,
      },
      description: {
        fontFamily: 'Nunito-Regular',
        fontSize: 14,
        color: '#4c4c4c',
        marginTop: 10
      },
      descriptHead: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 16,
        color: '#4c4c4c',
        textTransform: 'uppercase'
      }
})
