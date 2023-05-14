import React from 'react';
import { Item } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  webformatURL,
  onCardClick,
  tags,
  idCard,
}) {
  return (
    <>
      <Item>
        <img
          src={webformatURL}
          alt={tags}
          className="itemImg"
          loading="lazy"
          onClick={() => {
            onCardClick(idCard);
          }}
        />
      </Item>
    </>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired,
  idCard: PropTypes.number.isRequired,
};
