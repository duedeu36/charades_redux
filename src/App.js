import React, { Component } from 'react';
import './App.css';
import MainLayout from './components/MainLayout';
import StartGameModal from './components/StartGameModal';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <h1>Charades</h1>
            <p>A party word guessing game</p>
            {this.props.gameStarted ? (
              <Button color="danger" onClick={this.props.openModal}>
                Start the game!
              </Button>
            ) : null}

            <StartGameModal />

            <Switch>
              <Route exact path="/" component={StartGameModal} />

              <Route exact path="/mainlayout" component={MainLayout} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modalOpen: state.reducer1.modalOpen,
  gameStarted: state.reducer1.gameStarted
});

const mapDispatchToProps = dispatch => ({
  openModal: () => dispatch({ type: 'OPEN_MODAL' })
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
