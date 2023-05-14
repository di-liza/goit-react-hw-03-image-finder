import React, { Component } from 'react';
import PixabayApi from '../services/pixabay-api';
import Button from 'components/Button/Button';

import { GalleryList, ColorRingWrapper } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal';
import { ColorRing } from 'react-loader-spinner';

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

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending', page: 1 });
      setTimeout(() => {
        PixabayApi.fetchPixabay(nextQuery, 1)
          .then(images => {
            this.setState({
              images: images.hits,
              status: 'resolved',
              query: nextQuery,
            });
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 1000);
    }
  }

  handleLoadMoreBTN = () => {
    const { query, page, images } = this.state;
    this.setState({ status: 'pending' });
    setTimeout(() => {
      PixabayApi.fetchPixabay(query, page + 1)
        .then(newImages => {
          this.setState({
            images: images.concat(newImages.hits),
            status: 'resolved',
            page: page + 1,
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }, 1000);
  };

  setActiveIndex = id => {
    this.setState({ activeCardId: id });
    this.toggleModal();
  };
  toggleModal = () => {
    console.log('click');
    return this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { images, error, status, page, activeCardId, showModal } = this.state;
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
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </ColorRingWrapper>
        </>
      );
    }
    if (status === 'rejected') {
      return <p>{error}</p>;
    }
    if (status === 'resolved') {
      return (
        <>
          <GalleryList>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                webformatURL={webformatURL}
                onCardClick={this.setActiveIndex}
                largeImageURL={largeImageURL}
                tags={tags}
                idCard={id}
                // onClick={() => {
                //   this.setActiveIndex(id);
                // }}
              />
            ))}
          </GalleryList>
          {showModal && activeCard && (
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
