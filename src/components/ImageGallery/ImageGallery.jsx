import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image.webformatURL}
          largeImage={image.largeImageURL}
          tags={image.tags}
          openModal={openModal} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  })),
  
  openModal: PropTypes.func.isRequired,
}