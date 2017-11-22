import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';

import Converter from '../components/Converter';
import Presets from '../components/Presets';

import GetRates from '../api/GetRates';

import * as actions from '../actions';

class Exchanger extends Component {
  handleExchangeFrom (value) {
    const re = /^([0-9]{1,}([\.]{1}([0-9]{1,2})?)?)?$/;
    
    const valueFrom = value;
    const valueTo = Math.round(Number(value)*this.props.rates[this.props.currencyTo]*100)/100; // normalized value
    
    re.test(valueFrom) ? this.props.onHandleExchangeFrom(valueFrom, valueTo) : false
  }
  
  handleExchangeTo (value) {
    const re = /^([0-9]{1,}([\.]{1}([0-9]{1,2})?)?)?$/;
    
    const valueFrom = Math.round(Number(value)/this.props.rates[this.props.currencyTo]*100)/100; // normalized value
    const valueTo = value;
    
    re.test(valueTo) ? this.props.onHandleExchangeTo(valueFrom, valueTo) : false
  }
  
  changePreset (currencyFrom, currencyTo) {
    const valueFrom = this.props.valueFrom;
    const ratesLocal = this.props.ratesLocal;
    const isRatesLocal = () => {
      if (currencyFrom in this.props.ratesLocal) {
        return true;
      }
      return false;
    };
    
    this.props.onChangePreset(isRatesLocal, ratesLocal, currencyFrom, valueFrom, currencyTo);
  }
  
  invertConverter () {
    const currencyFrom = this.props.currencyTo; // inverted value
    const currencyTo = this.props.currencyFrom; // inverted value
    const ratesLocal = this.props.ratesLocal;
    const isRatesLocal = () => {
      if (currencyFrom in this.props.ratesLocal) {
        return true;
      }
      return false;
    };
    
    this.props.onInvertConverter(isRatesLocal, ratesLocal, currencyFrom, this.props.valueFrom, currencyTo);
  }
  
  editPreset (e, index) {
    const width = 125;
    
    if (e.nativeEvent.locationX > width) {
      this.props.onEditPresetTo(!this.props.currencyList, 'edit-to', 'edit', index);
    } else {
      this.props.onEditPresetFrom(!this.props.currencyList, 'edit-from', 'edit', index);
    }
  }
  
  render() {
    return (
      <ScrollView>
        <Converter
          openCurrencyList={this.props.openCurrencyList}
          currencyFrom={this.props.currencyFrom}
          currencyTo={this.props.currencyTo}
          valueFrom={String(this.props.valueFrom)}
          valueTo={String(this.props.valueTo)}
          setValueFrom={this.handleExchangeFrom.bind(this)}
          setValueTo={this.handleExchangeTo.bind(this)}
          invertConverter={this.invertConverter.bind(this)} />
        <Presets
          presets={this.props.presets}
          changePreset={this.changePreset.bind(this)}
          editPreset={this.editPreset.bind(this)} />
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    rates: state.converter.rates,
    currencyFrom: state.converter.currencyFrom,
    currencyTo: state.converter.currencyTo,
    valueFrom: state.converter.valueFrom,
    valueTo: state.converter.valueTo,
    ratesLocal: state.converter.ratesLocal,
    presets: state.presets.list,
    currencyList: state.converter.currencyList,
  }),
  dispatch => ({
    onHandleExchangeFrom: (valueFrom, valueTo) => {
      dispatch(actions.handleExchange(valueFrom, valueTo));
    },
    onHandleExchangeTo: (valueFrom, valueTo) => {
      dispatch(actions.handleExchange(valueFrom, valueTo));
    },
    onChangePreset: (isRatesLocal, ratesLocal, currencyFrom, valueFrom, currencyTo) => {
      if (isRatesLocal()) {
        const names = [];
        for (let key in ratesLocal[currencyFrom].rates) {
          names.push(String(key));
        }
        
        dispatch(actions.getRatesLocal(ratesLocal, names, currencyFrom, valueFrom, currencyTo));
      } else {
        dispatch(actions.refreshFetch());
        dispatch(actions.getRates(currencyFrom, valueFrom, currencyTo));
      }
    },
    onInvertConverter: (isRatesLocal, ratesLocal, currencyFrom, valueFrom, currencyTo) => {
      if (isRatesLocal()) {
        const names = [];
        for (let key in ratesLocal[currencyFrom].rates) {
          names.push(String(key));
        }
        
        dispatch(actions.getRatesLocal(ratesLocal, names, currencyFrom, valueFrom, currencyTo));
      } else {
        dispatch(actions.refreshFetch());
        dispatch(actions.getRates(currencyFrom, valueFrom, currencyTo));
      }
    },
    onEditPresetFrom: (state, type, status, presetIndex) => {
      dispatch(actions.toggleCurrencyList(state, type, status, presetIndex));
    },
    onEditPresetTo: (state, type, status) => {
      dispatch(actions.toggleCurrencyList(state, type, status, presetIndex));
    },
  })
)(Exchanger)