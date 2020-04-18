import { combineReducers } from 'redux';
import {
  UPDATE_VIEWPORT,
  RECEIVE_COORDINATES,
  SET_FILTERED_DATA,
  UPDATE_MATERIAL_CHART,
  UPDATE_AREA_CHART,
  SET_POPUP_INFO,
  APPLY_FILTER
} from './actions';

const viewport = (
  state = {
    longitude: 153.4194977317928,
    latitude: -28.00917780964554,
    zoom: 10,
    bearing: 0,
    pitch: 0
  },
  action
) => {
  switch (action.type) {
    case UPDATE_VIEWPORT:
      return { ...state, ...action.viewport };
    default:
      return state;
  }
};

const materialChartData = (
  state = {
    labels: [
      'Concrete',
      'Gravel',
      'Bitumen',
      'Other',
      'Interlock Conc Block',
      'Earth'
    ],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#00695c',
          '#00897b',
          '#26a69a',
          '#1de9b6',
          '#64ffda',
          '#a7ffeb'
        ]
      }
    ]
  },
  action
) => {
  switch (action.type) {
    case UPDATE_MATERIAL_CHART:
      return { ...state, ...action.materialChartData };
    default:
      return state;
  }
};

const areaChartData = (
  state = {
    labels: [`Small (< 50 sq.m)`, 'Medium (< 200 sq.m)', 'Large (> 200 sq.m)'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#00695c', '#1de9b6', '#a7ffeb']
      }
    ]
  },
  action
) => {
  switch (action.type) {
    case UPDATE_AREA_CHART:
      return { ...state, ...action.areaChartData };
    default:
      return state;
  }
};

const applyFilter = (state = { filter: true }, action) => {
  switch (action.type) {
    case APPLY_FILTER:
      return { filter: action.filter };
    default:
      return state;
  }
};

const filteredData = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_COORDINATES:
      return { ...state, ...action.filteredData };
    case SET_FILTERED_DATA:
      return { ...state, ...action.filteredData };
    default:
      return state;
  }
};

const popupInfo = (state = null, action) => {
  switch (action.type) {
    case SET_POPUP_INFO:
      return action.popupInfo;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  viewport,
  materialChartData,
  areaChartData,
  popupInfo,
  applyFilter,
  filteredData
});

export default rootReducer;
