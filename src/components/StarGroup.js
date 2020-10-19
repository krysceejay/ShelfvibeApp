import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import Star from './Star';

const StarGroup = ({rating}) => {
  let stars = [];
  const numOfStarsArr = rating.split('.');
  const convertToNum = parseInt(numOfStarsArr[0]);
  const remainderPer = parseInt(numOfStarsArr[1]) * 10;

  numOfStars = () => {
    if (numOfStarsArr[1] == '0' || numOfStarsArr[1] == undefined) {
      for (let i = 0; i < 5; i++) {
        stars.push(
          <Star key={i} color={convertToNum > i ? '#e2cf00' : '#ddd'} />,
        );
      }
    } else {
      for (let i = 0; i < convertToNum; i++) {
        stars.push(<Star key={i} color="#e2cf00" />);
      }
      stars.push(
        <TouchableWithoutFeedback key={convertToNum}>
          <View>
            <Star color="#ddd" />
            <Star color="#e2cf00" pos="absolute" rate={remainderPer + '%'} />
          </View>
        </TouchableWithoutFeedback>,
      );
      const remainder = 5 - stars.length;
      if (remainder != 0) {
        for (let i = convertToNum + 1; i < 5; i++) {
          stars.push(<Star key={i} color="#ddd" />);
        }
      }
    }
  };
  numOfStars();
  return (
    <View style={styles.container}>
      {stars}
      {/* <View>
        <Star color="#ddd" />
        <Star color="#e2cf00" pos="absolute" rate="100%" />
      </View> */}
    </View>
  );
};

export default StarGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
