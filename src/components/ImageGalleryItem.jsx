import React from 'react';
import css from './App.module.css';

export const ImageGalleryItem = ({ image, onOpenModal }) => {
  return (
    <li
      onClick={() => onOpenModal(image.largeImageURL)}
      className={css.imageGalleryItem}
    >
      <img
        className={css.imageGalleryItemImage}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
};
