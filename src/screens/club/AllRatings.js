import React from 'react';
import {Text, StyleSheet, View, FlatList, SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarGroup from '../../components/StarGroup';

const numColumns = 1;

const AllRatings = ({route, navigation}) => {
  const {rating} = route.params;
  const {dark, colors} = useTheme();

  _renderItem = ({item, index}) => {
    return (
      <View style={[styles.item, {backgroundColor: colors.card}]}>
        <View style={styles.reviewTop}>
          <StarGroup rating={item.rating.toString()} />
          <Text style={[styles.reviewDate, {color: colors.text}]}>{item.updatedAt}</Text>
        </View>
        <View>
          <Text style={[styles.reviewText, {color: colors.text}]}>{item.comment}</Text>
        </View>
        <Text style={[styles.reviewUser, {color: colors.text}]}>By {item.user.username}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1,}}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <View style={[styles.header, {borderBottomColor: colors.borderBottomColor}]}>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}
          style={{
            paddingHorizontal: 3,
            marginRight: 38
          }}
            activeOpacity={0.9}>
            <AntDesign
              name="left"
              size={28}
              color={colors.icon}
              />
          </TouchableOpacity>
          <Text style={[styles.headerText, {color: colors.text}]}>All Ratings</Text>
        </View>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
      <FlatList
        data={rating}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        contentContainerStyle={{paddingVertical: 15}}
        //showsVerticalScrollIndicator={false}
      />
      </View>
    </SafeAreaView>
  );
};

export default AllRatings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    //marginVertical: 15,
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
    marginVertical: 5,
    padding: 15,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
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
  reviewUser: {
    textAlign: 'right',
    fontFamily: 'Nunito-Italic',
    fontSize: 12,
    marginTop: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
    //marginBottom: 5,
    height: 55,
    borderBottomWidth: 1
 },
  headerText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
  }
});
