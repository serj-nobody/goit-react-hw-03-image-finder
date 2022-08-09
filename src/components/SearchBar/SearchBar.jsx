import React, { Component } from "react";
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';
import { toast } from "react-toastify";


export class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  onInputChange = (event) => {
    this.setState({ searchQuery: event.currentTarget.value })
  };

  onSubmit = (event) => {
    event.preventDefault();
    
    if (this.state.searchQuery.trim() === '') {
      toast.error('Please enter your search query');
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };
  
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css['SearchForm-button']}>
            <FaSearch size="16px"/>
          </button>

          <input
            className={css['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.searchQuery}
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  };
}

