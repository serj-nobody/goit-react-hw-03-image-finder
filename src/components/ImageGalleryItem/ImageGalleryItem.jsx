import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, tags, openModal, largeImage }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css['ImageGalleryItem-image']} src={image} alt={tags} onClick={() => openModal(largeImage)} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
}