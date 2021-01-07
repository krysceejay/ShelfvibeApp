import React, {useContext} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DashClubs from '../../components/DashClubs';
import {AuthContext} from '../../utils/context';

const dataList = [
  {key: 1},
  {key: 2},
  {key: 3},
  {key: 4},
];

const Dash = ({navigation}) => {
  const user = useContext(AuthContext);
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* <Ionicons name="md-menu" size={30} color="#444444" style={styles.icon} onPress={() => {
                navigation.openDrawer();
            }} /> */}
            <View style={styles.userInfoSection}>
            <View>
                <Text style={styles.welcome}>Welcome <Text style={styles.username}>{user.firstName},</Text></Text>
                
            </View>
                {/* <View style={styles.infoRow}>
                    <Image
                        style={styles.avatar}
                        source={require('../../assets/img/avatar.jpg')}
                        size={50}
                    />
                </View> */}
                <MaterialCommunityIcons name="account-edit" size={25} color="#444444" onPress={() => {}} />
                {/* <View>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.number}>2</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>Clubs</Text>
                </View>
                <View>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.number}>6</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>Joined</Text>
                </View> */}
                
            </View>
            <View style={{paddingHorizontal: 12}}>
                <Text style={styles.briefBio}>
                {user.about}
                </Text>
            </View>
            <View style={styles.clubViews}>
            <View style={styles.clubs}>
              <View style={styles.listTitleView}>
                <Text style={styles.listTitle}>Your Clubs</Text>
              </View>
              <Text style={styles.title}>See all</Text>
            </View>
            <DashClubs data={dataList} />
            <View style={styles.clubs}>
              <View style={styles.listTitleView}>
                <Text style={styles.listTitle}>Joined Clubs</Text>
              </View>
              <Text style={styles.title}>See all</Text>
            </View>
            <DashClubs data={dataList} />
            </View>
            
            {/* <TopTabs navigation={navigation} /> */}
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
        //marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        width: '100%',
        height: 60,
        paddingHorizontal: 12
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
      welcome: {
        fontSize: 18,
        marginBottom: 5,
        fontFamily: 'Nunito-Regular',
      },
      username: {
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
      },
      clubViews: {
        marginVertical: 20,
      },
      clubs: {
        height: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 12,
        borderBottomWidth: 2,
        overflow: 'hidden',
        borderColor: '#00a2cc'
      },
      listTitleView: {
        backgroundColor: '#00a2cc',
        height: '100%',
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 12,
        borderWidth: 0
        
      },
      listTitle: {
        fontSize: 15,
        fontFamily: 'Nunito-SemiBold',
        color: '#fff',
        textAlign: 'center',
        textTransform: 'uppercase'
      },
      horizontalLine: {
        height: 2, 
        backgroundColor: '#00a2cc', 
        position: 'absolute', 
        bottom: 0, 
        left: 35, 
        width: '94%'
      }
})
