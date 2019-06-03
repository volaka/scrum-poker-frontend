import { hot } from 'react-hot-loader/root';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';
import styles from './App.scss';
import AddStory from './views/AddStory/AddStory';

class App extends React.Component {
  render() {
    return (
      <div className={'container'}>
        <div className={'row'}>
          <div className={styles.image}>
            Scrum Poker
          </div>
          <p>Link http://localhost:3000/scrum-master/sprint-1</p>
        </div>
        <Switch>
          <Route path={'/poker-planning-add-story-list'} component={AddStory} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = ({ router }) => ({
  router,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
