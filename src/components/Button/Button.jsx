import React from 'react';

export default function Button({ handleLoadMoreBTN }) {
  return (
    <button type="button" onClick={handleLoadMoreBTN}>
      Load More
    </button>
  );
}
