import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import ListItem from './ListItem';

const data = [
  {
    description: 'yes me 1',
    title: 'First Item',
    id: 'bd7acbea-c1b1-46c2-aed5-3dd53abb28ba',
  },
  {
    description: 'yes me 2',
    title: 'Second Item',
    id: 'bd7acbea-c1b1-46c2-aed5-3ad43abb28ba',
  },
  {
    description: 'yes me 3',
    title: 'Third Item',
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abj28ba',
  },
];

export default class List extends Component {
  renderItem = ({item}) => <ListItem item={item} />;
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    paddingTop: 50,
  },
});
