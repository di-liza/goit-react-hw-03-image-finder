import React from 'react';
import { LoadMoreBtn } from './Button.styled';

export default function Button({ handleLoadMoreBTN }) {
  return (
    <LoadMoreBtn type="button" onClick={handleLoadMoreBTN}>
      Load More
    </LoadMoreBtn>
  );
}
