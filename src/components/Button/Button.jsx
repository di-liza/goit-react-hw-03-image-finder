import React from 'react';
import { LoadMoreBtn } from './Button.styled';
import PropTypes from 'prop-types';

export default function Button({ handleLoadMoreBTN }) {
  return (
    <LoadMoreBtn type="button" onClick={handleLoadMoreBTN}>
      Load More
    </LoadMoreBtn>
  );
}

Button.propTypes = {
  handleLoadMoreBTN: PropTypes.func.isRequired,
};
