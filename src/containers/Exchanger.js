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
    
    let valueFrom = value;
    let valueTo = Math.round(Number(value)*this.props.ratesActive[this.props.currencyTo]*100)/100; // normalized value
    
    re.test(valueFrom) ? this.props.onHandleExchangeFrom(valueFrom, valueTo) : false
  }
  
  handleExchangeTo (value) {
    const re = /^([0-9]{1,}([\.]{1}([0-9]{1,2})?)?)?$/;
    
    let valueFrom = Math.round(Number(value)/this.props.ratesActive[this.props.currencyTo]*100)/100; // normalized value
    let valueTo = value;
    
    re.test(valueTo) ? this.props.onHandleExchangeTo(valueFrom, valueTo) : false
  }
  
  changePreset (currencyFrom, currencyTo) {
    let valueFrom = this.props.valueFrom;
    let ratesLocal = this.props.ratesLocal;
    let isRatesLocal = () => {
      if (currencyFrom in this.props.ratesLocal) {
        return true;
      }
      return false;
    };
    
    this.props.onChangePreset(isRatesLocal, ratesLocal, currencyFrom, valueFrom, currencyTo);
  }
  
  invertConverter () {
    let currencyFrom = this.props.currencyTo; // inverted value
    let valueFrom = this.props.valueFrom; 
    let currencyTo = this.props.currencyFrom; // inverted value
    let ratesLocal = this.props.ratesLocal;
    let isRatesLocal = () => {
      if (currencyFrom in this.props.ratesLocal) {
        return true;
      }
      return false;
    };
    
    this.props.onInvertConverter(isRatesLocal, ratesLocal, currencyFrom, valueFrom, currencyTo);
  }
  
  editPreset (e, index) {
    const width = 125;
    let indexStr = index.toString(); // convert to string for condition ||
    
    if (e.nativeEvent.locationX > width) {
      this.props.onEditPresetTo(!this.props.currencyListVisibility, 'edit-to', indexStr);
    } else {
      this.props.onEditPresetFrom(!this.props.currencyListVisibility, 'edit-from', indexStr);
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
          presets={this.props.presetsList}
          changePreset={this.changePreset.bind(this)}
          editPreset={this.editPreset.bind(this)} />
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    // data states
    ratesActive: state.data.ratesActive,
    ratesLocal: state.data.ratesLocal,
    
    // converter states
    currencyFrom: state.converter.currencyFrom,
    currencyTo: state.converter.currencyTo,
    valueFrom: state.converter.valueFrom,
    valueTo: state.converter.valueTo,
    
    // currencyList states
    currencyListVisibility: state.currencyList.visibility,
    
    // presets states
    presetsList: state.presets.list,
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
        const namesAbbr = [];
        
        for (let key in ratesLocal[currencyFrom].rates) {
          namesAbbr.push(String(key));
        }
        
        dispatch(actions.getRatesLocal(ratesLocal, namesAbbr, currencyFrom, valueFrom, currencyTo));
      } else {
        dispatch(actions.refreshFetch());
        dispatch(actions.getRates(currencyFrom, valueFrom, currencyTo));
      }
    },
    onInvertConverter: (isRatesLocal, ratesLocal, currencyFrom, valueFrom, currencyTo) => {
      if (isRatesLocal()) {
        const namesAbbr = [];
        
        for (let key in ratesLocal[currencyFrom].rates) {
          namesAbbr.push(String(key));
        }
        
        dispatch(actions.getRatesLocal(ratesLocal, namesAbbr, currencyFrom, valueFrom, currencyTo));
      } else {
        dispatch(actions.refreshFetch());
        dispatch(actions.getRates(currencyFrom, valueFrom, currencyTo));
      }
    },
    onEditPresetFrom: (visibility, type, preset) => {
      dispatch(actions.toggleCurrencyList(visibility, type, preset));
    },
    onEditPresetTo: (visibility, type, preset) => {
      dispatch(actions.toggleCurrencyList(visibility, type, preset));
    },
  })
)(Exchanger)