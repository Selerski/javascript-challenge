import {
  ActionKeywords,
  RootState,
  FeatureType,
  ActionWithPayload,
  Viewport,
  PopupInfoType
} from '../util/types';
import { handleActions } from 'redux-actions';

const DEFAULT_STATE = {
  viewport: {
    longitude: 153.4194977317928,
    latitude: -28.00917780964554,
    zoom: 10,
    bearing: 0,
    pitch: 0
  },
  popupInfo: null,
  filter: true,
  features: []
};

const rootReducer = handleActions<RootState, any>(
  {
    [ActionKeywords.UPDATE_VIEWPORT]: (
      state,
      action: ActionWithPayload<Viewport>
    ) => {
      return { ...state, viewport: action.payload };
    },
    [ActionKeywords.APPLY_FILTER]: (
      state,
      action: ActionWithPayload<boolean>
    ) => {
      return { ...state, filter: action.payload };
    },
    [ActionKeywords.SET_POPUP_INFO]: (
      state,
      action: ActionWithPayload<PopupInfoType | null>
    ) => {
      return { ...state, popupInfo: action.payload };
    },
    [ActionKeywords.SET_FILTERED_DATA]: (
      state,
      action: ActionWithPayload<{ filter: boolean; features: FeatureType[] }>
    ) => {
      return {
        ...state,
        filter: action.payload.filter,
        features: [...action.payload.features]
      };
    },
    [ActionKeywords.RECEIVE_COORDINATES]: (
      state,
      action: ActionWithPayload<FeatureType[]>
    ) => {
      return {
        ...state,
        features: [...action.payload]
      };
    }
  },
  DEFAULT_STATE
);

export { rootReducer };
