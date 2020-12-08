import React, {useState} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import {reportClubAction} from '../../actions/clubActions';

const Report = ({route, reportClubAction, navigation}) => {
    const {clubid} = route.params;
    const [formData, setFormData] = useState({
        reportSubject: '',
        reportBody: '',
       });
 
     const [errorMsg, setErrorMsg] = useState({
       subject: '',
       body: '',
     });
 
       const {
        reportSubject,
        reportBody,
       } = formData;
 
     const {subject, body} = errorMsg;  
 
     const onChange = name => text => setFormData({...formData, [name]: text});

    reportClub = async () => {
    const userReportClub = await reportClubAction({
        clubid, 
        reportSubject,
        reportBody
        });

        if (userReportClub == 'failed' || Array.isArray(userReportClub)) {
        if (Array.isArray(userReportClub)) {
            const errMsges = {};
            userReportClub.forEach(item => {
            errMsges[item.field] = item.message;
            });
            setErrorMsg(errMsges);
        }
        } else {
        console.log('success');
        navigation.goBack();
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={true}
          extraHeight={10}>
              <View style={styles.inputContainer}>
                <View style={styles.singleInput}>
                  <Text style={styles.textLabel}>Subject</Text>
                  <TextInput 
                  placeholder="Enter subject" 
                  style={styles.textInput}
                  value={reportSubject}
                  onChangeText={onChange('reportSubject')} 
                  />
                  {subject !== '' && (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMessage}>{subject}</Text>
                    </Animatable.View>
                  )}
                </View>

                <View style={styles.singleInput}>
                  <Text style={styles.textLabel}>Body</Text>
                  <TextInput
                  multiline
                  numberOfLines={4}
                  editable
                  placeholder="Enter body"
                  maxLength={300}
                  style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    fontSize: 14,
                    color: '#333',
                  }}
                  value={reportBody}
                  onChangeText={onChange('reportBody')}
                />
                  {body !== '' && (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMessage}>{body}</Text>
                    </Animatable.View>
                  )}
                </View>
        
                <View style={styles.singleInput}>
                  <TouchableOpacity style={styles.signIn} activeOpacity={0.6} onPress={reportClub}>
                    <Text style={styles.textSign}>Report</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default connect(
    null,
    {reportClubAction},
  )(Report);

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      inputContainer: {
        marginTop: 10
     },  
    singleInput: {
     paddingHorizontal: 20,
     paddingVertical: 10,
    },
    textLabel: {
     fontSize: 16,
     fontFamily: 'Nunito-Regular',
     marginBottom: 5,
    },
    textInput: {
     fontFamily: 'Nunito-Regular',
     fontSize: 14,
     color: '#333',
     backgroundColor: '#fff',
     height: 50,
     paddingHorizontal: 10,
     borderColor: '#ddd', 
     borderWidth: 1 
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 2,
        alignSelf: 'center',
      },
      textSign: {
        fontSize: 18,
        fontFamily: 'Nunito-Bold',
      },
      errorMessage: {
        fontSize: 13,
        color: 'red',
        marginTop: 3
      },
})
