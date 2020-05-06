import React from 'react';
import MapIcon from '@material-ui/icons/Map';
import { Popup } from 'react-map-gl';
import { setPopupInfo } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export type PopupInfoType = {
  latitude: number;
  longitude: number;
  material: string;
  area_: number;
};

const Popups = ({ popupInfo }: { popupInfo: PopupInfoType }) => {
  const dispatch = useDispatch();
  const { latitude, longitude, material, area_ } = popupInfo;
  return (
    <Popup
      className="popup-wrapper"
      tipSize={5}
      anchor="top"
      longitude={longitude}
      latitude={latitude}
      closeOnClick={false}
      onClose={() => dispatch(setPopupInfo(null))}
    >
      <div className="material">
        <h3 className="popup-header">Material:</h3>
        <p>{material}</p>
      </div>
      <div className="area">
        <h3 className="popup-header">Area:</h3>
        <p>
          {area_} m<sup>2</sup>
        </p>
      </div>
      <div className="location">
        <MapIcon style={{ fill: '#f44336' }} />
        <p className="location-coordinates">
          {latitude.toFixed(4)}° S, {longitude.toFixed(4)}° E
        </p>
      </div>
    </Popup>
  );
};

export default Popups;
