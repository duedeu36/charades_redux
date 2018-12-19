import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ScoreBoard from './ScoreBoard';
import { Table } from 'reactstrap';
import MainLayout from './MainLayout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StartGameModal extends Component {
  state = {
    words: [],
    modal: this.props.modalOpen,
    clicked: false,
    inputValue: '',
    lastInsertId: 0
  };

  start = () => {
    this.props.closeModal();
    // it doesnt work when the component is not child of app
    this.props.history.push('/mainlayout');
  };

  inputWordHandler = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  // player logic
  activePlayerHandler = () => {
    this.state.clicked = true;
    this.props.activePlayer();
  };

  addPlayerIntoList = props => {
    if (this.state.inputValue === '') return;
    this.props.addPlayer(this.state.inputValue);

    this.setState({
      inputValue: ''
    });
  };

  render() {
    const closeBtn = (
      <button className="close" onClick={this.props.closeModal}>
        &times;
      </button>
    );

    return (
      <div>
        {/* <Button color="danger" onClick={this.toggle}>
          Start the game!
        </Button> */}
        <Modal
          isOpen={this.props.modalOpen}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            Add players
          </ModalHeader>
          <ModalBody>
            <input
              type="text"
              placeholder="Enter here"
              value={this.state.inputValue}
              onChange={this.inputWordHandler}
              className="p-2 m-2 text-center"
              style={{ width: '100%' }}
            />

            <i
              onClick={this.activePlayerHandler}
              className="fas fa-random"
              style={{
                cursor: 'pointer',
                float: 'right',
                color: 'green',
                fontSize: '35px',
                margin: '15px'
              }}
            />

            <i
              onClick={this.addPlayerIntoList}
              className="fas fa-user-plus"
              style={{
                cursor: 'pointer',
                float: 'right',
                color: 'rgb(0, 188, 255)',
                fontSize: '35px',
                margin: '15px'
              }}
            />

            <ScoreBoard />
          </ModalBody>

          <ModalFooter>
            <Router>
              <Switch>
                {/* <Route exact path="/mainlayout" component={MainLayout} /> */}
                {this.state.clicked ? (
                  <Button
                    color="primary"
                    onClick={this.start}
                    style={{
                      margin: '0 auto',
                      width: '200px',
                      padding: '10px',
                      fontSize: '20px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Start
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    onClick={this.start}
                    style={{
                      margin: '0 auto',
                      width: '200px',
                      padding: '10px',
                      fontSize: '20px',
                      textTransform: 'uppercase'
                    }}
                    disabled
                  >
                    Start
                  </Button>
                )}
                {/* <Link to="/mainlayout">
                </Link> */}
              </Switch>
            </Router>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
// mapStateToProps for reading (I open the modal (reading))
const mapStateToProps = state => ({
  modalOpen: state.reducer1.modalOpen,
  players: state.reducer1.players
});

// mapDispatchToProps for writing (I write the players into the table)
const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch({ type: 'CLOSE_MODAL' }),
  addPlayer: player => dispatch({ type: 'ADD_PLAYER', data: player }),
  activePlayer: () => dispatch({ type: 'ACTIVE_PLAYER' })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartGameModal);
