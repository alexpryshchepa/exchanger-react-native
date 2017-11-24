import * as types from '../constants/ActionTypes';
import GetRates from '../api/GetRates';

export const getRates = (currencyFrom, valueFrom, currencyTo) => dispatch => GetRates(currencyFrom, function (data, namesAbbr) {
  dispatch({
    type: types.FETCH_RATES_SUCCESS,
    ratesActive: data.rates,
    namesAbbr: namesAbbr,
  });
  if (currencyTo) {
    const valueTo = data.rates[currencyTo] !== undefined 
      ? Math.round((data.rates[currencyTo]*valueFrom)*100)/100 // normalized value
      : valueFrom
    
    dispatch({
      type: types.CURRENCY_TO_CHANGED,
      currency: currencyTo,
      value: valueTo,
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
  dispatch({
    type: types.CURRENCY_FROM_CHANGED,
    currency: currencyFrom,
    value: valueFrom,
  });
}, function () {
  dispatch({
    type: types.APP_LOADING_FAIL,
    loading: false,
    refresh: true,
  });
});

export const getRatesLocal = (ratesLocal, namesAbbr, currencyFrom, valueFrom, currencyTo) => dispatch => {
  dispatch({
    type: types.GET_RATES_SUCCESS,
    ratesActive: ratesLocal[currencyFrom].rates,
    namesAbbr: namesAbbr,
  });
  dispatch({
    type: types.CURRENCY_FROM_CHANGED,
    currency: currencyFrom,
    value: valueFrom,
  });
  if (currencyTo) {
    const valueTo = ratesLocal[currencyFrom].rates[currencyTo] !== undefined // change
      ? Math.round((ratesLocal[currencyFrom].rates[currencyTo]*valueFrom)*100)/100 // change
      : valueFrom

    dispatch({
      type: types.CURRENCY_TO_CHANGED,
      currency: currencyTo,
      value: valueTo,
    })
  }
}

export const refreshFetch = () => ({
  type: types.APP_REFRESHING,
  loading: true,
  refresh: false,
});

export const toggleCurrencyList = (visibility, type, preset) => ({
  type: types.CURRENCY_LIST_VISIBILITY_CHANGED,
  visibility: visibility,
  listType: type || false,
  preset: preset || false,
});

export const handleExchange = (valueFrom, valueTo) => ({
  type: types.HANDLE_EXCHANGE_SUCCESS,
  valueFrom: valueFrom,
  valueTo: valueTo,
});

export const changeCurrencyFrom = (currency, value) => ({
  type: types.CURRENCY_FROM_CHANGED,
  currency: currency,
  value: value,
});

export const сhangeCurrencyTo = (currency, value) => ({
  type: types.CURRENCY_TO_CHANGED,
  currency: currency,
  value: value,
});

export const editPresetCurrency = (presetsList) => ({
  type: types.PRESET_CURRENCY_CHANGED,
  presets: presetsList,
});
