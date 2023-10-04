import React from 'react';
import css from './App.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ gallery, onOpenModal }) => {
  const showGallery = Array.isArray(gallery);
  return (
    <ul className={css.imageGallery}>
      {showGallery &&
        gallery.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onOpenModal={onOpenModal}
          />
        ))}
    </ul>
  );
};
