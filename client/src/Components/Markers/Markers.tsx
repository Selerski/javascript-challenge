import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import { Marker } from 'react-map-gl';
import React from 'react';
import { setPopupInfo } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { FeatureType } from '../../util/types';
import { iconWrapper } from './Markers.styles';

const boatStyles = {
  fill: '#424242',
  fontSize: 20
};

const Markers = ({ data }: { data: FeatureType[] }) => {
  const dispatch = useDispatch();

  return (
    <>
      {data.map(({ id, properties, geometry }) => (
        <Marker
          key={id}
          captureClick={true}
          latitude={geometry.coordinates[0][0][0][1]}
          longitude={geometry.coordinates[0][0][0][0]}
        >
          <div
            onClick={() =>
              dispatch(
                setPopupInfo({
                  longitude: geometry.coordinates[0][0][0][0],
                  latitude: geometry.coordinates[0][0][0][1],
                  material: properties.material,
                  area_: properties.area_
                })
              )
            }
            className={iconWrapper}
          >
            <DirectionsBoatIcon style={boatStyles} />
          </div>
        </Marker>
      ))}
    </>
  );
};

export { Markers };
