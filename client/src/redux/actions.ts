import { Dispatch, MutableRefObject } from 'react';
import { ChartDataType, FilteredDataType } from './reducers';
import { PopupInfoType } from 'src/Components/Popups/Popups';
import { ViewportProps } from 'react-map-gl';

export const GET_VIEWPORT = 'GET_VIEWPORT';
export const RECEIVE_COORDINATES = 'RECEIVE_COORDINATES';
export const UPDATE_VIEWPORT = 'UPDATE_VIEWPORT';
export const UPDATE_MATERIAL_CHART = 'UPDATE_MATERIAL_CHART';
export const UPDATE_AREA_CHART = 'UPDATE_AREA_CHART';
export const SET_FILTERED_DATA = 'SET_FILTERED_DATA';
export const APPLY_FILTER = 'APPLY_FILTER';
export const SET_POPUP_INFO = 'SET_POPUP_INFO';

export const updateViewport = (viewport: ViewportProps) => ({
  type: UPDATE_VIEWPORT,
  viewport: viewport
});

export const updateAreaChart = (data: ChartDataType) => ({
  type: UPDATE_AREA_CHART,
  areaChartData: data
});

export const updateMaterialChart = (data: ChartDataType) => ({
  type: UPDATE_MATERIAL_CHART,
  materialChartData: data
});

export const receiveCoordinates = (data: FilteredDataType) => ({
  type: RECEIVE_COORDINATES,
  filteredData: data
});

export const toggleFilter = (bool: boolean) => ({
  type: APPLY_FILTER,
  filter: bool
});

export const newFilteredData = (data: FilteredDataType) => ({
  type: SET_FILTERED_DATA,
  filteredData: data
});

export const setPopupInfo = (popupInfo: PopupInfoType | null) => ({
  type: SET_POPUP_INFO,
  popupInfo
});

type NewChartData = { [name: string]: number }[];

export const updateCharts = (
  filteredData: FilteredDataType,
  materialChartData: ChartDataType,
  areaChartData: ChartDataType
) => (
  dispatch: Dispatch<typeof updateAreaChart | typeof updateMaterialChart>
) => {
  let newMaterialData: NewChartData = [
    { Concrete: 0 },
    { Gravel: 0 },
    { Bitumen: 0 },
    { Other: 0 },
    { 'Interlock Conc Block': 0 },
    { Earth: 0 }
  ];
  const newAreaData: NewChartData = [{ Small: 0 }, { Medium: 0 }, { Large: 0 }];

  filteredData.features.forEach(({ properties }) => {
    const { material, area_ } = properties;

    const matIndex = newMaterialData.findIndex(
      (obj) => Object.keys(obj)[0] === material
    );

    const newNode: { [propName: string]: number } = newMaterialData[matIndex];
    newNode[material]++;
    newMaterialData[matIndex] = newNode;

    if (area_ < 50) {
      const newNode = newAreaData[0];
      newNode.Small++;
      newAreaData[0] = newNode;
    } else if (area_ >= 50 && area_ < 200) {
      const newNode = newAreaData[1];
      newNode.Medium++;
      newAreaData[1] = newNode;
    } else if (area_ >= 200 && area_ < 526) {
      const newNode = newAreaData[2];
      newNode.Large++;
      newAreaData[2] = newNode;
    }
  });

  const newMaterialChartData = newMaterialData.map((a) => Object.values(a));
  const currentMaterialData = materialChartData;

  currentMaterialData.datasets[0].data = newMaterialChartData;

  const newAreaChartData = newAreaData.map((a) => Object.values(a));
  const currentAreaData = areaChartData;

  currentAreaData.datasets[0].data = newAreaChartData;

  dispatch(() => updateMaterialChart(currentMaterialData));
  dispatch(() => updateAreaChart(currentAreaData));
};

type ToggleType = {
  type: string;
  filter: boolean;
};
type NewFilteredData = {
  type: string;
  filteredData: FilteredDataType;
};

type UpdateChartType = (
  dispatch: Dispatch<typeof updateMaterialChart | typeof updateAreaChart>
) => void;

export const setFilteredData = (
  data: FilteredDataType,
  materialChartData: ChartDataType,
  areaChartData: ChartDataType,
  bool: boolean
) => (dispatch: Dispatch<UpdateChartType | ToggleType | NewFilteredData>) => {
  dispatch(toggleFilter(bool));
  dispatch(newFilteredData(data));
  dispatch(updateCharts(data, materialChartData, areaChartData));
};

type CoordinatesType = { type: string; filteredData: FilteredDataType };

export const getCoordinates = (mapRef: MutableRefObject<null | any>) => (
  dispatch: Dispatch<CoordinatesType>
) => {
  if (mapRef !== null) {
    const currentView = mapRef.current.getMap()!;
    const { _sw, _ne } = currentView.getBounds();
    return fetch(
      `http://localhost:3000/data?filename=boat_ramps.geojson&fields[props]=type,material,area_&lowerBound=${_sw.lng},${_sw.lat}&upperBound=${_ne.lng},${_ne.lat}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(receiveCoordinates(data));
      })
      .catch((err) => console.log('An error occurred.', err));
  }
};
