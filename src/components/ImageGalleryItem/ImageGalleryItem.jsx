import React from 'react';
import { Item } from './ImageGalleryItem.styled';
// import Modal from '../Modal';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
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
