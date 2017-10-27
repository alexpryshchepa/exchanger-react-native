import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Spinner from 'react-native-spinkit';

export default class Loader extends Component {  
  render() {
    return (
      <View style={styles.container}>
        <Spinner
          isVisible={true}
          size={100}
          type='Circle' // Bounce
          color='#00fffe' />
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
});