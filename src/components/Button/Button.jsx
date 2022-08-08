import PropTypes from 'prop-types';
import css from './Button.module.css';


export const Button = ({onLoadMore}) => {
  return (
    <div className={css.ButtonContainer}>
      <button className={css.Button} type="button" onClick={onLoadMore}>Load more</button>
    </div>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
}