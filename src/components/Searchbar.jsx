import React from 'react';
import css from './App.module.css';

export const Searchbar = ({ handleSearch }) => {
  const onFormSubmit = event => {
    event.preventDefault();
    const searchQuery = event.currentTarget.elements.search.value;
    handleSearch(searchQuery);
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={onFormSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          name="search"
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
