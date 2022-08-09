import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar } from "./components/SearchBar/SearchBar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";

import { fetchImages } from "services/api-service";
import css from './App.module.css';



export class App extends Component {
  state = {
    images: [],
    modalImage: '',
    searchQuery: '',
    page: 1,
    status: 'idle',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getSearchResults();
    }
  };

  onSearchFormSubmit = (searchQuery) => {
    this.setState({ searchQuery, images: [], page: 1 });
  };

  async getSearchResults() {
    const { searchQuery, page } = this.state;
    this.setState({ status: 'pending' });

    try {
      const nextImages = await fetchImages(searchQuery, page);
      this.setState(prevState => ({ images: [...prevState.images, ...nextImages] }));
      this.setState({ status: 'resolved' });
      this.ScrollToBottom();
    }
    catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
  };

  ScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      // top: 0,
      behavior: "smooth",
    });
  };

  toggleModal = (largeImage) => {
    this.setState(({ showModal, modalImage }) => ({ showModal: !showModal, modalImage: largeImage }));
  };

  render() {
    const { images, status, showModal, modalImage } = this.state;

    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.onSearchFormSubmit} />
        <ImageGallery images={images} openModal={this.toggleModal} />

        {status === 'idle' && (
          <div className={css.Notification}>Please enter your search query...</div>
        )}

        {status === 'pending' && (
          <Loader/>
        )}

        {status === 'rejected' && (
          <div className={`${css.Notification} ${css.Error}`}>Oops! Something went wrong.</div>
        )}

        {images.length >= 12 && (
          <Button onLoadMore={this.onLoadMore} />
        )}

        {showModal && (
          <Modal largeImage={modalImage} closeModal={this.toggleModal} />
        )}

        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  };
}
