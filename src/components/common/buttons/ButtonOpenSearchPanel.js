import React from 'react';
import styles from './Styles.module.scss';
import PropTypes from 'prop-types';
import Svg from '../../svg';

const ButtonOpenSearchPanel = ({ handleOpenSearchPanel }) => {
  return (
    <button
      onClick={() => handleOpenSearchPanel()}
      type='button'
      className={styles.searchButtonOpenPanel}
    >
      <span className={styles.searchButtonWrapper}>
        <Svg name='triggerSearch' />
      </span>
      <span className={styles.searchText}>Click to search all products</span>
    </button>
  );
};

ButtonOpenSearchPanel.propTypes = {
  handleOpenSearchPanel: PropTypes.func
};

export default ButtonOpenSearchPanel;
