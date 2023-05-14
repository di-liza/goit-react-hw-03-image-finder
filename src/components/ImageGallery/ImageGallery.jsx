import React, { Component } from 'react';
import PixabayApi from '../services/pixabay-api';
import Button from 'components/Button/Button';

import { GalleryList, ColorRingWrapper } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import { ColorRing } from 'react-loader-spinner';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: false,
    status: 'idle',
    query: '',
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

  render() {
    const { images, error, status, page } = this.state;
    console.log(status);

    const isEndOfListReached = images.length / 12 < page;

    if (status === 'idle') {
      return <p>Please, enter the name of image for search</p>;
    }
    if (status === 'pending') {
      return (
        <>
          <GalleryList>
            {images.map(({ id, webformatURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                tags={tags}
              />
            ))}
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
            {images.map(({ id, webformatURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                tags={tags}
              />
            ))}
          </GalleryList>

          {!isEndOfListReached && (
            <Button handleLoadMoreBTN={this.handleLoadMoreBTN} />
          )}
        </>
      );
    }
  }
}
