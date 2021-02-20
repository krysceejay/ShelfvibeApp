import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { useTheme } from '@react-navigation/native';
import DashClubs from '../../components/DashClubs';
import DashJoined from '../../components/DashJoined';
import {AuthContext} from '../../utils/context';
import {getUserClubs, getUserJoinedClubs} from '../../actions/clubActions';
import Loader from '../../components/Loader';

const Dash = ({navigation, getUserClubs, getUserJoinedClubs, userClubs, joinedClub}) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(AuthContext);
  const {colors} = useTheme();

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = navigation.addListener('focus', async () => {
      const getUserShelf = await getUserClubs(user.id);
      const getJoined = await getUserJoinedClubs();
      if (getUserShelf !== 'failed' && getJoined !== 'failed') {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [navigation]);


    return (
        <ScrollView style={[styles.container, {backgroundColor: colors.background}]} showsVerticalScrollIndicator={false}>
            <View style={styles.userInfoSection}>
            <View>
                <Text style={[styles.welcome, {color: colors.text}]}>Welcome <Text style={styles.username}>{user.firstName},</Text></Text>
                
            </View>
            </View>
                {/* <Text style={styles.briefBio}>
                Books read
                </Text> */}
            {isLoading ? <Loader /> :
            <View style={styles.clubViews}>
              <View style={[styles.stats, {backgroundColor: colors.dashStats}]}>
                <TouchableOpacity activeOpacity={0.6} 
                onPress={() => {navigation.navigate('ManageShelf')}}
                style={[styles.statsSingleOne, {borderRightColor: colors.dashStats}]}>
                  <View>
                    <Text style={[styles.number, {color: colors.text}]}>{userClubs.length}</Text>
                    <Text style={[styles.text, {color: colors.text}]}>Clubs Started</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} 
                onPress={() => {navigation.navigate('JoinedList')}}
                style={styles.statsSingle}>
                  <View>
                    <Text style={[styles.number, {color: colors.text}]}>{joinedClub.length}</Text>
                    <Text style={[styles.text, {color: colors.text}]}>Clubs Joined</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.clubs}>
                <View style={styles.listTitleView}>
                  <Text style={styles.listTitle}>Your Clubs</Text>
                </View>
                {userClubs.length > 4 &&
                  <TouchableOpacity activeOpacity={0.6} onPress={() => {
                    navigation.navigate('ManageShelf');
                  }}>
                    <Text style={styles.title}>See all</Text>
                  </TouchableOpacity>
                }
              </View>
              <DashClubs data={userClubs.slice(0, 4)} navigation={navigation} />
              <View style={styles.clubs}>
                <View style={styles.listTitleView}>
                  <Text style={styles.listTitle}>Joined Clubs</Text>
                </View>
                {joinedClub.length > 4 &&
                  <TouchableOpacity activeOpacity={0.6} onPress={() => {
                    navigation.navigate('JoinedList');
                  }}>
                    <Text style={styles.title}>See all</Text>
                  </TouchableOpacity>
                }
              </View>
              <DashJoined data={joinedClub.slice(0, 4)} navigation={navigation} />
            </View> 
            }
        </ScrollView>
    )
}

const mapStateToProps = state => ({
  userClubs: state.club.userClubs,
  joinedClub: state.club.joinedClub,
});

export default connect(
  mapStateToProps,
  {getUserClubs, getUserJoinedClubs},
)(Dash);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        overflow: 'hidden'
      },
    icon: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 10
    } ,
    userInfoSection: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
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
        fontSize: 20,
        marginBottom: 3,
        fontFamily: 'Nunito-Bold',
        textAlign: 'center'
      },
      text: {
        fontSize: 14,
        fontFamily: 'Nunito-Regular',
        color: '#444444',
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
      },
      stats: {
        flexDirection: 'row',
        marginHorizontal: 12,
        marginBottom: 30,
        padding: 15,
        alignItems: 'center',
        borderRadius: 12
      },
      statsSingle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      statsSingleOne: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
      }
})
