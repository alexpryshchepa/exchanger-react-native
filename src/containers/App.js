import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';

import Refresh from '../components/Refresh';
import Loader from '../components/Loader';
import CurrencyList from '../components/CurrencyList';
import Presets from '../components/Presets';
import Converter from '../components/Converter';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      currencyList: false,
    };
  }
  
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 3000)
  }
  
  openCurrencyList () {
    this.setState({
      currencyList: true,
    })
  }
  
  closeCurrencyList () {
    this.setState({
      currencyList: false,
    })
  }
  
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#273348'}}>
        {
          this.state.loading ? (
            <View style={{ zIndex: 3, position: 'absolute', top: 0, right: 0, bottom: 0, left: 1 }}>
              <Loader />
            </View>
          ) : null
        }
        {
          this.state.currencyList ? (
            <View style={{ zIndex: 2, position: 'absolute', top: 0, right: 0, bottom: 0, left: 1 }}>
              <CurrencyList closeCurrencyList={this.closeCurrencyList.bind(this)} />
            </View>
          ) : null
        }
        <ScrollView style={{ zIndex: 1 }}>
          <Converter openCurrencyList={this.openCurrencyList.bind(this)} />
          <Presets />
        </ScrollView>
      </View>
    );
  }
}
