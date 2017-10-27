import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class Refresh extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.primaryText}>Oops!</Text>
        <Text style={styles.secondaryText}>Something went wrong</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#273348',
  },
  primaryText: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  secondaryText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#273348',
    borderWidth: 2,
    borderColor: '#00fffe',
    borderStyle: 'solid',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 55,
  },
  buttonText: {
    color: '#00fffe',
    fontSize: 18,
  },
});