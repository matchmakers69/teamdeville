import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { closePopup as closePopupActions } from '../../../actions/actionsPopUpInfo';
import { connect } from 'react-redux';
import styles from './Styles.module.scss';

const PopUpInfo = ({ ...props }) => {
  const { open, title, description } = props;
  if (!open) return null;
  return (
    <div className={styles.popUpWindow}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalPopUp}>
          <div className={styles.messageWrapper}>
            <div className={styles.popUpDescription}>
              <h3 className={styles.titlePopUpHeader}>{title}</h3>
              <p>{description}</p>
            </div>
            <div className={styles.contactButtonWrapper}>
              <Link
                onClick={() => props.closePopup()}
                to='/contact'
                className='ctaButtonBorder smallButton greyBorder'
              >
                <span className='button-text text-orange'>Contact us </span>
              </Link>

              <button
                onClick={() => props.closePopup()}
                type='button'
                className={styles.closePopUp}
              >
                <span className='button-text'>Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  open: state.popUpState.open,
  title: state.popUpState.title,
  description: state.popUpState.description,
});

const mapDispatchToProps = (dispatch) => ({
  closePopup: () => dispatch(closePopupActions()),
});

PopUpInfo.propTypes = {
  closePopup: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PopUpInfo);
