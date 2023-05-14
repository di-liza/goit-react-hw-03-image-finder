import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { ColorRing } from 'react-loader-spinner';
import Searchbar from 'components/Searchbar/Searchbar';
// import PixabayApi from '../services/pixabay-api';
import ImageGallery from 'components/ImageGallery/ImageGallery';

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
        {/* <div>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div> */}

        <Searchbar onFormSubmit={this.getSearchbarValue} />
        <ImageGallery searchQuery={query} />
        {/* <Modal /> */}
        <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      </div>
    );
  }
}
