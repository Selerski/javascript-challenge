import { Dispatch, MutableRefObject } from 'react';
import {
  FeatureType,
  PopupInfoType,
  ChartKeys,
  NewChartData,
  ChartActions,
  ActionKeywords,
  Data
} from '../util/types';
import { ViewportProps } from 'react-map-gl';

export const updateViewport = (viewport: ViewportProps) => ({
  type: ActionKeywords.UPDATE_VIEWPORT,
  viewport: viewport
});

export const updateAreaChart = (data: number[][]) => ({
  type: ActionKeywords.UPDATE_AREA_CHART,
  areaChartData: data
});

export const updateMaterialChart = (data: number[][]) => ({
  type: ActionKeywords.UPDATE_MATERIAL_CHART,
  materialChartData: data
});

export const receiveCoordinates = (data: FeatureType[]) => ({
  type: ActionKeywords.RECEIVE_COORDINATES,
  features: data
});

export const toggleFilter = (bool: boolean) => ({
  type: ActionKeywords.APPLY_FILTER,
  filter: bool
});

export const newFilteredData = (data: FeatureType[]) => ({
  type: ActionKeywords.SET_FILTERED_DATA,
  features: data
});

export const setPopupInfo = (popupInfo: PopupInfoType | null) => ({
  type: ActionKeywords.SET_POPUP_INFO,
  popupInfo
});

export const updateCharts = (features: FeatureType[]) => (
  dispatch: Dispatch<ChartActions>
) => {
  const newMaterialData: NewChartData = [
    { Concrete: 0 },
    { Gravel: 0 },
    { Bitumen: 0 },
    { Other: 0 },
    { 'Interlock Conc Block': 0 },
    { Earth: 0 }
  ];
  const newAreaData: NewChartData = [{ Small: 0 }, { Medium: 0 }, { Large: 0 }];

  features.forEach(({ properties }) => {
    const area_: number = properties.area_;
    const matName: keyof typeof ChartKeys = properties.material;
    const matIndex: number = ChartKeys[matName];

    newMaterialData[matIndex][matName]++;

    if (area_ < 50) {
      newAreaData[0].Small++;
    } else if (area_ >= 50 && area_ < 200) {
      newAreaData[1].Medium++;
    } else if (area_ >= 200 && area_ < 526) {
      newAreaData[2].Large++;
    }
  });

  dispatch(updateMaterialChart(newMaterialData.map((a) => Object.values(a))));
  dispatch(updateAreaChart(newAreaData.map((a) => Object.values(a))));
};

export const setFilteredData = (data: FeatureType[], bool: boolean) => (
  dispatch: Dispatch<Data>
) => {
  dispatch(toggleFilter(bool));
  dispatch(newFilteredData(data));
  dispatch(updateCharts(data));
};

export const getCoordinates = (mapRef: MutableRefObject<null | any>) => (
  dispatch: Dispatch<Data>
) => {
  if (mapRef !== null) {
    const { _sw, _ne } = mapRef.current.getMap()!.getBounds();
    return fetch(
      `http://localhost:3000/data?filename=boat_ramps.geojson&fields[props]=type,material,area_&lowerBound=${_sw.lng},${_sw.lat}&upperBound=${_ne.lng},${_ne.lat}`
    )
      .then((response) => response.json())
      .then(({ features }) => dispatch(receiveCoordinates(features)))
      .catch((err) => console.log('An error occurred.', err));
  }
};
