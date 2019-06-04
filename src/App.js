import { hot } from 'react-hot-loader/root';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';
import * as classnames from 'classnames';
import has from 'lodash/has';
import styles from './App.scss';
import AddStory from './views/AddStory/AddStory';
import PlanningView from './views/PlanningView/PlanningView';
import DeveloperView from './views/DeveloperView/DeveloperView';
import { getAllSprints, setNewDevLink } from './redux/actions/SprintActions';
import Navigation from './components/presentational/Navigation/Navigation';
import HeroArea from './components/presentational/HeroArea/HeroArea';

class App extends React.Component {
  state = { newLink: '', modalOpen: false };
  componentDidMount() {
    this.props.getAllSprints();
  }
  // Open Modal Control
  handleOpen = () => this.setState({ modalOpen: true });
  // Close Modal Control
  handleClose = () => this.setState({ modalOpen: false });
  // Save link changes
  handleDevLinkChange = (e, { value }) => this.setState({ newLink: value });
  // Submit link change
  submitDevLinkChange = () => {
    const newLink = this.state.newLink;
    const name = this.props.details.details.dev_link;
    // Check if link is empty
    // If empty, show an alert
    if (!newLink) {
      alert('Custom link cannot be empty.');
      return;
    }
    this.props.setNewDevLink(name, newLink);
    this.handleClose();
  };
  render() {
    const devLink = `/poker-planning-view-as-developer/${
      has(this.props.details.details, 'dev_link') ?
        this.props.details.details.dev_link : ''
      }`;
    const dbLink = has(this.props.details.details, 'dev_link') ?
        this.props.details.details.dev_link : '';
    return (
      <div>
        <Navigation sprints={this.props.sprints} />
        <div className={classnames('container', styles.container)}>
          <HeroArea
            pathname={this.props.router.location.pathname}
            devLink={devLink}
            dbLink={dbLink}
            newLink={this.state.newLink}
            handleLinkChange={this.handleDevLinkChange}
            submitNewLink={this.submitDevLinkChange}
            details={this.props.details}
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
            modalOpen={this.state.modalOpen}
          />
          {/* Routes */}
          <Switch>
            <Route path={'/poker-planning-add-story-list'} component={AddStory} />
            <Route path={'/poker-planning-view-as-scrum-master/:name'} component={PlanningView} />
            <Route path={'/poker-planning-view-as-developer/:name'} component={DeveloperView} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  router: PropTypes.object.isRequired,
  getAllSprints: PropTypes.func.isRequired,
};

const mapStateToProps = ({ router, sprint }) => ({
  router,
  details: sprint.details,
  sprints: sprint.sprints,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllSprints,
  setNewDevLink,
}, dispatch);

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
