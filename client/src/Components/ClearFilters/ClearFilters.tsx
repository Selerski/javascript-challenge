import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleFilter } from '../../redux/actions';
import { disableFilter } from './ClearFilter.styles';

const ClearFilters = () => {
  const dispatch = useDispatch();
  return (
    <button
      className={disableFilter}
      onClick={() => {
        dispatch(toggleFilter(true));
      }}
    >
      {' '}
      Clear Filters
    </button>
  );
};

export { ClearFilters };
