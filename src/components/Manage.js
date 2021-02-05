import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity,Alert, Modal } from 'react-native';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../utils/context';
import EditClub from './EditClub';
import {updateClubPublic, updateClubPublish} from '../actions/clubActions';

const Manage = ({closeModal, item, navigation, updateClubPublic, updateClubPublish}) => {
    const [edit, setEdit] = useState(false);

      goToPoll = () => {
        navigation.navigate('Poll', {
            clubid: item.id
          });
        closeModal();
      }

      goToReadingList = () => {
        navigation.navigate('Reading List', {
            clubid: item.id
          });
        closeModal();
      }

      setClubPublic = async () => {
        await updateClubPublic(item.id);
        closeModal();
      }

      setClubPublish = async () => {
        await updateClubPublish(item.id);
        closeModal();
      }

      handleOnEditItem = () => {
        setEdit(true);
      };
    
      handleOnCloseEditModal = () => {
        setEdit(false);
      };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
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
                     {item.publish ? "Set as Draft" : "Set as publish"}
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={setClubPublic}>
                <View style={styles.actionSingle}>
                <MaterialCommunityIcons name="security" size={22} color="#444444" />
                <Text style={styles.actionText}>
                    {item.public ? "Set as private" : "Set as public"}   
                </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOnEditItem}>
                <View style={styles.actionSingle}>
                <MaterialCommunityIcons name="square-edit-outline" size={22} color="#444444" />
                    <Text style={styles.actionText}>
                      Edit Or Delete
                    </Text>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={edit ? true : false}>
                <View style={styles.memberModalView}>
                    <EditClub
                    closeModal={handleOnCloseEditModal}
                    item={item}
                    />
                </View>
            </Modal>
            </View>
            
        </SafeAreaView>
    )
}


export default connect(
  null,
  {updateClubPublic, updateClubPublish},
)(Manage);

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        marginHorizontal: 12,
        justifyContent: 'center',
        width: '95%'
      },
      body: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
      },
      title: {
        fontSize: 18,
        fontFamily: 'Nunito-Bold',
      },
      shortText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 15,
        lineHeight: 23,
        marginTop: 10
      },
      actionSingle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      width: '100%',
      marginVertical: 12
    },
    actionText: {
      marginLeft: 20,
      fontSize: 14,
      fontFamily: 'Nunito-SemiBold',
    },
    memberModalView: {
        flex: 1,
        backgroundColor: '#fff',
    },
})
