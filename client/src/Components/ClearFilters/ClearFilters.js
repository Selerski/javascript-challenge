import React from 'react';
import { useDispatch } from 'react-redux';
import { getCoordinates, toggleFilter } from '../../redux/actions';

function ClearFilters({ mapRef }) {
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
}

export default ClearFilters;
