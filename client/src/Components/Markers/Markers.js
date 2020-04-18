import React from 'react';
import { Marker } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import { setPopupInfo } from '../../redux/actions';

function Markers({ data }) {
  const dispatch = useDispatch();

  function handleClick(properties, geometry) {
    return () =>
      dispatch(
        setPopupInfo({
          longitude: geometry.coordinates[0][0][0][0],
          latitude: geometry.coordinates[0][0][0][1],
          material: properties.material,
          area_: properties.area_
        })
      );
  }

  if (data) {
    return data.features.map(({ id, properties, geometry }) => (
      <Marker
        key={id}
        captureClick={true}
        material={properties.material}
        latitude={geometry.coordinates[0][0][0][1]}
        longitude={geometry.coordinates[0][0][0][0]}
      >
        <div
          onClick={handleClick(properties, geometry)}
          className="icon-wrapper"
        >
          <DirectionsBoatIcon
            style={{
              fill: '#424242',
              fontSize: 20
            }}
          />
        </div>
      </Marker>
    ));
  } else return null;
}

export default Markers;
