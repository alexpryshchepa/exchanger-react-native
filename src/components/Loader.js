import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Spinner from 'react-native-spinkit';

export default function Loader () {  
  return (
    <View style={styles.container}>
      <Spinner
        isVisible={true}
        size={100}
        type='Bounce'
        color='#00fffe' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#273348',
  },
});