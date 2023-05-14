import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from '../ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';

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
      <>
        <Searchbar onFormSubmit={this.getSearchbarValue} />
        <ImageGallery searchQuery={query} />
        <ToastContainer position="top-right" autoClose={5000} theme="colored" />
      </>
    );
  }
}
