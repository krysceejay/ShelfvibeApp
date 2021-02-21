import React, {useState, useContext} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RatingStarGroup from '../../components/RatingStarGroup';
import {rateClub, updateRateClub} from '../../actions/rateActions';
import {sendNotificationAction} from '../../actions/notificationActions';
import {AuthContext} from '../../utils/context';


const AddReview = ({route, rateClub, updateRateClub, hasRated, navigation, sendNotificationAction}) => {
    const {clubid, ownerId} = route.params;
    const user = useContext(AuthContext);
    const {dark, colors} = useTheme();
    const [formData, setFormData] = useState({
        userRating: 0,
        userComment: '',
       });
    
       const {
        userRating,
        userComment,
      } = formData;
    
      const [errorMsg, setErrorMsg] = useState({
        rating: '',
        comment: '',
      });
    
      const {rating, comment} = errorMsg; 
    
      const onChange = name => text => setFormData({...formData, [name]: text});

      getUserRating = rate => {
        setFormData({...formData, userRating: rate});
      };

     rateClubAction = async () => {
         let userRateClub;
         if(hasRated){
            userRateClub = await updateRateClub({
                clubId: clubid,
                userRating,
                userComment,
              });
              
         }else{
            userRateClub = await rateClub({
                clubId: clubid,
                userRating,
                userComment,
              });
            }
         if (userRateClub == 'failed' || Array.isArray(userRateClub)) {
            if (Array.isArray(userRateClub)) {
              const errMsges = {};
              userRateClub.forEach(item => {
                errMsges[item.field] = item.message;
              });
              setErrorMsg(errMsges);
            }
          } else {
            if(ownerId !== user.id){
              await sendNotificationAction({
                clubId: clubid,
                receiverUserId: ownerId,
                type: "ADD_REVIEW"
              })
            }
            Alert.alert(
              'Success!',
              'Your review was added successfully',
            );
          }
        
      };

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
          <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
            <View style={[styles.header, {borderBottomColor: colors.borderBottomColor}]}>
              <TouchableOpacity onPress={() => {
                navigation.goBack();
              }}
              style={{
                paddingHorizontal: 3,
                marginRight: 38
              }}
                activeOpacity={0.9}>
                <AntDesign
                  name="left"
                  size={28}
                  color={colors.icon}
                  />
              </TouchableOpacity>
              <Text style={[styles.headerText, {color: colors.text}]}>Add Review</Text>
            </View>
            <View style={styles.ratingActionView}>
              <View style={{alignSelf: 'center', marginVertical: 15}}>
                <RatingStarGroup getRating={getUserRating} />
                {rating !== '' && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMessage}>{rating}</Text>
                </Animatable.View>
              )}
              </View>
              <View
                style={{
                  paddingHorizontal: 20
                }}>
                <TextInput
                  multiline
                  numberOfLines={2}
                  editable
                  placeholder="Review comment"
                  placeholderTextColor={colors.text}
                  selectionColor={colors.text}
                  style={{
                    backgroundColor: colors.background,
                    borderWidth: 1,
                    borderColor: colors.border,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    fontSize: 14,
                    color: colors.text,
                  }}
                  value={userComment}
                  onChangeText={onChange('userComment')}
                />
              </View>
              {comment !== '' && (
                <Animatable.View animation="fadeInLeft" duration={500} style={{paddingHorizontal: 20}}>
                  <Text style={styles.errorMessage}>{comment}</Text>
                </Animatable.View>
              )}
              <View style={{alignItems: 'flex-start', paddingHorizontal: 20}}>
                <TouchableOpacity onPress={rateClubAction}>
                  <View style={[styles.submit, {borderColor: colors.border}]}>
                    <Text style={[styles.submitText, {color: colors.text}]}>Submit</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = state => ({
    hasRated: state.rate.hasRated
  });

export default connect(
    mapStateToProps,
    {rateClub, updateRateClub, sendNotificationAction},
  )(AddReview);

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
    ratingActionView: {
    marginBottom: 20,
    },
    submit: {
    width: 100,
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    
    },
    submitText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    textAlign: 'center',
    },
    errorMessage: {
    fontSize: 13,
    color: 'red',
    marginTop: 3
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 5,
      marginBottom: 5,
      height: 55,
      borderBottomWidth: 1
   },
   headerText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
  } 
})
