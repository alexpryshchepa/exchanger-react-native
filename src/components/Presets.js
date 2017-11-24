import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function Presets (props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exchange presets</Text>
      {
        props.presets.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.preset}
              onPress={() => props.changePreset(item.currencyFrom, item.currencyTo)}
              onLongPress={(e) => props.editPreset(e, index)}>
              <View 
                style={styles.presetInner}
                pointerEvents='none'>
                <Text style={styles.currencyFrom}>{item.currencyFrom}</Text>
                <Image
                  style={styles.arrows}
                  source={require('../assets/images/arrows.png')} />
                <Text style={styles.currencyTo}>{item.currencyTo}</Text>
              </View>
            </TouchableOpacity>
          )
        })
      }
      <Text style={styles.hint}>To change preset, press and hold the currency you want to change.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#273348',
    paddingVertical: 20,
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
    marginBottom: 20,
  },
  presetInner: {
    paddingVertical: 14,
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
  hint: {
    color: '#6e7a8f',
    fontSize: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
  }
});