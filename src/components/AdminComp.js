import React, {useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import {favClubAction, removeFavClubAction} from '../actions/favActions';
import {checkRateClub} from '../actions/rateActions';
import {AuthContext} from '../utils/context';
import {random} from '../utils/theme';


const AdminComp = ({navigation, closeModal, clubid, userFav, favClubAction, 
  removeFavClubAction, checkRateClub, ownerId}) => {

  const user = useContext(AuthContext);
  const {colors} = useTheme();
    onClosePress = () => {
        closeModal();
      };

      goToReport = () => {
        navigation.navigate('Report', {
            clubid
          });
        closeModal();
      }

      goToAddReview = async () => {
        await checkRateClub(clubid);
        navigation.navigate('Add Review', {
            clubid,
            ownerId
          });
        closeModal();
      }

      setFavClub = async () => {
        await favClubAction(clubid);
        closeModal();
      }
      setUnFavClub = async () => {
        await removeFavClubAction(clubid);
        closeModal();
      }

      shareBtn = async () => {
          const shareOptions = {
              message: `https://shelfvibe.com/club/${random()}${clubid}`,
          };

          try {
              await Share.open(shareOptions);
              // {"app": "com.whatsapp/com.whatsapp.ContactPicker", "message": "com.whatsapp/com.whatsapp.ContactPicker"}
          } catch (error) {
            return;
              //console.log('Error => ', error);
          }
        }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.body, {backgroundColor: colors.background}]}>
            {user !== null ?
                <View style={styles.actionContainer}>
                    <View>
                    <TouchableOpacity onPress={shareBtn}>
                        <View style={styles.actionSingle}>
                        <MaterialCommunityIcons name="share-variant" size={22} color={colors.icon} />
                            <Text style={[styles.actionText, {color: colors.text}]}>Share Link</Text>
                        </View>
                    </TouchableOpacity>
                    {userFav ? <TouchableOpacity onPress={setUnFavClub}>
                      <View style={styles.actionSingle}>
                      <FontAwesome name="heart" size={22} color={colors.icon} />
                          <Text style={[styles.actionText, {color: colors.text}]}>
                            Unlike
                          </Text>
                      </View>
                    </TouchableOpacity> : 
                    <TouchableOpacity onPress={setFavClub}>
                      <View style={styles.actionSingle}>
                      <FontAwesome name="heart-o" size={22} color={colors.icon} />
                          <Text style={[styles.actionText, {color: colors.text}]}>
                            Like
                          </Text>
                      </View>
                    </TouchableOpacity>
                    }

                    <TouchableOpacity onPress={goToReport}>
                        <View style={styles.actionSingle}>
                        <FontAwesome name="exclamation-triangle" size={22} color={colors.icon} />
                            <Text style={[styles.actionText, {color: colors.text}]}>Report</Text>
                        </View>
                    </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={goToAddReview}>
                        <View style={styles.actionSingle}>
                        <MaterialIcons name="rate-review" size={22} color={colors.icon} />
                            <Text style={[styles.actionText, {color: colors.text}]}>Add Review</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View> : 
                <View style={styles.actionSingle}>
                <MaterialCommunityIcons name="login" size={22} color={colors.icon} />
                    <Text style={[styles.actionText, {color: colors.text}]}>Login to see actions</Text>
                </View>
                }
            </View>
            {/* <TouchableOpacity style={styles.join} onPress={onClosePress}>
            <Text style={styles.joinText}>Cancel</Text>
          </TouchableOpacity> */}
            
        </SafeAreaView>
    )
}

export default connect(
  null,
    {favClubAction, removeFavClubAction, checkRateClub},
  )(AdminComp);

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        width: '55%',
        marginVertical: 10,
      },
      body: {
        //backgroundColor: '#f9f9f9',
        borderRadius: 5,
        padding: 15,
      },
      actionContainer: {
          //marginTop: 10
      },
      actionSingle: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        width: '100%',
        marginVertical: 10
      },
      actionText: {
        marginLeft: 20,
        fontSize: 14,
        fontFamily: 'Nunito-SemiBold',
      }
})
