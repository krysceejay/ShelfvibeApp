import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SidebarDropDown extends Component {
  state = {
    isSelected: false,
  };

  renderDetails = () => {
    return (
      <View>
        <Text style={styles.description}>Manage Shelf</Text>
        <Text style={styles.description}>Add To Shelf</Text>
        <Text style={styles.description}>Joined List</Text>
      </View>
    );
  };

  onPress = () => {
    return this.setState((prevState, prevProp) => ({
      isSelected: !prevState.isSelected,
    }));
  };

  render() {
    const {isSelected} = this.state;
    return (
      <View style={{flex: 1}}>
        {/* <Text>Add Book</Text>
              <Text>Join list</Text> */}
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={this.onPress}>
            <View style={styles.titleContainer}>
              <Text style={styles.text}>My Shelf</Text>
              <Icon name="angle-down" size={18} color="#e91e63" />
            </View>
          </TouchableWithoutFeedback>
          {isSelected && this.renderDetails()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    //backgroundColor: 'red',
  },
  text: {
    marginRight: 10,
  },
  description: {
    flex: 1,
    //fontSize: 20,
    paddingTop: 10,
    color: 'grey',
  },
});
