import { hot } from 'react-hot-loader/root';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
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
