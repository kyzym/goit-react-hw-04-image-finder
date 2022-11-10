import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';
import * as SC from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleQueryChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    const normalizedName = this.state.query.trim();

    if (normalizedName === '') {
      return toast('Please type something');
    }

    this.props.onSubmit(normalizedName);

    return this.setState({ query: '' });
  };

  render() {
    const { handleSubmit, handleQueryChange } = this;
    const { query } = this.state;

    return (
      <SC.Header>
        <SC.SearchForm onSubmit={handleSubmit}>
          <SC.SearchFormBtn type="submit">
            <FcSearch style={{ width: 30, height: 30 }} />
          </SC.SearchFormBtn>

          <SC.SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleQueryChange}
          />
        </SC.SearchForm>
      </SC.Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
