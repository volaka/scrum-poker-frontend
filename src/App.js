import { hot } from 'react-hot-loader/root';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Route, Switch } from 'react-router-dom';
import * as classnames from 'classnames';
import has from 'lodash/has';
import styles from './App.scss';
import AddStory from './views/AddStory/AddStory';
import PlanningView from './views/PlanningView/PlanningView';
import DeveloperView from './views/DeveloperView/DeveloperView';

class App extends React.Component {
  render() {
    console.log(window.location.origin);
    const devLink = `/poker-planning-view-as-developer/${
      has(this.props.details.details, 'dev_link') ?
        this.props.details.details.dev_link : ''
    }`;
    return (
      <div className={classnames('container', styles.container)}>
        <div className={'row'}>
          {/* Image Area */}
          <div className="col-4">
            <div className={styles.image}>
              Scrum Poker
            </div>
          </div>
          {/* Link Area */}
          <div className={classnames('col-8', styles['sprint-link'])}>
            {
              this.props.router.location.pathname.match(/.*scrum-master.*/) &&
              this.props.router.location.pathname.match(/.*scrum-master.*/).length > 0 &&
              <Link to={devLink}>{window.location.origin}{devLink}</Link>
            }
          </div>
        </div>
        {/* Routes */}
        <Switch>
          <Route path={'/poker-planning-add-story-list'} component={AddStory} />
          <Route path={'/poker-planning-view-as-scrum-master/:name'} component={PlanningView} />
          <Route path={'/poker-planning-view-as-developer/:name'} component={DeveloperView} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = ({ router, planningView }) => ({
  router,
  details: planningView.details
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
