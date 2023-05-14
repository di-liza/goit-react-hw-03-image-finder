import React, { Component } from 'react';
import PixabayApi from '../services/pixabay-api';
import Button from 'components/Button/Button';

import { GalleryList } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: false,
    status: 'idle',
    query: '',
  };
  loadImages = [];

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending', page: 1 });
      PixabayApi.fetchPixabay(nextQuery, 1)
        .then(images =>
          this.setState({
            images: images.hits,
            status: 'resolved',
            query: nextQuery,
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleLoadMoreBTN = () => {
    const { query, page, images } = this.state;
    PixabayApi.fetchPixabay(query, page + 1)
      .then(newImages =>
        this.setState({
          images: images.concat(newImages.hits),
          status: 'loadMore',
          page: page + 1,
        })
      )
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <p>Please, enter the name of image for search</p>;
    }
    if (status === 'pending') {
      return 'Loading...';
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
          <Button handleLoadMoreBTN={this.handleLoadMoreBTN} />
        </>
      );
    }
    if (status === 'loadMore') {
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
          <Button handleLoadMoreBTN={this.handleLoadMoreBTN} />
        </>
      );
    }
  }
}
