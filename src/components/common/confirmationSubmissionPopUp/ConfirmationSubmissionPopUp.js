import React from 'react';
import PropTypes from 'prop-types';
import styles from './Styles.module.scss';
import { connect } from 'react-redux';
import { closeConfirmationModalAfterSubmission as closeConfirmationModalAfterSubmissionActions } from '../../../actions/actionsWoo';

const ConfirmationSubmissionPopUp = ({ ...props }) => {
  const {
    isConfirmationModalOpened,
    modalTitle,
    modalDescription,
    closeConfirmationModalAfterSubmission,
  } = props;

  if (!isConfirmationModalOpened) return null;
  return (
    <>
      <div className={styles.modalOverlay} />
      <div
        className={styles.modalWrapper}
        aria-modal
        aria-hidden
        tabIndex={-1}
        role='dialog'
      >
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <div className={styles.modalContentTop}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                x='0px'
                y='0px'
                viewBox='0 0 98.5 98.5'
                enableBackground='new 0 0 98.5 98.5'
              >
                <path
                  className={styles.iconCheckmark}
                  fill='none'
                  strokeWidth='8'
                  strokeMiterlimit='10'
                  d='M81.7,17.8C73.5,9.3,62,4,49.2,4
C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3'
                />
              </svg>
            </div>
          </div>
          <div className={styles.modalContent}>
            <div className={styles.modalContentMiddle}>
              <p>{modalTitle}</p>
            </div>
            <div className={styles.modalContentMiddle}>
              <p className={styles.additionalInfoText}>{modalDescription}</p>
            </div>
          </div>
          <footer className={styles.modalFooter}>
            <button
              type='button'
              className='ctaButtonLarge borderWhite'
              data-dismiss='modal'
              aria-label='Close'
              onClick={() => closeConfirmationModalAfterSubmission()}
            >
              <span className='button-text' aria-hidden='true'>
                Close window
              </span>
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isConfirmationModalOpened: state.wooState.isConfirmationModalOpened,
  modalTitle: state.wooState.modalTitle,
  modalDescription: state.wooState.modalDescription,
});

const mapDispatchToProps = (dispatch) => ({
  closeConfirmationModalAfterSubmission: () =>
    dispatch(closeConfirmationModalAfterSubmissionActions()),
});

ConfirmationSubmissionPopUp.propTypes = {
  isConfirmationModalOpened: PropTypes.bool.isRequired,
  modalTitle: PropTypes.string.isRequired,
  modalDescription: PropTypes.string.isRequired,
  closeConfirmationModalAfterSubmission: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationSubmissionPopUp);
