import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import UsedWords from './UsedWords';
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
    this.props.diceWords2();

    // // score logic
    // // scoreHandler = () => {
    // let playerArray = [...this.state.players];
    // playerArray.map(player => {
    //   player.active === true && this.state.clicked === true
    //     ? (player.score = player.score + 1)
    //     : console.log('hallo');
    // });
    // };
  };

  addWordIntoArray = () => {
    if (this.state.inputValue === '') return;
    this.props.addWords(this.state.inputValue);

    this.setState({
      inputValue: ''
    });
  };

  deleteWordHandler = e => {
    const copyArrayWords = [...this.state.words];
    const toRemove = copyArrayWords.filter(f => f !== this.state.inputValue);

    this.setState({
      words: toRemove
    });
    console.log(this.state.inputValue);
  };

  nextPlayerHandler = () => {
    this.props.nextPlayer();
    // const playerArray = [...this.props.players];
    // console.log(playerArray);
    // for (var i = 0; (i = i % playerArray.length); i++) {
    //   return (playerArray[i].active = true);
    // }
    // // this.setState({
    // //   players: playerArray
    // // });
    // console.log(playerArray[i]);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <div>
              <Card className="form-group bg-light">
                <h1 className="m-3 d-flex justify-content-center text-dark ">
                  {this.props.randomWord}
                </h1>
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
  nextPlayer: () => dispatch({ type: 'NEXT_PLAYER' })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout);
