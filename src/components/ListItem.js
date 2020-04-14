import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  items: PropTypes.object,
};

export default class ListItem extends Component {
  state = {
    isSelected: false,
  };

  renderDetails = () => {
    return (
      <View>
        <Text style={styles.description}>{this.props.item.description}</Text>
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
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={styles.titleContainer}>
            <Text style={styles.text}>{this.props.item.title}</Text>
            <Text>Icon</Text>
          </View>
        </TouchableWithoutFeedback>
        {isSelected && this.renderDetails()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    flex: 1,
    fontSize: 22,
  },
  description: {
    flex: 1,
    fontSize: 20,
    paddingTop: 10,
    color: 'grey',
  },
});
