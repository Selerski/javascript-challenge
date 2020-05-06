import React from 'react';
import { Marker } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import { setPopupInfo } from '../../redux/actions';
import { FilteredDataType } from 'src/redux/reducers';

export type PropertyType = {
  material: string;
  area_: number;
};
export type GeometryType = {
  coordinates: [[[number[]]]];
};

const Markers = ({ data }: { data: FilteredDataType }) => {
  const dispatch = useDispatch();

  function handleClick(properties: PropertyType, geometry: GeometryType) {
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

  return (
    <>
      {' '}
      {data
        ? data.features.map(({ id, properties, geometry }) => (
            <Marker
              key={id}
              captureClick={true}
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
          ))
        : null}
    </>
  );
};

export default Markers;
