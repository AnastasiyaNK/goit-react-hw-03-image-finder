import React from 'react';
import css from './App.module.css';

export const Button = ({ handleLoadMore }) => {
  return (
    <button className={css.buttonLoad} onClick={handleLoadMore} type="button">
      Loade more
    </button>
  );
};
