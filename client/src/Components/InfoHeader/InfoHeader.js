import React from 'react';
import { useSelector } from 'react-redux';

function InfoHeader() {
  const { features, filter } = useSelector(({ filteredData, applyFilter }) => {
    return { ...filteredData, ...applyFilter };
  });

  return (
    <div className="chart-info">
      {features.length === 0 ? (
        <h3 className="info-header">There are no ramps in your viewport.</h3>
      ) : (
        <h3 className="info-header">
          {filter && (
            <span>
              There {features.length > 1 ? 'are' : 'is'} {features.length}{' '}
              {features.length > 1 ? 'ramps' : 'ramp'} in this area.{' '}
            </span>
          )}
          {!filter && (
            <span>
              Your selection returned {features.length}{' '}
              {features.length === 1 ? 'ramp' : 'ramps'}.
            </span>
          )}
        </h3>
      )}
      <p>Click a chart element to filter results</p>
    </div>
  );
}

export default InfoHeader;
