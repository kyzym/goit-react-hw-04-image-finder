import PropTypes from 'prop-types';
import * as SC from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  id,
  smallImage,
  tags,
  largeImage,
  onModal,
}) => (
  <SC.ImageGalleryItem key={id}>
    <SC.ImageGalleryItemImage
      className="ImageGalleryItem-image"
      src={smallImage}
      alt={tags}
      onClick={() => {
        onModal(largeImage);
      }}
    />
  </SC.ImageGalleryItem>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  onModal: PropTypes.func.isRequired,
};
