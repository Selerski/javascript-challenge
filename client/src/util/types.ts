import { MutableRefObject } from 'react';
import { Action as ReduxAction } from 'redux-actions';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export type ChartDataType = {
  labels: string[];
  datasets: { data: number[]; backgroundColor: string[] }[];
};

export type NewChartData = { [name: string]: number }[];

export enum MaterialChartKeys {
  'Concrete',
  'Gravel',
  'Bitumen',
  'Other',
  'Interlock Conc Block',
  'Earth'
}

export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;

export enum ActionKeywords {
  GET_VIEWPORT = 'GET_VIEWPORT',
  RECEIVE_COORDINATES = 'RECEIVE_COORDINATES',
  UPDATE_VIEWPORT = 'UPDATE_VIEWPORT',
  UPDATE_MATERIAL_CHART = 'UPDATE_MATERIAL_CHART',
  UPDATE_AREA_CHART = 'UPDATE_AREA_CHART',
  SET_FILTERED_DATA = 'SET_FILTERED_DATA',
  APPLY_FILTER = 'APPLY_FILTER',
  SET_POPUP_INFO = 'SET_POPUP_INFO'
}

export type FeatureType = {
  id: string;
  geometry: { coordinates: [[[number[]]]] };
  properties: { area_: number; material: keyof typeof MaterialChartKeys };
};

export type ActionType = {
  type: string;
  viewport: MutableRefObject<null>;
  filter: boolean;
  features: FeatureType[];
  popupInfo: PopupInfoType | null;
};

export type Viewport = {
  longitude: number;
  latitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
};

export type RootState = {
  features: FeatureType[];
  viewport: Viewport;
  popupInfo: PopupInfoType | null;
  filter: boolean;
};

export declare type ActionWithPayload<T = void> = ReduxAction<T> & {
  type: string;
  payload: T;
  error?: any;
};

export type PopupInfoType = {
  latitude: number;
  longitude: number;
  material: string;
  area_: number;
};

export type GeometryType = {
  coordinates: [[[number[]]]];
};

export type ChartActions =
  | { type: string; materialChartData: number[][] }
  | { type: string; areaChartData: number[][] };

export type Features = { type: string; features: FeatureType[] };

export type ElemType = {
  _index: number;
  _chart: {
    tooltip: {
      _data: {
        labels: string;
      };
    };
  };
};
