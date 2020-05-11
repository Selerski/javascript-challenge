import React from 'react';
import { Maps } from './Containers/Maps/Maps';
import { Info } from './Containers/Info/Info';
import { dashboard } from './App.styles';

const App = () => {
  return (
    <div className={dashboard}>
      <Maps />
      <Info />
    </div>
  );
};

export { App };
