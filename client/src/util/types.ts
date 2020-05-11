import { MutableRefObject, Dispatch } from 'react';
import { ViewportProps } from 'react-map-gl';

export type ChartDataType = {
  datasets: { data: number[][] }[];
};

export type NewChartData = { [name: string]: number }[];

export enum ChartKeys {
  'Concrete',
  'Gravel',
  'Bitumen',
  'Other',
  'Interlock Conc Block',
  'Earth'
}

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
  properties: { area_: number; material: keyof typeof ChartKeys };
};

export type ActionType = {
  type: string;
  materialChartData: ChartDataType;
  areaChartData: ChartDataType;
  viewport: MutableRefObject<null>;
  filter: boolean;
  features: FeatureType[];
  popupInfo: PopupInfoType;
};

type ApplyFilter = {
  filter: boolean;
};

export type RootState = {
  features: FeatureType[];
  materialChartData: ChartDataType;
  areaChartData: ChartDataType;
  viewport: ViewportProps;
  popupInfo: PopupInfoType;
  applyFilter: ApplyFilter;
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

type ToggleType = {
  type: string;
  filter: boolean;
};
export type ChartActions =
  | { type: string; materialChartData: number[][] }
  | { type: string; areaChartData: number[][] };

type UpdateChartType = (dispatch: Dispatch<ChartActions>) => void;

type Features = { type: string; features: FeatureType[] };

export type Data = ToggleType | UpdateChartType | Features;

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
