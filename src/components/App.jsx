import React, { Component } from 'react';
import { Searchbar } from './Searchbar';
import css from './App.module.css';
import { fetchImages } from 'services/api';
import { ColorRing } from 'react-loader-spinner';
import { Modal } from './Modal';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    error: null,
    gallery: [],
    totalImage: 0,
    isLoading: false,
    modal: {
      isOpen: false,
      modalData: null,
    },
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getImages();
    }
  }

  getImages = async () => {
    try {
      this.setState({ isLoading: true });
      const imagesApi = await fetchImages(this.state.query, this.state.page);
      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...imagesApi.hits],
        totalImage: imagesApi.totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = searchQuery => {
    this.setState({ query: searchQuery, page: 1, gallery: [], totalImage: 0 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onOpenModal = largeImageURL => {
    this.setState({ modal: { isOpen: true, modalData: largeImageURL } });
  };

  onCloseModal = () => {
    this.setState({ modal: { isOpen: false, modalData: null } });
  };

  render() {
    const { isLoading, gallery, modal, totalImage } = this.state;
    return (
      <div className={css.appContainer}>
        <Searchbar handleSearch={this.handleSearch} />
        {isLoading === true && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
        <ImageGallery gallery={gallery} onOpenModal={this.onOpenModal} />

        {!isLoading && totalImage !== gallery.length && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
        {this.state.modal.isOpen && (
          <Modal onCloseModal={this.onCloseModal} modalData={modal.modalData} />
        )}
      </div>
    );
  }
}
