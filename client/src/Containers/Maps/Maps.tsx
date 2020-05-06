import React, { useEffect, useRef } from 'react';
import MapGL, { NavigationControl } from 'react-map-gl';
import ClearFilters from '../../Components/ClearFilters/ClearFilters';
import Markers from '../../Components/Markers/Markers';
import Popups from '../../Components/Popups/Popups';
import { updateViewport, getCoordinates } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../redux/reducers';

const Maps = () => {
  const dispatch = useDispatch();
  const { filteredData, viewport, popupInfo, applyFilter } = useTypedSelector(
    (state) => state
  );

  const { filter } = applyFilter;

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef !== null && filter) {
      dispatch(getCoordinates(mapRef));
    }
  }, [mapRef, viewport, filter, dispatch]);

  return (
    <>
      <div style={{ width: '50vw', height: '60vh' }}>
        <MapGL
          ref={mapRef}
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          width="50vw"
          height="100vh"
          onViewportChange={(viewport) => dispatch(updateViewport(viewport))}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
        >
          <div style={{ position: 'absolute', right: 10, top: 10 }}>
            <NavigationControl
              onViewportChange={(viewport) =>
                dispatch(updateViewport(viewport))
              }
            />
          </div>
          {filteredData && <Markers data={filteredData} />}
          {popupInfo && <Popups popupInfo={popupInfo} />}
        </MapGL>
        {!filter && <ClearFilters mapRef={mapRef} />}
      </div>
    </>
  );
};

export default Maps;
