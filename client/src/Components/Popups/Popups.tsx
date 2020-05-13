import React from 'react';
import MapIcon from '@material-ui/icons/Map';
import { Popup } from 'react-map-gl';
import { setPopupInfo } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { popups } from './Popups.styles';
import { PopupInfoType } from '../../util/types';

const iconStyle = {
  fill: '#f44336'
};

const {
  popupWrapper,
  materialStyle,
  area,
  popupHeader,
  location,
  locationCoordinates
} = popups;

const Popups = ({ popupInfo }: { popupInfo: PopupInfoType | null }) => {
  const dispatch = useDispatch();
  const { area_, material, longitude, latitude } = popupInfo ?? {
    area_: 0,
    material: '',
    longitude: 0,
    latitude: 0
  };

  return (
    (popupInfo && (
      <Popup
        className={popupWrapper}
        tipSize={5}
        anchor="top"
        longitude={longitude}
        latitude={latitude}
        closeOnClick={false}
        onClose={() => dispatch(setPopupInfo(null))}
      >
        <div className={materialStyle}>
          <h3 className={popupHeader}>Material:</h3>
          <p>{material}</p>
        </div>
        <div className={area}>
          <h3 className={popupHeader}>Area:</h3>
          <p>
            {area_} m<sup>2</sup>
          </p>
        </div>
        <div className={location}>
          <MapIcon style={iconStyle} />
          <p className={locationCoordinates}>
            {latitude.toFixed(4)}° S, {longitude.toFixed(4)}° E
          </p>
        </div>
      </Popup>
    )) ??
    null
  );
};

export { Popups };
