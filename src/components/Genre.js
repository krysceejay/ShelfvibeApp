import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Genre = ({genrelist, item}) => {
  const [genreListChild, setGenreListChild] = useState(genrelist);
  
    const pushToList = () => {
      if (!genreListChild.includes(item.name)) {
        setGenreListChild([...genreListChild, item.name]);
        genrelist.push(item.name);
      } else {
        setGenreListChild(genreListChild.filter(it => it != item.name));
        const a = genrelist.indexOf(item.name);
        genrelist.splice(a, 1);
      }
    };

    return (
      <View style={styles.genreContainer}>
        <TouchableOpacity onPress={pushToList}>
          <Ionicons
            name={
              genreListChild.includes(item.name)
                ? 'ios-checkbox-outline'
                : 'ios-square-outline'
            }
            size={25}
            color={genreListChild.includes(item.name) ? '#e91e63' : '#666666'}
            style={{width: 32}}
          />
        </TouchableOpacity>
        <Text style={styles.genreText}>{item.name}</Text>
      </View>
    );
  
}

export default Genre;

const styles = StyleSheet.create({
  genreContainer: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
    // height: 20,
    // width: 20,
  },
  genreText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    //margin: 8,
  },
});
