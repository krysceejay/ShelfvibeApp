import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Config from 'react-native-config';

const imgURL = Config.IMAGE_URL;

const Details = ({navigation, route}) => {
  const {item} = route.params;
  return (
      <View style={styles.container}>
        <ImageBackground 
        source={{uri: `${imgURL}/featured/${item.displayimg}`}}
        style={styles.image}>
          <LinearGradient style={[StyleSheet.absoluteFillObject, styles.gradient]}
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1.0)']}
          >
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
           <View style={styles.description}>
            <Text style={styles.storeName}>{item.name} </Text>
            <View style={styles.detailsContainer}>
             <MaterialIcons name="location-on" size={25} color="#fff" />
             <Text style={styles.storeDetails}>{item.address}</Text>
            </View>
            <View style={styles.detailsContainer}>
             <MaterialIcons name="local-phone" size={25} color="#fff" />
             <Text style={styles.storeDetails}>{item.phone}</Text>
            </View>
            <View style={styles.detailsContainer}>
             <MaterialIcons name="email" size={25} color="#fff" />
             <Text style={styles.storeDetails}>{item.email}</Text>
            </View>
            <Text style={styles.storeBrief}> 
            {item.description}
            </Text>
           </View>
           
          </LinearGradient>
        </ImageBackground>
      </View>
  )
}

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    //justifyContent: "center",
  },
  gradient: {
    justifyContent: 'flex-end',
  },
  description: {
    marginHorizontal: 12,
    marginBottom: 20,
    minHeight: 200
  },
  storeName: {
    color: '#fff',
    fontFamily: 'Nunito-Bold',
    fontSize: 26,
    //textAlign: "center",
    //backgroundColor: "#000000a0"
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  storeDetails: {
    color: '#fff',
    fontFamily: 'Nunito-SemiBold',
    fontSize: 20,
    marginLeft: 10
  },
  storeBrief: {
    color: '#fff',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    marginTop: 15,
    lineHeight: 23,
  }
});

