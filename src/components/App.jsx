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
    gallery: null,
    isLoading: false,
    modal: {
      isOpen: false,
      modalData: null,
    },
  };

  getImages = async () => {
    try {
      this.setState({ isLoading: true });
      const imagesApi = await fetchImages(this.state.query, this.state.page);
      this.setState({
        gallery:
          this.state.page === 1
            ? imagesApi.hits
            : [...this.state.gallery, ...imagesApi.hits],
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = searchQuery => {
    this.setState({ query: searchQuery, page: 1 });
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

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getImages();
    }
  }

  render() {
    return (
      <div className={css.appContainer}>
        <Searchbar handleSearch={this.handleSearch} />
        {this.state.isLoading === true && (
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
        <ImageGallery
          gallery={this.state.gallery}
          onOpenModal={this.onOpenModal}
        />

        <Button handleLoadMore={this.handleLoadMore} />
        {this.state.modal.isOpen && (
          <Modal
            onCloseModal={this.onCloseModal}
            modalData={this.state.modal.modalData}
          />
        )}
      </div>
    );
  }
}
