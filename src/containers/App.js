import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import Exchanger from '../containers/Exchanger';

import Refresh from '../components/Refresh';
import Loader from '../components/Loader';
import NoConnection from '../components/NoConnection';
import CurrencyList from '../components/CurrencyList';

import GetRates from '../api/GetRates';

import * as actions from '../actions';

class App extends Component {
  componentDidMount () {
    let currencyFrom = this.props.currencyFrom;
    let valueFrom = this.props.valueFrom;
    let currencyTo = this.props.currencyTo;

    this.props.onAppLoaded(currencyFrom, valueFrom, currencyTo);
  }
  
  // hack for preventing "Maximum update depth exceeded" error
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }
    
  refreshFetch () {
    let currencyFrom = this.props.currencyFrom;
    let valueFrom = this.props.valueFrom;
    let currencyTo = this.props.currencyTo;
    
    this.props.onRefreshFetch(currencyFrom, valueFrom, currencyTo);
  }
    
  openCurrencyList (type) {
    this.props.onToggleCurrencyList(!this.props.currencyListVisibility, type);
  }
  
  closeCurrencyList () {
    this.props.onToggleCurrencyList(!this.props.currencyListVisibility);
  }
    
  changeCurrencyType (curr) {
    let currency = curr;
    let currencyTo = this.props.currencyTo; // just for "onChangeCurrencyFrom" action
    let valueFrom = this.props.valueFrom;
    let valueTo = Math.round((this.props.ratesActive[currency]*this.props.valueFrom)*100)/100; // normalized value
    let ratesLocal = this.props.ratesLocal;
    let isRatesLocal = () => {
      if (currency in this.props.ratesLocal) {
        return true;
      }
      return false;
    };
    
    this.props.currencyListType === 'from'
      ? this.props.onChangeCurrencyFrom(isRatesLocal, ratesLocal, currency, valueFrom, currencyTo, !this.props.currencyListVisibility)
      : this.props.onChangeCurrencyTo(currency, valueTo, !this.props.currencyListVisibility)
  }
  
  editPresetCurrencyType (curr) {
    let currency = curr;
    let presetsList = this.props.presetsList;
    let preset = +this.props.currencyListPresetIndex; // convert to number
    
    if (this.props.currencyListType === 'edit-from') {
      let newPresetsList = presetsList.map((item, index) => {
        if (index === preset) {
          item.currencyFrom = currency;
        }
        return item;
      });
      
      this.props.onEditPresetCurrencyFrom(newPresetsList, !this.props.currencyListVisibility);
    } else {
      let newPresetsList = presetsList.map((item, index) => {
        if (index === preset) {
          item.currencyTo = currency;
        }
        return item;
      });
      
      this.props.onEditPresetCurrencyTo(newPresetsList, !this.props.currencyListVisibility);
    }
  }
  
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#273348' }}>
        {
          this.props.loading ? (
            <View style={{ zIndex: 3, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
              <Loader />
            </View>
          ) : null
        }
        {
          this.props.refresh ? (
            <View style={{ zIndex: 3, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
              <Refresh onPress={this.refreshFetch.bind(this)} />
            </View>
          ) : null
        }
        {
          false ? (
            <View style={{ zIndex: 3, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
              <NoConnection />
            </View>
          ) : null
        }
        {
          this.props.currencyListVisibility ? (
            <View style={{ zIndex: 2, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
              <CurrencyList
                namesAbbr={this.props.namesAbbr}
                namesFull={this.props.namesFull}
                currencyListType={this.props.currencyListType}
                closeCurrencyList={this.closeCurrencyList.bind(this)}
                changeCurrencyType={this.changeCurrencyType.bind(this)}
                editPresetCurrencyType={this.editPresetCurrencyType.bind(this)} />
            </View>
          ) : null
        }
        <View style={{ zIndex: 1 }}>
          <Exchanger openCurrencyList={this.openCurrencyList.bind(this)} />
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    // load states
    loading: state.reducers.load.loading,
    refresh: state.reducers.load.refresh,
    
    // data states
    ratesActive: state.reducers.data.ratesActive,
    ratesLocal: state.reducers.data.ratesLocal,
    namesAbbr: state.reducers.data.namesAbbr,
    namesFull: state.reducers.data.namesFull,
    
    // converter states
    currencyFrom: state.reducers.converter.currencyFrom,
    currencyTo: state.reducers.converter.currencyTo,
    valueFrom: state.reducers.converter.valueFrom,
    valueTo: state.reducers.converter.valueTo,
    
    // currencyList states
    currencyListVisibility: state.reducers.currencyList.visibility,
    currencyListType: state.reducers.currencyList.type,
    currencyListPresetIndex: state.reducers.currencyList.preset,
    
    // presets states
    presetsList: state.reducers.presets.list,
  }),
  dispatch => ({
    onAppLoaded: (currencyFrom, valueFrom, currencyTo) => {
      dispatch(actions.getRates(currencyFrom, valueFrom, currencyTo));
    },
    onRefreshFetch: (currencyFrom, valueFrom, currencyTo) => {
      dispatch(actions.refreshFetch());
      dispatch(actions.getRates(currencyFrom, valueFrom, currencyTo));
    },
    onToggleCurrencyList: (visibility, type) => {
      dispatch(actions.toggleCurrencyList(visibility, type));
    },
    onChangeCurrencyFrom: (isRatesLocal, ratesLocal, currencyFrom, valueFrom, currencyTo, currencyListState) => {
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
      
      dispatch(actions.toggleCurrencyList(currencyListState));
    },
    onChangeCurrencyTo: (currency, value, currencyListState) => {
      dispatch(actions.сhangeCurrencyTo(currency, value));
      dispatch(actions.toggleCurrencyList(currencyListState));
    },
    onEditPresetCurrencyFrom: (presetsList, currencyListState) => {
      dispatch(actions.editPresetCurrency(presetsList));
      dispatch(actions.toggleCurrencyList(currencyListState));
    },
    onEditPresetCurrencyTo: (presetsList, currencyListState) => {
      dispatch(actions.editPresetCurrency(presetsList));
      dispatch(actions.toggleCurrencyList(currencyListState));
    },
  })
)(App)