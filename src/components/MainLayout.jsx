import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import UsedWords from './UsedWords';
import Countdown from './Countdown';
import ScoreBoard from './ScoreBoard';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

// import { Badge } from 'reactstrap';
import {
  Card,
  // CardImg,
  // CardText,
  CardBody
  // CardTitle,
  // CardSubtitle,
  // Button
} from 'reactstrap';
library.add(faStroopwafel);

class MainLayout extends Component {
  state = {
    inputValue: '',
    lastInsertId: 3,
    clicked: false,
    hidden: false
  };

  inputWordHandler = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  diceWordHandler = () => {
    this.state.clicked = true;
    this.props.diceWords2();
  };

  addWordIntoArray = () => {
    if (this.state.inputValue === '') return;
    this.props.addWords(this.state.inputValue);

    this.setState({
      inputValue: ''
    });
  };

  deleteWordHandler = e => {
    this.props.deleteWord(this.state.inputValue);
  };

  nextPlayerHandler = () => {
    this.props.nextPlayer();
  };

  render() {
    return (
      <Container>
        <Countdown />
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <div>
              <Card className="form-group bg-light">
                {this.state.clicked ? (
                  <h1 className="m-3 d-flex justify-content-center text-dark ">
                    {this.props.randomWord}
                  </h1>
                ) : (
                  <h1 className="m-3 d-flex justify-content-center text-dark ">
                    ...
                  </h1>
                )}
                {/* {this.props.words.length == 0
                  ? alert('Game over! Winner is: ')
                  : null}
                {console.log(this.props.words)} */}
                <input
                  type="text"
                  placeholder="Enter here"
                  value={this.state.inputValue}
                  onChange={this.inputWordHandler}
                  className="p-2 m-2 text-center"
                />

                <CardBody className="d-flex">
                  <i
                    onClick={this.addWordIntoArray}
                    className="fas fa-plus-circle"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'DodgerBlue',
                      fontSize: '35px',
                      margin: '15px'
                    }}
                  />{' '}
                  <i
                    onClick={this.deleteWordHandler}
                    className="fas fa-minus-circle"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'Red',
                      fontSize: '35px',
                      margin: '15px'
                    }}
                  />{' '}
                  <i
                    onClick={this.diceWordHandler}
                    className="fas fa-dice"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'rgb(0, 188, 63)',
                      fontSize: '35px',
                      margin: '15px'
                    }}
                  />
                  <i
                    onClick={this.nextPlayerHandler}
                    className="fas fa-angle-double-right"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'rgb(0, 188, 63)',
                      fontSize: '35px',
                      margin: '15px'
                    }}
                  />
                </CardBody>
              </Card>
              <ScoreBoard />
              <UsedWords />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  words: state.reducer1.words,
  randomWords: state.reducer1.randomWords,
  randomWord: state.reducer1.randomWord,
  players: state.reducer1.players
});

const mapDispatchToProps = dispatch => ({
  addWords: words => dispatch({ type: 'ADD_WORDS', data: words }),
  diceWords2: diceWords => dispatch({ type: 'DICE_WORDS', data: diceWords }),
  nextPlayer: () => dispatch({ type: 'NEXT_PLAYER' }),
  deleteWord: word => dispatch({ type: 'DELETE_WORD', data: word })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout);
