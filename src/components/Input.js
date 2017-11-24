import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function Input (props) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={props.type === 'from' ? styles.inputFrom : styles.inputTo}
          underlineColorAndroid='rgba(0,0,0,0)'
          onChangeText={(value) => props.setValue(value)}
          value={props.value}
          keyboardType='numeric'
          maxLength={15} />
        <Text style={props.type === 'from' ? styles.valueFrom : styles.valueTo}>{props.value}</Text>
      </View>
      <TouchableOpacity
        style={styles.currencyContainer}
        onPress={() => props.openCurrencyList(props.type)}>
        <Text style={props.type === 'from' ? styles.currencyFrom : styles.currencyTo}>{props.currency}</Text>
        <Image
          style={styles.currencyChevron}
          source={props.type === 'from' ? require('../assets/images/chevron-primary.png') : require('../assets/images/chevron-secondary.png')} />
      </TouchableOpacity>
    </View>
  );
}

Input.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  onChangeText: PropTypes.func,
  openCurrencyList: PropTypes.func,
  setValue: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    marginRight: 20,
  },
  inputFrom: {
    width: '100%',
    height: 70,
    color: '#00fffe',
    fontSize: 36,
    textAlign: 'right',
    borderBottomWidth: 2,
    borderBottomColor: '#00fffe',
    marginBottom: 8,
  },
  inputTo: {
    width: '100%',
    height: 70,
    color: '#ff6068',
    fontSize: 36,
    textAlign: 'right',
    borderBottomWidth: 2,
    borderBottomColor: '#ff6068',
    marginBottom: 8,
  },
  valueFrom: {
    width: '100%',
    height: 16,
    lineHeight: 16,
    color: '#00fffe',
    fontSize: 12,
    textAlign: 'right',
  },
  valueTo: {
    width: '100%',
    height: 16,
    lineHeight: 16,
    color: '#ff6068',
    fontSize: 12,
    textAlign: 'right',
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -23,
  },
  currencyFrom: {
    color: '#00fffe',
    fontSize: 24,
  },
  currencyTo: {
    color: '#ff6068',
    fontSize: 24,
  },
  currencyChevron: {
    width: 12,
    height: 7,
    marginLeft: 10,
  }
});