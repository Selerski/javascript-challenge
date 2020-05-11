import './Charts.styles.ts';

import React, { FormEvent, useEffect } from 'react';
import { setFilteredData, updateCharts } from '../../redux/actions';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import {
  FeatureType,
  ElemType,
  RootState
} from '../../util/types';
import { charts } from './Charts.styles';

const chartConfig = (text: string) => ({
  legend: {
    position: 'left',
    onClick: (e: FormEvent<HTMLInputElement>) => e.stopPropagation(),
    fontFamily: 'Chakra Petch'
  },
  cutoutPercentage: 80,
  rotation: -1.5 * Math.PI,
  title: {
    display: true,
    fontColor: '#00695c',
    position: 'top',
    fontSize: 16,
    fontFamily: 'Chakra Petch',
    text
  }
});

const materialDoughnutConfig = chartConfig('Ramps per construction material');
const areaDoughnutConfig = chartConfig('Ramps per surface area');

const Charts = () => {
  const dispatch = useDispatch();

  const features = useSelector((state: RootState) => state.features);
  const applyFilter = useSelector((state: RootState) => state.applyFilter);
  const materialChartData = useSelector(
    (state: RootState) => state.materialChartData
  );
  const areaChartData = useSelector((state: RootState) => state.areaChartData);

  useEffect(() => {
    if (features && applyFilter.filter) {
      dispatch(updateCharts(features));
    }
  }, [features, dispatch, applyFilter]);

  const handleMaterialChart = (elems: ElemType[]) => {
    const filter = elems[0]?._chart?.tooltip?._data?.labels[elems[0]?._index];

    if (filter) {
      const changedData = features.filter(
        ({ properties }: { properties: FeatureType['properties'] }) =>
          properties.material === filter
      );
      dispatch(setFilteredData(changedData, false));
    }
  };

  const handleAreaChart = (elems: ElemType[]) => {
    const filter = elems[0]?._chart?.tooltip?._data?.labels[
      elems[0]?._index
    ].split(' ')[0];

    if (filter) {
      const changedData = features.filter(
        ({ properties }: { properties: FeatureType['properties'] }) => {
          if (filter === 'Small') {
            return properties.area_ < 50;
          } else if (filter === 'Medium') {
            return 50 <= properties.area_ && properties.area_ < 200;
          } else {
            return properties.area_ >= 200;
          }
        }
      );
      dispatch(setFilteredData(changedData, false));
    }
  };

  return (
    <div className={charts.chartContainer}>
      <div className={charts.chartWrapper}>
        <Doughnut
          data={materialChartData}
          options={materialDoughnutConfig}
          onElementsClick={(elems) => handleMaterialChart(elems)}
        />
      </div>
      <div className={charts.chartWrapper}>
        <Doughnut
          data={areaChartData}
          options={areaDoughnutConfig}
          onElementsClick={(elems) => handleAreaChart(elems)}
        />
      </div>
    </div>
  );
};

export { Charts };
