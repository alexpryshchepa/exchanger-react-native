import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function NoConnection (props) {
  return (
    <View style={styles.container}>
      <Text style={styles.primaryText}>No Internet Connection!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={props.onPress}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

NoConnection.propTypes = {
  onPress: PropTypes.func,
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