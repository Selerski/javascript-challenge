import { ActionKeywords, FeatureType, PopupInfoType } from '../util/types';

import { ViewportProps } from 'react-map-gl';

export const updateViewport = (viewport: ViewportProps) => ({
  type: ActionKeywords.UPDATE_VIEWPORT,
  payload: viewport
});

export const receiveCoordinates = (features: FeatureType[]) => ({
  type: ActionKeywords.RECEIVE_COORDINATES,
  payload: features
});

export const toggleFilter = (filter: boolean) => ({
  type: ActionKeywords.APPLY_FILTER,
  payload: filter
});

export const newFilteredData = (features: FeatureType[], filter: boolean) => ({
  type: ActionKeywords.SET_FILTERED_DATA,
  payload: { features, filter }
});

export const setPopupInfo = (popupInfo: PopupInfoType | null) => ({
  type: ActionKeywords.SET_POPUP_INFO,
  payload: popupInfo
});
