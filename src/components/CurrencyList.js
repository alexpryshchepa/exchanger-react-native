import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class CurrencyList extends Component {  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroller}>
          <Text style={styles.title}>Select currency</Text>
          <TouchableOpacity 
            style={styles.close}
            onPress={this.props.closeCurrencyList}>
            <Image
              style={{width: 15, height: 15}}
              source={require('../assets/images/close.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonActive}>
            <Text style={styles.buttonActiveAbbreviation}>EUR</Text>
            <Text style={styles.buttonActiveName}>European euro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCommon}>
            <Text style={styles.buttonCommonAbbreviation}>ALL</Text>
            <Text style={styles.buttonCommonName}>Albanian lek</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCommon}>
            <Text style={styles.buttonCommonAbbreviation}>DZD</Text>
            <Text style={styles.buttonCommonName}>Algerian dinar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCommon}>
            <Text style={styles.buttonCommonAbbreviation}>ALL</Text>
            <Text style={styles.buttonCommonName}>Albanian lek</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCommon}>
            <Text style={styles.buttonCommonAbbreviation}>DZD</Text>
            <Text style={styles.buttonCommonName}>Algerian dinar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCommon}>
            <Text style={styles.buttonCommonAbbreviation}>ALL</Text>
            <Text style={styles.buttonCommonName}>Albanian lek</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCommon}>
            <Text style={styles.buttonCommonAbbreviation}>DZD</Text>
            <Text style={styles.buttonCommonName}>Algerian dinar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCommon}>
            <Text style={styles.buttonCommonAbbreviation}>ALL</Text>
            <Text style={styles.buttonCommonName}>Albanian lek</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCommon}>
            <Text style={styles.buttonCommonAbbreviation}>DZD</Text>
            <Text style={styles.buttonCommonName}>Algerian dinar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 35,
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 70,
    height: 70,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonActive: {
    width: '100%',
    backgroundColor: '#00fffe',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonActiveAbbreviation: {
    color: '#273348',
    fontSize: 24,
    marginRight: 14,
  },
  buttonActiveName: {
    color: '#273348',
    fontSize: 18,
  },
  buttonCommon: {
    width: '100%',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#6e7a8f',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonCommonAbbreviation: {
    color: '#fff',
    fontSize: 24,
    marginRight: 14,
  },
  buttonCommonName: {
    color: '#fff',
    fontSize: 18,
  },
});