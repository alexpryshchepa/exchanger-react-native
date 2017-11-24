const initialState = {
  currencyFrom: 'USD',
  currencyTo: 'RUB',
  valueFrom: '100',
  valueTo: '',
};

export default function converter (state = initialState, action) {
  switch(action.type) {
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
        currencyFrom: action.currency,
        valueFrom: action.value,
      }
      break
    case 'CURRENCY_TO_CHANGED':
      return {
        ...state,
        currencyTo: action.currency,
        valueTo: action.value,
      }
      break
    default:
      return state
  }
}