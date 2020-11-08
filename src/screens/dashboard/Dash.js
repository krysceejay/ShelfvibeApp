import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AnimatedTabs from '../../components/AnimatedTabs';
import TopTabs from '../tabs/TopTabs';

const Dash = ({navigation}) => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* <Ionicons name="md-menu" size={30} color="#444444" style={styles.icon} onPress={() => {
                navigation.openDrawer();
            }} /> */}
            <View style={styles.userInfoSection}>
                <View style={styles.infoRow}>
                    {/* <Image
                    source={{
                        uri: `${proURL + item.user.propix}`,
                    }}
                    style={styles.avatar}
                    size={50}
                    /> */}
                    <Image
                        style={styles.avatar}
                        source={require('../../assets/img/avatar.jpg')}
                        size={50}
                    />
                    
                </View>
                <View>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.number}>2</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>Clubs</Text>
                </View>
                <View>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.number}>6</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>Joined</Text>
                </View>
                <MaterialCommunityIcons name="account-edit" size={25} color="#444444" onPress={() => {}} />
            </View>
            <View style={{paddingHorizontal: 20}}>
                <Text style={styles.username}>Christopher Chijioke.</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.caption}>@krysceejay</Text>
                <Text style={styles.briefBio}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
            </View>
            <TopTabs navigation={navigation} />
        </ScrollView>
    )
}

export default Dash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        overflow: 'hidden',
        backgroundColor: '#fff'
      },
    icon: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 10
        // position: 'absolute',
        // top: 25,
        // right: 20,
        // zIndex: 2,
    } ,
    userInfoSection: {
        flexDirection: 'row',
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        width: '100%',
        height: 60,
        paddingHorizontal: 20
      }, 
      infoRow: {
        flexDirection: 'row', 
        alignItems: 'center',
        },
      avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
      },
      username: {
        fontSize: 18,
        marginBottom: 5,
        fontFamily: 'Nunito-SemiBold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 15,
        fontFamily: 'Nunito-Light',
      },
      briefBio: {
        fontSize: 15,
        lineHeight: 18,
        fontFamily: 'Nunito-Regular',
        color: '#444444',
        marginTop: 5
      },
      number: {
        fontSize: 18,
        marginBottom: 3,
        fontFamily: 'Nunito-Bold',
        textAlign: 'center'
      },
      title: {
        fontSize: 15,
        fontFamily: 'Nunito-Regular',
        color: '#444444',
        textAlign: 'center'
      }
})
