import React, { MutableRefObject } from 'react';
import { useDispatch } from 'react-redux';
import { getCoordinates, toggleFilter } from '../../redux/actions';
import { disableFilter } from './ClearFilter.styles';

const ClearFilters = ({ mapRef }: { mapRef: MutableRefObject<null> }) => {
  const dispatch = useDispatch();
  return (
    <button
      className={disableFilter}
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

export { ClearFilters };
