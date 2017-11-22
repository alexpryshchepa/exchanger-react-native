import * as types from '../constants/ActionTypes';
import GetRates from '../api/GetRates';

export const getRates = (currencyFrom, valueFrom, currencyTo) => dispatch => GetRates(currencyFrom, function (data, names) {
  dispatch({
    type: types.FETCH_RATES_SUCCESS,
    rates: data.rates,
    names: names,
    currencyFrom: currencyFrom,
    valueFrom: valueFrom,
  });
  if (currencyTo) {
    const valueTo = data.rates[currencyTo] !== undefined 
      ? Math.round((data.rates[currencyTo]*valueFrom)*100)/100 // normalized value
      : valueFrom
    
    dispatch({
      type: types.CURRENCY_TO_CHANGED,
      currencyTo: currencyTo,
      valueTo: valueTo,
    })
  }
  dispatch({
    type: types.APP_LOADING_SUCCESS,
    loading: false,
  });
  dispatch({
    type: types.PUSH_RATES_INTO_LOCAL_STORE_SUCCESS,
    ratesLocal: {
      [currencyFrom]: data,
    },
  });
}, function () {
  dispatch({
    type: types.APP_LOADING_FAIL,
    loading: false,
    refresh: true,
  });
});

export const getRatesLocal = (ratesLocal, names, currencyFrom, valueFrom, currencyTo) => dispatch => {
  dispatch({
    type: types.GET_RATES_SUCCESS,
    rates: ratesLocal[currencyFrom].rates,
    names: names,
    currencyFrom: currencyFrom,
    valueFrom: valueFrom,
  });
  if (currencyTo) {
    const valueTo = ratesLocal[currencyFrom].rates[currencyTo] !== undefined // change
      ? Math.round((ratesLocal[currencyFrom].rates[currencyTo]*valueFrom)*100)/100 // change
      : valueFrom

    dispatch({
      type: types.CURRENCY_TO_CHANGED,
      currencyTo: currencyTo,
      valueTo: valueTo,
    })
  }
}

export const refreshFetch = () => ({
  type: types.APP_REFRESHING,
  loading: true,
  refresh: false,
});

export const toggleCurrencyList = (state, type, status, presetIndex) => ({
  type: types.TOGGLE_CURRENCY_LIST,
  currencyList: state,
  currencyListType: type,
  currencyListStatus: status,
  currencyListPresetIndex: presetIndex,
});

export const handleExchange = (valueFrom, valueTo) => ({
  type: types.HANDLE_EXCHANGE_SUCCESS,
  valueFrom: valueFrom,
  valueTo: valueTo,
});

export const changeCurrencyFrom = (currency, value) => ({
  type: types.CURRENCY_FROM_CHANGED,
  currencyFrom: currency,
  valueFrom: value,
});

export const сhangeCurrencyTo = (currency, value) => ({
  type: types.CURRENCY_TO_CHANGED,
  currencyTo: currency,
  valueTo: value,
});

export const editPresetCurrencyFrom = () => ({
  type: types.PRESET_CURRENCY_FROM_CHANGED,
  presets: [
    {
      currencyFrom: 'USD',
      currencyTo: 'MXN',
    },
    {
      currencyFrom: 'CNY',
      currencyTo: 'IDR',
    },
  ]
});

export const editPresetCurrencyTo = () => ({
  type: types.PRESET_CURRENCY_TO_CHANGED,
  presets: [
    {
      currencyFrom: 'PHP',
      currencyTo: 'GBP',
    },
    {
      currencyFrom: 'IDR',
      currencyTo: 'CNY',
    },
  ]
});
