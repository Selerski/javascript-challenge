import { Charts } from '../Charts/Charts';
import { InfoHeader } from '../../Components/InfoHeader/InfoHeader';
import React from 'react';
import { infoContainer } from './Info.styles';

const Info = () => {
  return (
    <div className={infoContainer}>
      <InfoHeader />
      <Charts />
    </div>
  );
};

export { Info };
