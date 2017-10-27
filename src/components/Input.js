import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: '100',
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={this.props.type === 'from' ? styles.inputFrom : styles.inputTo}
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            keyboardType='numeric' />
          <Text style={this.props.type === 'from' ? styles.valueFrom : styles.valueTo}>{this.state.text}</Text>
        </View>
        <TouchableOpacity
           style={styles.currencyContainer}
           onPress={this.props.openCurrencyList}>
          <Text style={this.props.type === 'from' ? styles.currencyFrom : styles.currencyTo}>{this.props.currency}</Text>
          <Image
            style={styles.currencyChevron}
            source={this.props.type === 'from' ? require('../assets/images/chevron-primary.png') : require('../assets/images/chevron-secondary.png')} />
        </TouchableOpacity>
      </View>
    );
  }
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