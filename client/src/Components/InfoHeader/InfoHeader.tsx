import React from 'react';
import { useStateSelector } from '../../util/types';
import { infoHeader } from './InfoHeader.styles';

const { infoContainer, infoWrapper } = infoHeader;

const InfoHeader = () => {
  const featureLength = useStateSelector(({ features }) => features.length);
  const filter = useStateSelector(({ filter }) => filter);

  return (
    <div className={infoContainer}>
      {featureLength > 0 ? (
        <h3 className={infoWrapper}>
          {filter ? (
            <span>
              There {featureLength > 1 ? 'are' : 'is'} {featureLength}{' '}
              {featureLength > 1 ? 'ramps' : 'ramp'} in this area.{' '}
            </span>
          ) : (
            <span>
              Your selection returned {featureLength}{' '}
              {featureLength === 1 ? 'ramp' : 'ramps'}.
            </span>
          )}
        </h3>
      ) : (
        <h3 className={infoWrapper}>There are no ramps in your viewport.</h3>
      )}
      <p>Click a chart element to filter results</p>
    </div>
  );
};

export { InfoHeader };
