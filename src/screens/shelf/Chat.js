import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RatingStarGroup from '../../components/RatingStarGroup';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check_textInputChange: false,
      password: '',
      secureTextEntry: true,
    };
  }

  textInputChange = value => {
    if (value.length !== 0) {
      this.setState({
        check_textInputChange: true,
      });
    } else {
      this.setState({
        check_textInputChange: false,
      });
    }
  };

  secureTextEntry = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  };
  render() {
    const content = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS == 'ios' ? 'padding' : null}
          enabled
          keyboardVerticalOffset={Platform.select({ios: 170, android: 500})}>
          <ScrollView>
            {content.map(num => (
              <View
                style={{
                  height: 80,
                  margin: 10,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                key={num}>
                <Text>{num}</Text>
              </View>
            ))}
          </ScrollView>
          <View
            style={{
              justifyContent: 'flex-end',
              backgroundColor: '#fff',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <RatingStarGroup />
            <TextInput
              style={{
                height: 40,
                width: '100%',
                backgroundColor: '#fff',
                paddingLeft: 10,
                //justifySelf: 'flex-end',
                //color: '#fff',
              }}
              placeholder={'Enter text here'}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'flex-end',
  },
  keyboardAvoidContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'orange',
  },
};
