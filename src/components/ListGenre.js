import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Genre from './Genre';
import {getAllGenres} from '../actions/genreAction';

const ListGenre = ({items, item, closeModal, getAllGenres, genres}) => {
  const [genreList, setGenreList] = useState(items);

  useEffect(() => {
    getGenres();
  }, []);

  getGenres = async () => {
    await getAllGenres();
  };

  renderItem = ({item}) => (
    <Genre item={item} genrelist={genreList} />
  );

  onClosePress = () => {
    item(genreList);
    closeModal();
  };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.closeBtn}>
          <TouchableOpacity onPress={this.onClosePress}>
            <Ionicons
              name="md-close"
              size={30}
              style={{
                paddingRight: 20,
                color: '#e91e63',
                fontFamily: 'Nunito-BoldItalic',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignSelf: 'stretch', marginLeft: 20}}>
          <Text style={styles.title}>Select Genre</Text>
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
