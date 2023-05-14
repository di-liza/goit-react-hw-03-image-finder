import React, { Component } from 'react';

import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

import { Header } from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    query: '',
  };
  onInputChange = ({ target: { value } }) => {
    this.setState({ query: value });
  };
  onFormSubmit = event => {
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
        <form className="form" onSubmit={this.onFormSubmit}>
          <button type="submit" className="buttonSearch">
            <span className="button-label">
              <ImSearch style={{ marginRight: 8 }} color="white" />
            </span>
          </button>

          <input
            onChange={this.onInputChange}
            className="input"
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
