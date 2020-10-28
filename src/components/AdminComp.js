import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AdminComp = (props) => {
    onClosePress = () => {
        props.closeModal();
      };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <View style={styles.actionContainer}>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={styles.actionSingle}>
                            <MaterialCommunityIcons name="poll" size={30} color="#444444" />
                            <Text style={styles.actionText}>Add a poll</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={styles.actionSingle}>
                        <MaterialCommunityIcons name="playlist-plus" size={30} color="#444444" />
                            <Text style={styles.actionText}>Add a book</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={styles.actionSingle}>
                        <MaterialCommunityIcons name="file-eye" size={30} color="#444444" />
                            <Text style={styles.actionText}>Set as publish</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={styles.actionSingle}>
                        <MaterialCommunityIcons name="security" size={30} color="#444444" />
                            <Text style={styles.actionText}>Set as private</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.join} onPress={onClosePress}>
            <Text style={styles.joinText}>Cancel</Text>
          </TouchableOpacity>
            
        </SafeAreaView>
    )
}

export default AdminComp;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        width: '95%',
      },
      body: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20
      },
      join: {
        //width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 25,
        marginBottom: 10,
        backgroundColor: '#fff',
        //marginHorizontal: 20,
      },
      joinText: {
        fontSize: 16,
        fontFamily: 'Nunito-SemiBold',
        color: '#000'
      },
      actionContainer: {
          marginTop: 15
      },
      actionSingle: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        width: '100%',
        marginVertical: 15
      },
      actionText: {
        marginLeft: 20,
        fontSize: 18,
        fontFamily: 'Nunito-SemiBold',
      }
})
