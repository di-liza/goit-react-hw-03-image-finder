import React, { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    query: '',
  };
  onInputChange = ({ target: { value } }) => {
    this.setState({ query: value });
  };
  onFormSubmit = event => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.query);
    this.resetForm();
  };
  resetForm = () => {
    this.setState({ query: '' });
  };
  render() {
    const { query } = this.state;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.onFormSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
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
      </header>
    );
  }
}
