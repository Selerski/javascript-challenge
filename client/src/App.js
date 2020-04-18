import React from 'react';
import Maps from './Containers/Maps/Maps';
import Info from './Containers/Info/Info';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const { filteredData } = useSelector((state) => {
    return state;
  });

  return (
    <div className="dashboard">
      <Maps />
      {filteredData && <Info />}
    </div>
  );
}

export default App;
