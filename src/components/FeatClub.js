import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';

const imgURL = Config.IMAGE_URL;

const FeatClub = ({navigation, data}) => {
    return (
        <View style={styles.container}>
        {data.map((item, index) => {
        return <TouchableOpacity activeOpacity={0.6} onPress={() => {
        }} 
        key={`feat-${index}`}
        style={styles.clubInfoSection}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
                style={styles.avatar}
                source={{uri: `${imgURL}/featured/${item.displayimg}`}}
                size={50}
            />
            <View style={{marginLeft: 15, width: '60%',}}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.clubname}>Club name {item.key}</Text>
            <Text style={[styles.caption, {color: '#155724'}]}>16 members</Text>
            </View>
        </View>
        <View style={[styles.publicContainer, {backgroundColor: '#d4edda'}]}>
            <Text style={styles.public}>Private</Text>
        </View>
        </TouchableOpacity>
        })}
        </View>
    )
}

export default FeatClub;

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    clubInfoSection: {
        flexDirection: 'row',
        marginVertical: 6,
        marginHorizontal: 12,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: '#fff',
      },
    emptyText: {
      fontFamily: 'Nunito-Regular',
      fontSize: 15,
    },
})
