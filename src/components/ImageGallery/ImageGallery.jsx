import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import * as SC from './ImageGallery.styled';

export const ImageGallery = ({ images, onModal }) => (
  <>
    <SC.Gallery>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smallImage={webformatURL}
          largeImage={largeImageURL}
          tags={tags}
          onModal={onModal}
        />
      ))}
    </SC.Gallery>
  </>
);

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onModal: PropTypes.func.isRequired,
};
