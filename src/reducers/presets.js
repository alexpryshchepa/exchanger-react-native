const initialState = {
  list: [
    {
      currencyFrom: 'EUR',
      currencyTo: 'GBP',
    },
    {
      currencyFrom: 'CNY',
      currencyTo: 'CHF',
    },
  ],
};

export default function presets (state = initialState, action) {
  switch(action.type) {
    case 'PRESET_CURRENCY_FROM_CHANGED':
      return {
        ...state,
        list: action.presets,
      }
      break
    case 'PRESET_CURRENCY_TO_CHANGED':
      return {
        ...state,
        list: action.presets,
      }
      break
    default:
      return state
  }
}