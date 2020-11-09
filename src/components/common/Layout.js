import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Styles.module.scss';
import { closePageFader } from '../../stores/auth/actions';
import PopUpInfo from './popUpInfo/PopUpInfo';
import { getBodyFade } from '../../selectors/login/getBodyFade';
import { getFaderIsOpened } from '../../selectors/login/getFaderIsOpened';
import { getSearchPanelOpen } from '../../selectors/woocommerce/getSearchPanelOpen';
import { ConfirmationSubmissionPopUp } from '../../components/common/confirmationSubmissionPopUp';
import { ModalProductAdded } from '../../components/common/modalProductAdded';

const Layout = ({
  faderIsOpened,
  bodyFade,
  children,
  popupInfo,
  searchPanelOpened,
  closePageFader,
  submissionModalInfo,
  modalInfoProps,
}) => {
  return (
    <div className='layout'>
      <PopUpInfo {...popupInfo} />
      <ConfirmationSubmissionPopUp {...submissionModalInfo} />
      <ModalProductAdded {...modalInfoProps} />
      <button
        type='button'
        onClick={() => closePageFader()}
        className={cx(
          styles.pageFadeFull,
          `${faderIsOpened || bodyFade ? styles.pageActiveMode : ''}`
        )}
      />
      {searchPanelOpened && (
        <div
          className={cx(
            styles.searchPopUp,
            `${searchPanelOpened ? styles.popUpSearchActive : ''}`
          )}
        />
      )}
      {children}
    </div>
  );
};

const mapStateToProps = (state) => ({
  bodyFade: getBodyFade(state),
  faderIsOpened: getFaderIsOpened(state),
  searchPanelOpened: getSearchPanelOpen(state),
});

const mapDispatchToProps = (dispatch) => ({
  closePageFader: () => dispatch(closePageFader()),
});

Layout.propTypes = {
  faderIsOpened: PropTypes.bool,
  searchPanelOpened: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
