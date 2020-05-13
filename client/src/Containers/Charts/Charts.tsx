import './Charts.styles.ts';

import {
  ElemType,
  FeatureType,
  NewChartData,
  ChartDataType,
  useStateSelector,
  MaterialChartKeys
} from '../../util/types';
import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { Doughnut } from 'react-chartjs-2';
import { charts } from './Charts.styles';
import { newFilteredData } from '../../redux/actions';

const { chartWrapper, chartContainer } = charts;

const materialChart: ChartDataType = {
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
};

const areaChart: ChartDataType = {
  labels: [`Small (< 50 sq.m)`, 'Medium (< 200 sq.m)', 'Large (> 200 sq.m)'],
  datasets: [
    {
      data: [],
      backgroundColor: ['#00695c', '#1de9b6', '#a7ffeb']
    }
  ]
};

const calculateData = (features: FeatureType[]) => {
  const newMaterialData: NewChartData = [
    { Concrete: 0 },
    { Gravel: 0 },
    { Bitumen: 0 },
    { Other: 0 },
    { 'Interlock Conc Block': 0 },
    { Earth: 0 }
  ];
  const newAreaData = [0, 0, 0];

  features.forEach(({ properties }) => {
    const area_: number = properties.area_;

    newMaterialData[MaterialChartKeys[properties.material]][
      properties.material
    ]++;

    if (area_ < 50) {
      newAreaData[0]++;
    } else if (area_ >= 50 && area_ < 200) {
      newAreaData[1]++;
    } else if (area_ >= 200 && area_ < 526) {
      newAreaData[2]++;
    }
  });

  areaChart.datasets[0].data = newAreaData ?? [];
  materialChart.datasets[0].data =
    newMaterialData.map((item) => Object.values(item)[0]) ?? [];

  return { areaChart, materialChart };
};

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
  const features = useStateSelector(({ features }) => features);
  const { areaChart, materialChart } = useStateSelector(({ features }) =>
    calculateData(features)
  );

  const handleMaterialChart = (elems: ElemType[]) => {
    const filter = elems[0]?._chart?.tooltip?._data?.labels[elems[0]?._index];

    if (filter) {
      const changedData = features.filter(
        ({ properties }) => properties.material === filter
      );
      dispatch(newFilteredData(changedData ?? [], changedData ? false : true));
    }
  };

  const handleAreaChart = (elems: ElemType[]) => {
    const filter = elems[0]?._chart?.tooltip?._data?.labels[
      elems[0]?._index
    ].split(' ')[0];

    if (filter) {
      const changedData = features.filter(({ properties }) => {
        if (filter === 'Small') {
          return properties.area_ < 50;
        } else if (filter === 'Medium') {
          return 50 <= properties.area_ && properties.area_ < 200;
        } else {
          return properties.area_ >= 200;
        }
      });

      dispatch(newFilteredData(changedData ?? [], changedData ? false : true));
    }
  };

  return (
    <div className={chartContainer}>
      <div className={chartWrapper}>
        <Doughnut
          data={materialChart}
          options={materialDoughnutConfig}
          onElementsClick={(elems) => handleMaterialChart(elems)}
        />
      </div>
      <div className={chartWrapper}>
        <Doughnut
          data={areaChart}
          options={areaDoughnutConfig}
          onElementsClick={(elems) => handleAreaChart(elems)}
        />
      </div>
    </div>
  );
};

export { Charts };
