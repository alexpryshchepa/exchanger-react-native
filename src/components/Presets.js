import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class Presets extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Exchange presets</Text>
        <TouchableOpacity style={styles.preset}>
          <Text style={styles.currencyFrom}>EUR</Text>
          <Image
            style={styles.arrows}
            source={require('../assets/images/arrows.png')} />
          <Text style={styles.currencyTo}>USD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preset}>
          <Text style={styles.currencyFrom}>GBP</Text>
          <Image
            style={styles.arrows}
            source={require('../assets/images/arrows.png')} />
          <Text style={styles.currencyTo}>USD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preset}>
          <Text style={styles.currencyFrom}>RUB</Text>
          <Image
            style={styles.arrows}
            source={require('../assets/images/arrows.png')} />
          <Text style={styles.currencyTo}>EUR</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#273348',
    paddingTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
  },
  preset: {
    width: 250,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#6e7a8f',
    borderRadius: 50,
    paddingVertical: 14,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyFrom: {
    color: '#00fffe',
    fontSize: 24,
  },
  currencyTo: {
    color: '#ff6068',
    fontSize: 24,
  },
  arrows: {
    width: 19,
    height: 24,
    marginLeft: 20,
    marginRight: 20,
  },
});