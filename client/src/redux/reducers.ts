import { ActionType, ActionKeywords} from '../util/types';
import { combineReducers } from 'redux';

const viewport = (
  state = {
    longitude: 153.4194977317928,
    latitude: -28.00917780964554,
    zoom: 10,
    bearing: 0,
    pitch: 0
  },
  action: ActionType
) => {
  switch (action.type) {
    case ActionKeywords.UPDATE_VIEWPORT:
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
  action: ActionType
) => {
  switch (action.type) {
    case ActionKeywords.UPDATE_MATERIAL_CHART:
      return {
        ...state,
        ...Object.assign(state.datasets[0].data, action.materialChartData)
      };
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
  action: ActionType
) => {
  switch (action.type) {
    case ActionKeywords.UPDATE_AREA_CHART:
      return {
        ...state,
        ...Object.assign(state.datasets[0].data, action.areaChartData)
      };
    default:
      return state;
  }
};

const applyFilter = (state = { filter: true }, action: ActionType) => {
  switch (action.type) {
    case ActionKeywords.APPLY_FILTER:
      return { filter: action.filter };
    default:
      return state;
  }
};

const features = (state = [], action: ActionType) => {
  switch (action.type) {
    case ActionKeywords.RECEIVE_COORDINATES:
      return [...action.features];
    case ActionKeywords.SET_FILTERED_DATA:
      return [...action.features];
    default:
      return state;
  }
};

const popupInfo = (state = null, action: ActionType) => {
  switch (action.type) {
    case ActionKeywords.SET_POPUP_INFO:
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
  features
});

export { rootReducer };
