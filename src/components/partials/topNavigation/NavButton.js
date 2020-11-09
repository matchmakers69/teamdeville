import React from 'react';
import PropTypes from 'prop-types';

const NavButton = ({ navItem: { label, url } }) => (
  <li>
    <a href={url}>{label}</a>
  </li>
);
NavButton.propTypes = {
  navItem: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default NavButton;
