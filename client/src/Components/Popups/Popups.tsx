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

const Popups = ({ popupInfo }: { popupInfo: PopupInfoType }) => {
  const dispatch = useDispatch();
  const latitude = popupInfo?.latitude;
  const longitude = popupInfo?.longitude;
  const material = popupInfo?.material;
  const area_ = popupInfo?.area_;
  return (
    (popupInfo && (
      <Popup
        className={popups.popupWrapper}
        tipSize={5}
        anchor="top"
        longitude={longitude}
        latitude={latitude}
        closeOnClick={false}
        onClose={() => dispatch(setPopupInfo(null))}
      >
        <div className={popups.material}>
          <h3 className={popups.popupHeader}>Material:</h3>
          <p>{material}</p>
        </div>
        <div className={popups.area}>
          <h3 className={popups.popupHeader}>Area:</h3>
          <p>
            {area_} m<sup>2</sup>
          </p>
        </div>
        <div className={popups.location}>
          <MapIcon style={iconStyle} />
          <p className={popups.locationCoordinates}>
            {latitude.toFixed(4)}° S, {longitude.toFixed(4)}° E
          </p>
        </div>
      </Popup>
    )) ??
    null
  );
};

export { Popups };
