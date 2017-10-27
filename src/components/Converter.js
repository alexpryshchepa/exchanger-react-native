import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import Input from './Input';

export default class Converter extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroller}>
          <Text style={styles.title}>Current rates</Text>
          <Input
            type='from'
            currency='EUR'
            openCurrencyList={this.props.openCurrencyList} />
          <TouchableOpacity style={styles.invert}>
            <Image
              style={{width: 19, height: 24, transform: [{ rotate: '90deg'}]}}
              source={require('../assets/images/arrows.png')} />
          </TouchableOpacity>
          <Input
            type='to'
            currency='RUB'
            openCurrencyList={this.props.openCurrencyList} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#273348',
  },
  scroller: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  title: {
    color: '#6e7a8f',
    fontSize: 18,
    marginBottom: 25,
  },
  invert: {
    marginTop: -12,
    marginBottom: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#6e7a8f',
    borderRadius: 200,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
});