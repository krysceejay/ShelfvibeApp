import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const BorderButton = ({onpress, text}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          onpress();
        }}>
        <View style={styles.viewAll}>
          <Text style={styles.viewAllText}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BorderButton;

const styles = StyleSheet.create({
  viewAll: {
    backgroundColor: '#242c42',
    width: '30%',
    padding: 5,
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 25,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.0,
    elevation: 2,
  },
  viewAllText: {
    color: '#fff',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});
