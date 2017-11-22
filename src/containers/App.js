import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  View,
  InteractionManager,
} from 'react-native';

import Exchanger from '../containers/Exchanger';

import Refresh from '../components/Refresh';
import Loader from '../components/Loader';
import CurrencyList from '../components/CurrencyList';

import GetRates from '../api/GetRates';

import * as actions from '../actions';

class App extends Component {
  componentDidMount () {
    const currencyFrom = this.props.currencyFrom;
    const valueFrom = this.props.valueFrom;
    const currencyTo = this.props.currencyTo;

    this.props.onRefreshFetch(currencyFrom, valueFrom, currencyTo);
  }
  
  // hack for preventing "Maximum update depth exceeded" error
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }
    
  refreshFetch () {
    const currencyFrom = this.props.currencyFrom;
    const valueFrom = this.props.valueFrom;
    const currencyTo = this.props.currencyTo;
    
    this.props.onRefreshFetch(currencyFrom, valueFrom, currencyTo);
  }
    
  toggleCurrencyList (type) {
    this.props.onToggleCurrencyList(!this.props.currencyList, typeof type === 'string' ? type : '' );
  }
    
  changeCurrencyType (curr) {
    const currency = curr;
    const currencyTo = this.props.currencyTo; // just for "onChangeCurrencyFrom" action
    const valueFrom = this.props.valueFrom;
    const valueTo = Math.round((this.props.rates[currency]*this.props.valueFrom)*100)/100; // normalized value
    const ratesLocal = this.props.ratesLocal;
    const isRatesLocal = () => {
      if (currency in this.props.ratesLocal) {
        return true;
      }
      return false;
    };
    
    this.props.currencyListType === 'from'
      ? this.props.onChangeCurrencyFrom(isRatesLocal, ratesLocal, currency, valueFrom, !this.props.currencyList, currencyTo)
      : this.props.onChangeCurrencyTo(isRatesLocal, ratesLocal, currency, valueTo, !this.props.currencyList)
  }
  
  editPresetCurrencyType (curr) {
    const currency = curr;
    const presets = this.props.presets;
    const presetIndex = this.props.presetIndex;
    
    this.props.currencyListType === 'edit-from'
      ? this.props.onEditPresetCurrencyFrom(!this.props.currencyList, presetIndex)
      : this.props.onEditPresetCurrencyTo(!this.props.currencyList, presetIndex)
  }
  
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#273348' }}>
        {
          this.props.loading ? (
            <View style={{ zIndex: 4, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
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
          this.props.currencyList ? (
            <View style={{ zIndex: 2, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
              <CurrencyList
                currencyListStatus={this.props.currencyListStatus}
                closeCurrencyList={this.toggleCurrencyList.bind(this)}
                changeCurrencyType={this.changeCurrencyType.bind(this)}
                editPresetCurrencyType={this.editPresetCurrencyType.bind(this)}
                names={this.props.names}
                fullNames={this.props.fullNames} />
            </View>
          ) : null
        }
        <View style={{ zIndex: 1 }}>
          <Exchanger openCurrencyList={this.toggleCurrencyList.bind(this)} />
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    loading: state.loading.loading,
    refresh: state.loading.refresh,
    currencyList: state.converter.currencyList,
    currencyListType: state.converter.currencyListType,
    currencyListStatus: state.converter.currencyListStatus,
    names: state.converter.names,
    fullNames: state.converter.fullNames,
    rates: state.converter.rates,
    currencyFrom: state.converter.currencyFrom,
    currencyTo: state.converter.currencyTo,
    valueFrom: state.converter.valueFrom,
    valueTo: state.converter.valueTo,
    ratesLocal: state.converter.ratesLocal,
    presets: state.presets.list,
    presetIndex: state.converter.currencyListPresetIndex,
  }),
  dispatch => ({
    onAppLoaded: (currencyFrom) => {
      dispatch(actions.getRates(currencyFrom));
    },
    onRefreshFetch: (currencyFrom, valueFrom, currencyTo) => {
      dispatch(actions.refreshFetch());
      dispatch(actions.getRates(currencyFrom, valueFrom, currencyTo));
    },
    onToggleCurrencyList: (state, type) => {
      dispatch(actions.toggleCurrencyList(state, type));
    },
    onChangeCurrencyFrom: (isRatesLocal, ratesLocal, currencyFrom, value, listState, currencyTo) => {
      if (isRatesLocal()) {
        const names = [];
        for (let key in ratesLocal[currencyFrom].rates) {
          names.push(String(key));
        }
        
        dispatch(actions.getRatesLocal(ratesLocal, names, currencyFrom, value, currencyTo));
      } else {
        dispatch(actions.refreshFetch());
        dispatch(actions.getRates(currencyFrom, value, currencyTo));
      }
      
      dispatch(actions.toggleCurrencyList(listState));
    },
    onChangeCurrencyTo: (isRatesLocal, ratesLocal, currencyTo, value, listState) => {
      dispatch(actions.сhangeCurrencyTo(currencyTo, value));
      dispatch(actions.toggleCurrencyList(listState));
    },
    onEditPresetCurrencyFrom: (listState, currency, presetIndex) => {
      dispatch(actions.editPresetCurrencyFrom(currency, presetIndex));
      dispatch(actions.toggleCurrencyList(listState));
    },
    onEditPresetCurrencyTo: (listState, currency, presetIndex) => {
      dispatch(actions.editPresetCurrencyTo(currency, presetIndex));
      dispatch(actions.toggleCurrencyList(listState));
    },
  })
)(App)