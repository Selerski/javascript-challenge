import React from 'react';
import Maps from './Containers/Maps/Maps';
import Info from './Containers/Info/Info';
import './App.css';
import { useTypedSelector } from './redux/reducers';

function App() {
  const { filteredData } = useTypedSelector((state) => state);
  return (
    <div className="dashboard">
      <Maps />
      {filteredData && <Info />}
    </div>
  );
}

export default App;
