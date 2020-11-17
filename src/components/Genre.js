import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Genre extends Component {
  state = {
    //isSelected: false,
    genreListChild: this.props.genrelist,
  };

  render() {
    const {genreListChild} = this.state;
    const {item, genrelist} = this.props;
    const pushToList = () => {
      if (!genreListChild.includes(item.title)) {
        this.setState({
          genreListChild: [...this.state.genreListChild, item.title],
        });
        genrelist.push(item.title);
      } else {
        this.setState({
          genreListChild: this.state.genreListChild.filter(
            it => it != item.title,
          ),
        });
        const a = genrelist.indexOf(item.title);
        genrelist.splice(a, 1);
      }
    };
    return (
      <View style={styles.genreContainer}>
        <TouchableOpacity onPress={pushToList}>
          <Ionicons
            name={
              genreListChild.includes(item.title)
                ? 'ios-checkbox-outline'
                : 'ios-square-outline'
            }
            size={25}
            color={genreListChild.includes(item.title) ? '#e91e63' : '#666666'}
            style={{width: 32}}
          />
        </TouchableOpacity>
        <Text style={styles.genreText}>{item.title}</Text>
      </View>
    );
  }
}

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
