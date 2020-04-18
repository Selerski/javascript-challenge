import React, { useEffect } from 'react';
import { updateCharts, setFilteredData } from '../../redux/actions';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import './Charts.css';

const chartConfig = {
  legend: {
    position: 'left',
    onClick: (e) => e.stopPropagation(),
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

function Charts() {
  const dispatch = useDispatch();
  const {
    filteredData,
    materialChartData,
    areaChartData,
    applyFilter
  } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    if (filteredData !== null && applyFilter.filter) {
      dispatch(updateCharts(filteredData, materialChartData, areaChartData));
    }
  }, [filteredData, dispatch, materialChartData, areaChartData, applyFilter]);

  function handleMaterialChart(elems) {
    if (elems[0]) {
      let filter = elems[0]._chart.tooltip._data.labels[elems[0]._index];

      let currentData = filteredData;
      let changedData = currentData.features.filter(({ properties }) => {
        return properties.material === filter;
      });
      currentData.features = changedData;
      dispatch(
        setFilteredData(currentData, materialChartData, areaChartData, false)
      );
    }
  }
  function handleAreaChart(elems) {
    if (elems[0]) {
      let filter = elems[0]._chart.tooltip._data.labels[elems[0]._index].split(
        ' '
      )[0];

      let currentData = filteredData;
      let changedData = currentData.features.filter(({ properties }) => {
        if (filter === 'Small') {
          return properties.area_ < 50;
        } else if (filter === 'Medium') {
          return 50 <= properties.area_ && properties.area_ < 200;
        } else {
          return properties.area_ >= 200;
        }
      });
      currentData.features = changedData;
      dispatch(
        setFilteredData(currentData, materialChartData, areaChartData, false)
      );
    }
  }

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
}

export default Charts;
