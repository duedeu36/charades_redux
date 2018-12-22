import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

class ScoreBoard extends Component {
  render() {
    return (
      <div className="">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {this.props.players.map(player => {
              return (
                <tr
                  key={player.id}
                  className={player.active ? 'bg bg-danger' : ''}
                >
                  {/* {console.log('player.active: ', player.active)} */}
                  <td>{player.id}</td>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.reducer1.players,
  randomPlayer: state.reducer1.randomPlayer
  // the first "players" is local, the second "players" is from reducers initialState
});

// const mapDispatchToProps = dispatch => ({
//   nextPlayer: () => dispatch({ type: 'NEXT_PLAYER' })
// });

export default connect(
  mapStateToProps,
  // mapDispatchToProps
  null
)(ScoreBoard);
