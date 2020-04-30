import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AddShelf extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>E-Mail</Text>
            <TextInput
              placeholder="Your first name..."
              style={styles.textInput}
            />
          </View>
          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>E-Mail</Text>
            <TextInput
              placeholder="Your first name..."
              style={styles.textInput}
            />
          </View>
          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>E-Mail</Text>
            <TextInput
              placeholder="Your first name..."
              style={styles.textInput}
            />
          </View>
          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>E-Mail</Text>
            <TextInput
              placeholder="Your first name..."
              style={styles.textInput}
            />
          </View>
          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>E-Mail</Text>
            <TextInput
              placeholder="Your first name..."
              style={styles.textInput}
            />
          </View>
          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>E-Mail</Text>
            <TextInput
              placeholder="Your first name..."
              style={styles.textInput}
            />
          </View>
          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>E-Mail</Text>
            <TextInput
              placeholder="Your first name..."
              style={styles.textInput}
            />
          </View>
          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>E-Mail</Text>
            <TextInput
              placeholder="Your first name..."
              style={styles.textInput}
            />
          </View>
          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>E-Mail</Text>
            <TextInput
              placeholder="Your first name..."
              style={styles.textInput}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'red',
  },
  singleInput: {
    padding: 20,
  },
  textLabel: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },
  textInput: {
    fontFamily: 'Nunito-Regular',
    fontSize: 18,
    color: '#333',
  },
});
