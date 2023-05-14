import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar/Searchbar';
// import PixabayApi from '../services/pixabay-api';
import ImageGallery from 'components/ImageGallery/ImageGallery';
// import Modal from 'components/Modal/Modal';

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
        <Searchbar onFormSubmit={this.getSearchbarValue} />
        <ImageGallery searchQuery={query} />
        {/* <Modal /> */}
        <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      </div>
    );
  }
}
