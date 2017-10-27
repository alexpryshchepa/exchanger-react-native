const initialState = {
  rates: '',
  names: [],
  inverted: false,
  currencyBase: '',
  currencyTo: '',
  valueBase: 1,
  valueTo: 1,
};

export default function converter (state = initialState, action) {
  switch(action.type) {
    case 'CLEAR_RATES':
      return {
        ...state,
        rates: action.rates,
      }
      break
      case 'FETCH_RATES_SUCCESS':
      return {
        ...state,
        rates: action.rates,
        names: action.names,
        currencyBase: action.currencyBase,
        valueBase: action.valueBase,
      }
      break
      case 'CHANGE_CURRENCY_BASE':
      return {
        ...state,
        currencyBase: action.currencyBase,
      }
      break
      case 'CHANGE_CURRENCY_TO':
      return {
        ...state,
        currencyTo: action.currencyTo,
        valueTo: action.valueTo,
      }
      break
      case 'INVERT_CONVERTER':
      return {
        ...state,
        inverted: action.inverted,
        currencyBase: action.currencyTo,
        currencyTo: action.currencyBase,
        valueBase: action.valueTo,
        valueTo: action.valueBase,
      }
      break
      case 'EXCHANGE':
      return {
        ...state,
        valueBase: action.valueBase,
        valueTo: action.valueTo,
      }
      break
      default:
      return state
  }
}