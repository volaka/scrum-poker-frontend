import React from 'react';
import PropTypes from 'prop-types';
import styles from './PortalHeader.scss';

const PortalHeader = ({ storyName }) => (
  <span className={styles['portal-header']}>{storyName} is active</span>
);

PortalHeader.propTypes = {
  storyName: PropTypes.string.isRequired,
};

export default PortalHeader;
