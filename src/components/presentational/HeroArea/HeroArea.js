import React from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';
import { Link } from 'react-router-dom';
import has from 'lodash/has';
import styles from './HeroArea.scss';
import EditLinkModal from '../EditLinkModal/EditLinkModal';

const HeroArea =
  ({ devLink, pathname, dbLink, newLink, handleLinkChange,
     submitNewLink, details, handleClose, modalOpen, handleOpen }) => (
    <div className={'row'}>
      {/* Header Area */}
      <div className="col-4">
        <div className={styles['header-container']}>
          {/* Image Area */}
          <div className={styles.image}>Scrum Poker</div>
          {/* Sprint Name */}
          {
            // If link has scrum-master regex, then show the dev-link
            pathname.match(/.*scrum-master.*/) &&
            pathname.match(/.*scrum-master.*/).length > 0 &&
            <span className={styles.header}>
              {has(details.details, 'name') && details.details.name}
            </span>
          }
        </div>
      </div>
      {/* Link Area */}
      <div className={classnames('col-8', styles['sprint-link'])}>
        {
          // If link has scrum-master regex, then show the dev-link
          pathname.match(/.*scrum-master.*/) &&
          pathname.match(/.*scrum-master.*/).length > 0 &&
          <div className={styles['link-container']}>
            <Link to={devLink}>{window.location.origin}{devLink}</Link>
            <div className={styles['edit-button']}>
              {/* Modal for customizing dev link */}
              <EditLinkModal
                handleOpen={handleOpen}
                handleClose={handleClose}
                dbLink={dbLink}
                modalOpen={modalOpen}
                handleLinkChange={handleLinkChange}
                submitNewLink={submitNewLink}
                newLink={newLink}
              />
            </div>
          </div>
        }
      </div>
    </div>
  );

HeroArea.propTypes = {
  devLink: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  dbLink: PropTypes.string.isRequired,
  newLink: PropTypes.string,
  handleLinkChange: PropTypes.func.isRequired,
  submitNewLink: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default HeroArea;
