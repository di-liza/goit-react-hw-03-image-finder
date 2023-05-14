import React, { Component } from 'react';
import PixabayApi from '../services/pixabay-api';
import Button from 'components/Button/Button';

import {
  GalleryList,
  ColorRingWrapper,
  ErrorMessage,
} from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal';
import { ColorRing } from 'react-loader-spinner';

import { toast } from 'react-toastify';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: false,
    status: 'idle',
    query: '',
    showModal: false,
    activeCardId: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const searchQuery = this.props.searchQuery;
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: 'pending', page: nextPage });
      PixabayApi.fetchPixabay(nextQuery, nextPage)
        .then(({ totalHits, total, hits }) => {
          if (!total || !totalHits) {
            this.setState({ status: 'idle' });
            return toast.info('Not found images for this query. Try again.');
          }
          if (totalHits / 12 <= nextPage) {
            toast.info(
              `We're sorry, but you've reached the end of search results.`
            );
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            status: 'resolved',
            query: nextQuery,
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (prevProps !== this.props) {
      this.setState({
        query: searchQuery,
        images: [],
        error: false,
        page: 1,
      });
    }
  }

  handleLoadMoreBTN = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  setActiveIndex = id => {
    this.setState({ activeCardId: id });
    this.toggleModal();
  };
  toggleModal = () => {
    return this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { images, status, activeCardId, showModal, page } = this.state;

    const isEndOfListReached = images.length / 12 < page;
    const activeCard = images.find(({ id }) => id === activeCardId);

    if (status === 'pending') {
      return (
        <>
          <GalleryList>
            {images.map(({ id, webformatURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  tags={tags}
                />
              );
            })}
          </GalleryList>

          <ColorRingWrapper>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#935be1', '#f460ca', '#6a9ef8', '#900bcd', '#361dd4']}
            />
          </ColorRingWrapper>
        </>
      );
    }
    if (status === 'rejected') {
      return <ErrorMessage>Something went wrong, try again.</ErrorMessage>;
    }
    if (status === 'resolved') {
      return (
        <>
          <GalleryList>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                onCardClick={this.setActiveIndex}
                largeImageURL={largeImageURL}
                tags={tags}
                idCard={id}
              />
            ))}
          </GalleryList>
          {showModal && (
            <Modal activeCard={activeCard} closeModal={this.toggleModal} />
          )}

          {!isEndOfListReached && (
            <Button handleLoadMoreBTN={this.handleLoadMoreBTN} />
          )}
        </>
      );
    }
  }
}
