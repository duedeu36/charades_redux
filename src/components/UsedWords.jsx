import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

class UsedWords extends Component {
  render() {
    return (
      <div
        style={{
          width: 'auto',
          height: 'auto',
          padding: '30px',
          backgroundColor: 'rgb(234, 234, 234)',
          borderRadius: '5px'
        }}
      >
        <h3>Used words:</h3>
        <Table>
          <tbody>
            {this.props.randomWords.map(word => {
              return (
                <tr key={word.id}>
                  <td>{word.randomWord}</td>
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
  randomWords: state.reducer1.randomWords,
  // need randomWord for line 23:
  randomWord: state.reducer1.randomWord
});

export default connect(
  mapStateToProps,
  null
)(UsedWords);
