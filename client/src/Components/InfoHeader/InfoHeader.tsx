import React from 'react';
import { RootState } from '../../util/types';
import { infoHeader } from './InfoHeader.styles';
import { useSelector } from 'react-redux';

const InfoHeader = () => {
  const features = useSelector((state: RootState) => state.features);
  const filter = useSelector((state: RootState) => state.applyFilter.filter);

  return (
    <div className={infoHeader.infoContainer}>
      {features ? (
        <h3 className={infoHeader.infoWrapper}>
          {filter ? (
            <span>
              There {features.length > 1 ? 'are' : 'is'} {features.length}{' '}
              {features.length > 1 ? 'ramps' : 'ramp'} in this area.{' '}
            </span>
          ) : (
            <span>
              Your selection returned {features.length}{' '}
              {features.length === 1 ? 'ramp' : 'ramps'}.
            </span>
          )}
        </h3>
      ) : (
        <h3 className={infoHeader.infoWrapper}>
          There are no ramps in your viewport.
        </h3>
      )}
      <p>Click a chart element to filter results</p>
    </div>
  );
};

export { InfoHeader };
