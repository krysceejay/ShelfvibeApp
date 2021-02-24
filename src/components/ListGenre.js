import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Genre from './Genre';
import {getAllGenres} from '../actions/genreAction';

const ListGenre = ({items, item, closeModal, getAllGenres, genres}) => {
  const {colors} = useTheme();
  useEffect(() => {
    getGenres();
  }, []);

  getGenres = async () => {
    await getAllGenres();
  };

  renderItem = ({item}) => (
    <Genre item={item} genrelist={items} />
  );

  onClosePress = () => {
    item(items);
    closeModal();
  };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.closeBtn}>
          <Text style={[styles.title, {color: colors.text}]}>Select Genre</Text>
          <TouchableOpacity onPress={this.onClosePress}>
            <Ionicons
              name="md-close"
              size={30}
              color='#e91e63'
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignSelf: 'stretch', marginLeft: 20}}>
          <FlatList
            data={genres}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingLeft: 10, paddingVertical: 12}}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    );
  
}

const mapStateToProps = state => ({
  genres: state.genre.genres
});

export default connect(
  mapStateToProps,
  {getAllGenres},
)(ListGenre);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  closeBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito-BoldItalic',
  },
});
