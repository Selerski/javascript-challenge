import React, { useEffect, useRef, MutableRefObject } from 'react';
import MapGL, { NavigationControl } from 'react-map-gl';
import { ClearFilters } from '../../Components/ClearFilters/ClearFilters';
import { Markers } from '../../Components/Markers/Markers';
import { Popups } from '../../Components/Popups/Popups';
import { updateViewport, receiveCoordinates } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useStateSelector } from 'src/util/types';

const Maps = () => {
  const dispatch = useDispatch();

  const features = useStateSelector(({ features }) => features);
  const viewport = useStateSelector(({ viewport }) => viewport);
  const popupInfo = useStateSelector(({ popupInfo }) => popupInfo);
  const filter = useStateSelector(({ filter }) => filter);

  const mapRef = useRef<null>(null);

  useEffect(() => {
    const fetchData = (mapRef: MutableRefObject<null | any>) => {
      const { _sw, _ne } = mapRef.current.getMap().getBounds();
      return fetch(
        `http://localhost:3000/data?filename=boat_ramps.geojson&fields[props]=type,material,area_&lowerBound=${_sw.lng},${_sw.lat}&upperBound=${_ne.lng},${_ne.lat}`
      )
        .then((response) => response.json())
        .then(({ features }) => dispatch(receiveCoordinates(features)))
        .catch((err) => console.log('An error occurred.', err));
    };
    if (mapRef !== null && filter) {
      fetchData(mapRef);
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
          <Markers data={features} />
          <Popups popupInfo={popupInfo} />
        </MapGL>
        {!filter && <ClearFilters />}
      </div>
    </>
  );
};

export { Maps };
