import React from 'react';
import {Text, StyleSheet, View, FlatList, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const renderSwitch = param => {
  switch (param) {
    case 0:
      return (
        <Text style={[styles.reviewStatus, {color: '#818182'}]}>
          coming soon
        </Text>
      );
    case 1:
      return (
        <Text style={[styles.reviewStatus, {color: '#155724'}]}>on-going</Text>
      );
    case 2:
      return (
        <Text style={[styles.reviewStatus, {color: '#721c24'}]}>done</Text>
      );
    default:
      break;
  }
};

const Topics = ({dataList}) => {
  _renderItem = ({item, index, arr}) => {
    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.reviewText}>{item.topicText}</Text>
        </View>
        {renderSwitch(item.topicStatus)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.descriptionHead}>Topics</Text>
      <FlatList
        data={dataList}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        ListEmptyComponent={() => <Text>No topic yet</Text>}
        //showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Topics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingVertical: 15,
    //paddingHorizontal: 20,
    //backgroundColor: '#fff',
  },
  reviewTitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    //marginHorizontal: 20,
    marginVertical: 10,
  },
  item: {
    //flex: 1,
    marginVertical: 10,
    padding: 15,
    width: width - 120,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  reviewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  reviewDate: {
    fontFamily: 'Nunito-Italic',
    fontSize: 14,
  },
  reviewText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    lineHeight: 24,
  },
  reviewStatus: {
    textAlign: 'right',
    fontFamily: 'Nunito-Italic',
    fontSize: 12,
    marginTop: 5,
  },
  descriptionHead: {
    fontFamily: 'Nunito-SemiBoldItalic',
    fontSize: 18,
    color: '#444444',
    marginVertical: 10,
  },
});
