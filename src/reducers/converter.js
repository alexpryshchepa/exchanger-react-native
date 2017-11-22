import fullNames from '../api/FullNames';

const initialState = {
  rates: '',
  ratesLocal: {},
  names: [],
  fullNames: fullNames,
  currencyFrom: 'USD',
  currencyTo: 'RUB',
  valueFrom: '100',
  valueTo: '',
  currencyList: false,
  currencyListType: '',
  currencyListStatus: '',
  currencyListPresetIndex: 0,
};

export default function converter (state = initialState, action) {
  switch(action.type) {
    case 'FETCH_RATES_SUCCESS':
      return {
        ...state,
        rates: action.rates,
        names: action.names,
        currencyFrom: action.currencyFrom,
        valueFrom: action.valueFrom,
      }
      break
    case 'GET_RATES_SUCCESS':
      return {
        ...state,
        rates: action.rates,
        names: action.names,
        currencyFrom: action.currencyFrom,
        valueFrom: action.valueFrom,
      }
      break
    case 'PUSH_RATES_INTO_LOCAL_STORE_SUCCESS':
      return {
        ...state,
        ratesLocal: {
          ...state.ratesLocal,
          ...action.ratesLocal,
        },
      }
      break
    case 'TOGGLE_CURRENCY_LIST':
      return {
        ...state,
        currencyList: action.currencyList,
        currencyListType: action.currencyListType,
        currencyListStatus: action.currencyListStatus,
        currencyListPresetIndex: action.currencyListPresetIndex,
      }
      break
    case 'HANDLE_EXCHANGE_SUCCESS':
      return {
        ...state,
        valueFrom: action.valueFrom,
        valueTo: action.valueTo,
      }
      break
    case 'CURRENCY_FROM_CHANGED':
      return {
        ...state,
        currencyFrom: action.currencyFrom,
        valueFrom: action.valueFrom,
      }
      break
    case 'CURRENCY_TO_CHANGED':
      return {
        ...state,
        currencyTo: action.currencyTo,
        valueTo: action.valueTo,
      }
      break
    default:
      return state
  }
}