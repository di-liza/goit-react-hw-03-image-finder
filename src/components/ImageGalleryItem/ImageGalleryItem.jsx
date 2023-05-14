import React from 'react';
import { Item } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ webformatURL, tags }) {
  return (
    <Item>
      <a href={webformatURL} className="imgLink">
        <img src={webformatURL} alt={tags} className="itemImg" />
      </a>
    </Item>
  );
}
