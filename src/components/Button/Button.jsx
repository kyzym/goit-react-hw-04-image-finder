import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import * as SC from './Button.styled';

export const LoadMoreBtn = ({ onLoadMore, status }) => (
  <>
    {status === 'pending' ? (
      <Loader />
    ) : (
      <SC.LoadMoreBtn onClick={onLoadMore}>Load more</SC.LoadMoreBtn>
    )}
  </>
);

LoadMoreBtn.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
