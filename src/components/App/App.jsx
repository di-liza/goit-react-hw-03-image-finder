import React, { Component } from 'react';

import Searchbar from 'components/Searchbar/Searchbar';
// import PixabayApi from '../services/pixabay-api';
import ImageGallery from 'components/ImageGallery/ImageGallery';
// import Modal from 'components/Modal/Modal';
// import Button from 'components/Button/Button';

// PixabayApi.fetchPixabay('cat', 1).then(({ hits }) => console.log(hits));

export default class App extends Component {
  state = {
    query: '',
  };
  getSearchbarValue = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;
    return (
      <div>
        Hi
        <Searchbar onFormSubmit={this.getSearchbarValue} />
        <ImageGallery searchQuery={query} />
        {/* <Modal /> */}
        {/* <Button handleLoadMoreBTN={this.handleLoadMoreBTN} /> */}
      </div>
    );
  }
}
