import { combineReducers } from 'redux';

import data from './data';
import load from './load';
import converter from './converter';
import presets from './presets';
import currencyList from './currencyList';

export default combineReducers({
  data,
  load,
  converter,
  presets,
  currencyList,
});