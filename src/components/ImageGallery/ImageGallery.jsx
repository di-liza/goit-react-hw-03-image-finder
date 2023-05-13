import React, { Component } from 'react';
import PixabayApi from '../services/pixabay-api';
import Button from 'components/Button/Button';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: false,
    status: 'idle',
    query: '',
  };

  componentDidUpdate(prevProps) {
    console.log('will update');
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     this.state.images !== nextState.images ||
  //     this.state.status !== nextState.status
  //   );
  // }
  handleLoadMoreBTN = () => {
    const { query, page, images } = this.state;

    this.setState({ status: 'loadMore' });
    PixabayApi.fetchPixabay(query, page + 1)
      .then(newImages => {
        this.setState({
          images: [...images, ...newImages.hits],
          status: 'resolved',
          page: page + 1,
        });
      })
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
          <ul>
            {images.map(image => (
              <li key={image.id}>
                <a href={image.webformatURL}>
                  <img src={image.webformatURL} alt={image.tags} />
                  <p>{image.tags}</p>
                </a>
              </li>
            ))}
          </ul>
          <Button handleLoadMoreBTN={this.handleLoadMoreBTN} />
        </>
      );
    }
  }
}
