const initialState = {
  words: [],
  randomWords: ['test'],
  modalOpen: false,
  gameStarted: true,
  players: [
    { id: 1, name: 'damir', score: 3, active: false, display: true },
    { id: 2, name: 'damir333', score: 3, active: false, display: true },
    { id: 3, name: 'nemer, the tiger', score: 5, active: false, display: true }
  ],
  clicked: false,
  lastInsertId: 4,
  inputValue: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modalOpen: true
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalOpen: false,
        gameStarted: false
      };
    case 'ADD_PLAYER':
      let players = [...state.players];
      players.push({
        id: state.lastInsertId,
        name: action.data,
        score: 0,
        active: false,
        display: true
      });
      return {
        ...state,
        players: players,
        lastInsertId: state.lastInsertId + 1
      };
    case 'ACTIVE_PLAYER':
      // alert();
      let players2 = [...state.players];
      players2.map(player => {
        player.active = false;
      });
      let randomNumber = Math.floor(Math.random() * players2.length);
      let randomPlayer = players2[randomNumber];
      players2[randomNumber].active = true;

      return {
        ...state,
        // overwrite the players2 (here its the random one) with the real players array
        players: players2
      };
    case 'NEXT_PLAYER':
      alert();
      const playerArray = [...state.players];
      console.log(playerArray);
      for (var i = 0; (i = i % playerArray.length); i++) {
        return (playerArray[i].active = true);
      }
      // this.setState({
      //   players: playerArray
      // });
      console.log(playerArray[i]);

      return {
        ...state,
        players: playerArray
      };
    case 'ADD_WORDS':
      // alert('hallo');
      let words = [...state.words];
      words.push(action.data);

      return {
        ...state,
        words: words,
        inputValue: state.inputValue
      };
    case 'DICE_WORDS':
      // alert('hallo2');
      let words2 = [...state.words];
      let randomWord = words2[Math.floor(Math.random() * words2.length)];
      state.randomWords.push({ randomWord, display: true });

      // now delete randomWord from words Array:
      for (var i = 0; i < words2.length; i++) {
        if (words2[i] === randomWord) {
          words2.splice(i, 1);
        }
      }
      return {
        ...state,
        words: words2,
        randomWords: state.randomWords,
        clicked: true,
        // if I delete this... randomWord can not be passed as props
        randomWord: randomWord
      };

    default:
      return state;
  }
}
