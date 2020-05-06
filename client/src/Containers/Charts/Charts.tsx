import React, { useEffect, FormEvent } from 'react';
import { updateCharts, setFilteredData } from '../../redux/actions';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import './Charts.css';
import { PropertyType } from 'src/Components/Markers/Markers';
import { useTypedSelector } from 'src/redux/reducers';

type ElemType = {
  _index: number;
  _chart: {
    tooltip: {
      _data: {
        labels: string;
      };
    };
  };
};

const chartConfig = {
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
    fontFamily: 'Chakra Petch'
  }
};

const Charts = () => {
  const dispatch = useDispatch();
  const {
    filteredData,
    materialChartData,
    areaChartData,
    applyFilter
  } = useTypedSelector((state) => state);

  useEffect(() => {
    if (filteredData !== null && applyFilter.filter) {
      dispatch(updateCharts(filteredData, materialChartData, areaChartData));
    }
  }, [filteredData, dispatch, materialChartData, areaChartData, applyFilter]);

  function handleMaterialChart(elems: ElemType[]) {
    if (elems[0]) {
      const filter = elems[0]._chart.tooltip._data.labels[elems[0]._index];

      const currentData = filteredData;
      const changedData = currentData.features.filter(
        ({ properties }: { properties: PropertyType }) =>
          properties.material === filter
      );
      currentData.features = changedData;
      dispatch(
        setFilteredData(currentData, materialChartData, areaChartData, false)
      );
    }
  }
  const handleAreaChart = (elems: ElemType[]) => {
    if (elems[0]) {
      const filter = elems[0]._chart.tooltip._data.labels[
        elems[0]._index
      ].split(' ')[0];

      const currentData = filteredData;
      const changedData = currentData.features.filter(
        ({ properties }: { properties: PropertyType }) => {
          if (filter === 'Small') {
            return properties.area_ < 50;
          } else if (filter === 'Medium') {
            return 50 <= properties.area_ && properties.area_ < 200;
          } else {
            return properties.area_ >= 200;
          }
        }
      );
      currentData.features = changedData;
      dispatch(
        setFilteredData(currentData, materialChartData, areaChartData, false)
      );
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <Doughnut
          data={materialChartData}
          options={{
            ...chartConfig,
            ...{
              title: {
                ...chartConfig.title,
                text: 'Ramps per construction material'
              }
            }
          }}
          onElementsClick={(elems) => handleMaterialChart(elems)}
        />
      </div>
      <div className="chart-wrapper">
        <Doughnut
          data={areaChartData}
          options={{
            ...chartConfig,
            ...{
              title: {
                ...chartConfig.title,
                text: 'Ramps per size category'
              }
            }
          }}
          onElementsClick={(elems) => handleAreaChart(elems)}
        />
      </div>
    </div>
  );
};

export default Charts;
