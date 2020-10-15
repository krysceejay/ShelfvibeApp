import React from 'react';
import {Dimensions, Linking} from 'react-native';
import HTML from 'react-native-render-html';

const HtmlReader = ({html}) => {
  return (
    <HTML
      html={html}
      imagesMaxWidth={Dimensions.get('window').width}
      onLinkPress={(event, href) => {
        Linking.openURL(href);
      }}
      tagsStyles={{
        a: {textDecorationLine: 'none'},
      }}
    />
  );
};

export default HtmlReader;
