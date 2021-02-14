import React, {useState, useContext} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import RatingStarGroup from '../../components/RatingStarGroup';
import {rateClub, updateRateClub} from '../../actions/rateActions';
import {sendNotificationAction} from '../../actions/notificationActions';
import {AuthContext} from '../../utils/context';


const AddReview = ({route, rateClub, updateRateClub, hasRated, navigation, sendNotificationAction}) => {
    const {clubid, ownerId} = route.params;
    const user = useContext(AuthContext);
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
        <SafeAreaView style={styles.container}>
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
                  backgroundColor: '#fff',
                  borderColor: '#ccc',
                  borderWidth: 2,
                }}>
                <TextInput
                  multiline
                  numberOfLines={2}
                  editable
                  placeholder="Review comment"
                  //maxLength={40}
                  style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    fontSize: 15,
                    color: '#333',
                  }}
                  value={userComment}
                  onChangeText={onChange('userComment')}
                />
              </View>
              {comment !== '' && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMessage}>{comment}</Text>
                </Animatable.View>
              )}
              <View style={{alignItems: 'flex-start'}}>
                <TouchableOpacity onPress={rateClubAction}>
                  <View style={styles.submit}>
                    <Text style={styles.submitText}>Submit</Text>
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
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 12,
      },
    ratingActionView: {
    marginBottom: 20,
    },
    submit: {
    backgroundColor: '#242c42',
    width: 100,
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
    },
    submitText: {
    color: '#fff',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    textAlign: 'center',
    },
    errorMessage: {
    fontSize: 13,
    color: 'red',
    marginTop: 3
    },
})
