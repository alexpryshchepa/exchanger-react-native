import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function CurrencyList (props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroller}>
        <Text style={styles.title}>Select currency</Text>
        <TouchableOpacity 
          style={styles.close}
          onPress={props.closeCurrencyList}>
          <Image
            style={{width: 15, height: 15}}
            source={require('../assets/images/close.png')} />
        </TouchableOpacity>
        {
          props.names.map((name, index) => {
            return (
              <TouchableOpacity 
                style={styles.buttonCommon}
                key={index}
                onPress={() => props.currencyListStatus === 'edit'
                  ? props.editPresetCurrencyType(name)
                  : props.changeCurrencyType(name) }>
                <View 
                  style={styles.buttonInner}
                  pointerEvents='none'>
                  <Text style={styles.buttonCommonAbbr}>{name}</Text>
                  <Text 
                    style={styles.buttonCommonName}
                    numberOfLines={1}>{props.fullNames[name]}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  );
}

CurrencyList.propTypes = {
  list: PropTypes.array,
  changeCurrencyType: PropTypes.func,
  fullNames: PropTypes.object,
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
  buttonInner: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonCommon: {
    width: '100%',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#6e7a8f',
    borderRadius: 50,
    marginBottom: 20,
  },
  buttonCommonAbbr: {
    color: '#fff',
    fontSize: 24,
    marginRight: 14,
  },
  buttonCommonName: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
  },
});