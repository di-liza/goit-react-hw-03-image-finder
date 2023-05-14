import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

import { Header } from './Searchbar.styled';

export default class Searchbar extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };
  onInputChange = ({ target: { value } }) => {
    this.setState({ query: value });
  };
  hanldeFormSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      return toast.error('Please enter a name of collection.');
    }
    this.props.onFormSubmit(this.state.query);
    this.resetForm();
  };
  resetForm = () => {
    this.setState({ query: '' });
  };
  render() {
    const { query } = this.state;
    return (
      <Header className="searchbar">
        <form className="form" onSubmit={this.hanldeFormSubmit}>
          <button type="submit" className="buttonSearch">
            <ImSearch color="grey" />
          </button>

          <input
            onChange={this.onInputChange}
            className="searchForm-input"
            type="text"
            value={query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </Header>
    );
  }
}
