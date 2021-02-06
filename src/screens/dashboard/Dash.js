import React, {useState, useEffect, useContext} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DashClubs from '../../components/DashClubs';
import DashJoined from '../../components/DashJoined';
import {AuthContext} from '../../utils/context';
import {getUserClubs, getUserJoinedClubs} from '../../actions/clubActions';
import Loader from '../../components/Loader';

const Dash = ({navigation, getUserClubs, getUserJoinedClubs, userClubs, joinedClub}) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(AuthContext);

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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.userInfoSection}>
            <View>
                <Text style={styles.welcome}>Welcome <Text style={styles.username}>{user.firstName},</Text></Text>
            </View>
                <MaterialCommunityIcons name="account-edit" size={25} color="#444444" onPress={() => {}} />
            </View>
            <View style={{paddingHorizontal: 12}}>
                <Text style={styles.briefBio}>
                {user.about}
                </Text>
            </View>
            {isLoading ? <Loader /> :
            <View style={styles.clubViews}>
              <View style={styles.clubs}>
                <View style={styles.listTitleView}>
                  <Text style={styles.listTitle}>Your Clubs</Text>
                </View>
                <TouchableOpacity activeOpacity={0.6} onPress={() => {
                  navigation.navigate('ManageShelf');
                }}>
                  <Text style={styles.title}>View</Text>
                </TouchableOpacity>
              </View>
              <DashClubs data={userClubs.slice(0, 4)} />
              <View style={styles.clubs}>
                <View style={styles.listTitleView}>
                  <Text style={styles.listTitle}>Joined Clubs</Text>
                </View>
                <TouchableOpacity activeOpacity={0.6} onPress={() => {
                  navigation.navigate('JoinedList');
                }}>
                  <Text style={styles.title}>View</Text>
                </TouchableOpacity>
              </View>
              <DashJoined data={joinedClub.slice(0, 4)} />
            </View> 
            }
            {/* <TopTabs navigation={navigation} /> */}
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
