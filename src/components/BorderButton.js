import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';

const BorderButton = ({onpress, text}) => {
  const {colors} = useTheme();
  return (
    <View style={{alignItems: 'flex-start'}}>
      <TouchableOpacity
        onPress={() => {
          onpress();
        }}>
        <View style={[styles.viewAll, {borderColor: colors.border, backgroundColor: colors.background}]}>
          <Text style={[styles.viewAllText, {color: colors.text}]}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BorderButton;

const styles = StyleSheet.create({
  viewAll: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderWidth: 1,
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
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});
