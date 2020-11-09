import NavButton from './NavButton';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { openNewsSidebar } from '../../../stores/news/actions';
import styles from './Styles.module.scss';
import { useQuery } from '@apollo/react-hooks';
import { MENU_QUERY } from '../../../utils/graphql/queries';
import showSpinnerIconIfLoading from '../../../utils/functions/renderSpinnerIcon';

const StaticMenu = ({ openNewsSidebar }) => {
  const { data = {}, error, loading } = useQuery(MENU_QUERY, {
    variables: { id: 'bmF2X21lbnU6MTYy' },
  });
  let menuItems = [];
  if (loading || !data)
    return (
      <>
        <span data-test='loading-alert'>Loading news...</span>
        {showSpinnerIconIfLoading()}
      </>
    );

  if (error) return `Something went wrong: ${error}`;
  menuItems = data.menu.menuItems.nodes;

  return (
    <>
      <ul data-test='static-menu' className={styles.mainListNav}>
        {menuItems.map((navItem) => (
          <NavButton key={navItem.id} navItem={navItem} />
        ))}
      </ul>
      <div className={styles.newsSectionSwitcher}>
        <button
          data-test='newsSwitcher'
          onClick={openNewsSidebar}
          className={styles.newsButtonSwitcher}
          type='button'
        >
          News
        </button>
      </div>
    </>
  );
};

StaticMenu.defaultProps = {
  topMenuData: {},
  navigation: [],
  menuItems: {},
};

StaticMenu.propTypes = {
  openNewsSidebar: PropTypes.func.isRequired,
  topMenuData: PropTypes.shape({
    menuItems: PropTypes.shape({
      nodes: PropTypes.instanceOf(Array),
    }),
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  openNewsSidebar: () => dispatch(openNewsSidebar()),
});

export default connect(null, mapDispatchToProps)(StaticMenu);
