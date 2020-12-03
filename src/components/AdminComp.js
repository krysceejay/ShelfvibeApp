import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity,Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import {updateClubPublic, updateClubPublish} from '../actions/clubActions';

const AdminComp = ({navigation, closeModal, clubid, updateClubPublic, updateClubPublish, publicStatus, publishStatus}) => {
    onClosePress = () => {
        closeModal();
      };

      goToPoll = () => {
        navigation.navigate('Poll', {
            clubid
          });
        closeModal();
      }

      goToReadingList = () => {
        navigation.navigate('Reading List', {
            clubid
          });
        closeModal();
      }

      setClubPublic = async () => {
        await updateClubPublic(clubid);
        closeModal();
      }

      setClubPublish = async () => {
        await updateClubPublish(clubid);
        closeModal();
      }

      shareBtn = async () => {
          const shareOptions = {
              message: 'This is a message',
          };

          try {
              const shareResponse = await Share.open(shareOptions);
          } catch (error) {
              console.log('Error => ', error);
          }
      }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <View style={styles.actionContainer}>
                    <TouchableOpacity onPress={goToPoll}>
                        <View style={styles.actionSingle}>
                            <MaterialCommunityIcons name="poll" size={22} color="#444444" />
                            <Text style={styles.actionText}>Poll</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToReadingList}>
                        <View style={styles.actionSingle}>
                        <MaterialCommunityIcons name="playlist-plus" size={22} color="#444444" />
                            <Text style={styles.actionText}>Reading List</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={setClubPublish}>
                        <View style={styles.actionSingle}>
                        <MaterialCommunityIcons name="file-eye" size={22} color="#444444" />
                            <Text style={styles.actionText}>
                                {publishStatus ? "Set as Draft" : "Set as publish"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={setClubPublic}>
                        <View style={styles.actionSingle}>
                        <MaterialCommunityIcons name="security" size={22} color="#444444" />
                            <Text style={styles.actionText}>
                                {publicStatus ? "Set as private" : "Set as public"}   
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={shareBtn}>
                        <View style={styles.actionSingle}>
                        <MaterialCommunityIcons name="share-variant" size={22} color="#444444" />
                            <Text style={styles.actionText}>Share Link</Text>
                        </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => {}}>
                        <View style={styles.actionSingle}>
                        <FontAwesome name="exclamation-triangle" size={22} color="#444444" />
                            <Text style={styles.actionText}>Report</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <TouchableOpacity style={styles.join} onPress={onClosePress}>
            <Text style={styles.joinText}>Cancel</Text>
          </TouchableOpacity> */}
            
        </SafeAreaView>
    )
}

export default connect(
    null,
    {updateClubPublic, updateClubPublish},
  )(AdminComp);

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        width: '55%',
        marginVertical: 10
      },
      body: {
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        padding: 15,
      },
      actionContainer: {
          //marginTop: 15
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
