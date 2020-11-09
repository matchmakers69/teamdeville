import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Styles.module.scss';
import { closeModalInfo as closeModalInfoActions } from '../../../actions/actionsPopUpInfo';

const ModalProductAdded = ({ ...props }) => {
  const {
    modalInfoOpended,
    modalAlertHeader,
    modalAlert,
    closeModalInfo,
  } = props;
  if (!modalInfoOpended) return null;
  return (
    <div className={styles.alertModal}>
      <header className={styles.modalHeader}>
        <div className={styles.modalContentTop}>
          <h3 className={styles.modalHeaderTitle}>{modalAlertHeader}</h3>
        </div>
      </header>
      <div className={styles.modalContent}>
        <p>{modalAlert}</p>
      </div>
      <footer className={styles.modalFooter}>
        <button
          type='button'
          className='ctaButtonLarge borderWhite'
          data-dismiss='modal'
          aria-label='Close'
          onClick={() => closeModalInfo()}
        >
          <span className='button-text' aria-hidden='true'>
            Close window
          </span>
        </button>
      </footer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  modalInfoOpended: state.popUpState.modalInfoOpended,
  modalAlert: state.popUpState.modalAlert,
  modalAlertHeader: state.popUpState.modalAlertHeader,
});

const mapDispatchToProps = (dispatch) => ({
  closeModalInfo: () => dispatch(closeModalInfoActions()),
});

ModalProductAdded.propTypes = {
  modalInfoOpended: PropTypes.bool.isRequired,
  modalAlert: PropTypes.string.isRequired,
  modalAlertHeader: PropTypes.string.isRequired,
  closeModalInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalProductAdded);
