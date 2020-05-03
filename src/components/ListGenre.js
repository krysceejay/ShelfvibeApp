import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import Genre from './Genre';

const data = [
  {
    title: 'Romance',
    id: '1',
  },
  {
    title: 'Adventure',
    id: '2',
  },
  {
    title: 'Action',
    id: '3',
  },
  {
    title: 'Horror',
    id: '4',
  },
  {
    title: 'Biography',
    id: '5',
  },
  {
    title: 'Religious',
    id: '6',
  },
  {
    title: 'Sci-fi',
    id: '7',
  },
  {
    title: 'Rom-com',
    id: '8',
  },
  {
    title: 'Comedy',
    id: '9',
  },
  {
    title: 'Epic',
    id: '10',
  },
  {
    title: 'Moltivational',
    id: '11',
  },
  {
    title: 'Fiction',
    id: '12',
  },
  {
    title: 'Graphic Novel',
    id: '13',
  },
  {
    title: 'TV Show',
    id: '14',
  },
  {
    title: 'Story Book',
    id: '15',
  },
];

export default class ListGenre extends Component {
  state = {
    genreList: this.props.items,
  };

  renderItem = ({item}) => (
    <Genre item={item} genrelist={this.state.genreList} />
  );

  onClosePress = () => {
    this.props.item(this.state.genreList);
    this.props.closeModal();
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.closeBtn}>
          <TouchableOpacity onPress={this.onClosePress}>
            <Ionicons
              name="md-close"
              size={30}
              style={{
                paddingRight: 20,
                color: '#f53ba3',
                fontFamily: 'Nunito-BoldItalic',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignSelf: 'stretch', marginLeft: 20}}>
          <Text style={styles.title}>Select Genre</Text>
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingLeft: 10, paddingVertical: 12}}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  closeBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito-BoldItalic',
    //alignSelf: 'center',
    marginBottom: 16,
  },
});
