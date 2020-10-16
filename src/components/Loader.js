import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loader = ({style}) => {
  return (
    <ActivityIndicator
      size={Platform.OS === 'ios' ? 'large' : 50}
      color="#ccc"
      style={style}
    />
  );
};

export default Loader;
