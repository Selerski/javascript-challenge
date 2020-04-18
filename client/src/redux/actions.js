export const GET_VIEWPORT = 'GET_VIEWPORT';
export const RECEIVE_COORDINATES = 'RECEIVE_COORDINATES';
export const UPDATE_VIEWPORT = 'UPDATE_VIEWPORT';
export const UPDATE_MATERIAL_CHART = 'UPDATE_MATERIAL_CHART';
export const UPDATE_CHARTS = 'UPDATE_CHARTS';
export const GET_MATERIAL_CHART_DATA = 'GET_MATERIAL_CHART_DATA';
export const SET_FILTERED_DATA = 'SET_FILTERED_DATA';
export const APPLY_FILTER = 'APPLY_FILTER';
export const SET_POPUP_INFO = 'SET_POPUP_INFO';

export const getViewport = () => ({
  type: GET_VIEWPORT
});

export const updateViewport = (viewport) => ({
  type: UPDATE_VIEWPORT,
  viewport: viewport
});

export const updateCharts = (
  filteredData,
  materialChartData,
  areaChartData
) => (dispatch) => {
  let newMaterialData = [
    { Concrete: 0 },
    { Gravel: 0 },
    { Bitumen: 0 },
    { Other: 0 },
    { 'Interlock Conc Block': 0 },
    { Earth: 0 }
  ];
  let newAreaData = [{ Small: 0 }, { Medium: 0 }, { Large: 0 }];

  filteredData.features.forEach(({ properties }) => {
    const { material, area_ } = properties;

    const matIndex = newMaterialData.findIndex((obj) => {
      return Object.keys(obj)[0] === material;
    });

    const newNode = newMaterialData[matIndex];
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

export const getAreaChartData = () => ({
  type: GET_MATERIAL_CHART_DATA
});

export const updateAreaChart = (data) => ({
  type: UPDATE_MATERIAL_CHART,
  areaChartData: data
});

export const getMaterialChartData = () => ({
  type: GET_MATERIAL_CHART_DATA
});

export const updateMaterialChart = (data) => ({
  type: UPDATE_MATERIAL_CHART,
  materialChartData: data
});

export const receiveCoordinates = (data) => ({
  type: RECEIVE_COORDINATES,
  filteredData: data
});

export const toggleFilter = (bool) => ({
  type: APPLY_FILTER,
  filter: bool
});

export const newFilteredData = (data) => ({
  type: SET_FILTERED_DATA,
  filteredData: data
});

export const setFilteredData = (
  data,
  materialChartData,
  areaChartData,
  bool
) => (dispatch) => {
  dispatch(toggleFilter(bool));
  dispatch(newFilteredData(data));
  dispatch(updateCharts(data, materialChartData, areaChartData));
};

export const setPopupInfo = (popupInfo) => ({
  type: SET_POPUP_INFO,
  popupInfo
});

export const getCoordinates = (mapRef) => (dispatch) => {
  const currentView = mapRef.current.getMap();
  const { _sw, _ne } = currentView.getBounds();
  return fetch(
    `http://localhost:3000/data?filename=boat_ramps.geojson&fields[props]=type,material,area_&lowerBound=${_sw.lng},${_sw.lat}&upperBound=${_ne.lng},${_ne.lat}`
  )
    .then((response) => response.json())
    .then((data) => {
      dispatch(receiveCoordinates(data));
    })
    .catch((err) => console.log('An error occurred.', err));
};
