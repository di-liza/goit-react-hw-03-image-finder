import React, { Component } from 'react';
import PixabayApi from '../services/pixabay-api';
import Button from 'components/Button/Button';

export default class ImageGallery extends Component {
  state = {
    images: null,
    page: 1,
    error: false,
    status: 'indle',
    query: '',
  };
  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending' });
      console.log(this.state.page);
      PixabayApi.fetchPixabay(nextQuery, this.state.page)
        .then(images =>
          this.setState({ images, status: 'resolved', query: nextQuery })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleLoadMoreBTN = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        PixabayApi.fetchPixabay(this.state.query, this.state.page)
          .then(images => this.setState({ images, status: 'resolved' }))
          .catch(error => this.setState({ error, status: 'rejected' }));
      }
    );
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
          <ul>
            {images.hits.map(image => (
              <li key={image.id}>
                <img src={image.webformatURL} alt={image.tags} />
                <p>{image.tags}</p>
              </li>
            ))}
          </ul>
          <Button handleLoadMoreBTN={this.handleLoadMoreBTN} />
        </>
      );
    }
  }
}
