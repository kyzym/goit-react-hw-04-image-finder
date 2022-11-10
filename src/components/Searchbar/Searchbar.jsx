import { useState } from 'react';

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';
import * as SC from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    const normalizedName = query.trim();

    if (normalizedName === '') {
      return toast('Please type something');
    }

    onSubmit(normalizedName);

    return setQuery('');
  };

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
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
