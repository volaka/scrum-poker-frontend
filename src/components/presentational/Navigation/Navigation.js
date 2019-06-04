import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.scss';

const Navigation = ({ sprints }) => (
  <ul className={styles.navigation}>
    <li><NavLink to={'/poker-planning-add-story-list'}>Create New Sprint</NavLink></li>
    {
      sprints.sprints.map(s => (
        <li key={s.name}>
          <a href={`/poker-planning-view-as-scrum-master/${s.name}`}>{s.name}</a>
        </li>
      ))
    }
  </ul>
);

Navigation.propTypes = {
  sprints: PropTypes.object.isRequired,
};

export default Navigation;
