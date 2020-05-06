import React, { MutableRefObject } from 'react';
import { useDispatch } from 'react-redux';
import { getCoordinates, toggleFilter } from '../../redux/actions';

const ClearFilters = ({ mapRef }: { mapRef: MutableRefObject<null> }) => {
  const dispatch = useDispatch();
  return (
    <button
      className="disable-filter"
      onClick={() => {
        dispatch(toggleFilter(true));
        dispatch(getCoordinates(mapRef));
      }}
    >
      {' '}
      Clear Filters
    </button>
  );
};

export default ClearFilters;
