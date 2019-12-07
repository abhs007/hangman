
import { Hangman } from './components';
import './App.css';
import React, { Component } from 'react';
import styled from 'styled-components';
import getRandomWord from './getRandomWord';
import UserInput from './components/Hangman/UserInput';
import DisplayWord from './components/Hangman/DisplayWord';
import CreateNewGame from './components/Hangman/CreateNewGame';
import GameOver from './components/Hangman/GameOver'

const digits = document.getElementsByClassName('digit');
const winText = `You did it! Super awesome!`;
const loseText = 'Seriously? That was an easy one.';
const letters = /^[a-z0-9]+$/i;
const Name = styled.h1`
  font-size: 56px;
  font-family: 'Tangerine', sans-serif;
  margin: 15px;
`;
const Subtitle = styled.p`
  font-size: 40px;
  font-family: 'Tangerine', sans-serif;
  margin: 10px;
`;
const Block = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  min-height: 300px;
`;
class App extends Component {
  state = {
    isLoading: true,
    guesses: [],
    randomWord: '',
    data: [],
    lose: false,
    currentTitle: 0,
    currentDiagram: 0,
    goodGuesses: [],
    missedLetters: [],
    newGame: true
  };

  constructor(props) {
    super(props);
    this.fetchWord();
  };

  componentDidMount() {
    const wrapper = document.getElementsByClassName('App')[0];
    // eslint-disable-next-line
    wrapper ? wrapper.focus() : null;
  }

  fetchWord() {
    Promise.all([getRandomWord(27), getRandomWord(80), getRandomWord(53)])
      .then(([horror, crime, thriller]) => [...horror, ...crime, ...thriller])
      .then(
        function (titles) {
          const res = titles.sort(() => {
            return 0.5 - Math.random();
          });
          this.setState({ data: res, isLoading: false });
          return this.setState({ randomWord: res[Math.floor(Math.random() * res.length - 1)] })
        }.bind(this)
      );
  }

  handleClick = e => {
    const letter = e.target.textContent.toLowerCase();
    return letter.length > 1 ? null : this.checkLetter(letter);
  };

  checkLetter = currentLetter => {
    if (this.state.guesses.length > 0) {
      this.state.guesses.map(
        letter =>
          letter === currentLetter
            ? null
            : this.setState({
              guesses: this.state.guesses.concat(currentLetter),
            })
      );
    } else {
      this.setState({
        guesses: this.state.guesses.concat(currentLetter),
      });
    }
    if (!this.getTitle().includes(currentLetter)) {
      this.updateImage();
    } else {
      this.setState(
        {
          goodGuesses: this.state.goodGuesses.concat(currentLetter),
        },
        function () {
          this.isWin();
        }
      );
    }
  };

  getTitle() {
    const currentTitle = this.state.randomWord.toLowerCase();
    const title = [];
    for (let i = 0; i < currentTitle.length; i++) {
      if (letters.test(currentTitle[i]) || currentTitle[i] === ' ') {
        title.push(currentTitle[i]);
      }
    }
    return title.join('');
  }

  isWin() {
    const lettersList = this.getTitle()
      .replace(/ /g, '')
      .split('')
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    return lettersList.sort().toString() ===
      this.state.goodGuesses.sort().toString()
      ? this.gameOver('win')
      : null;
  }

  updateImage = () => {
    if (this.state.currentDiagram < 10) {
      this.setState({
        currentDiagram: this.state.currentDiagram + 1,
      });
    }
    return this.state.currentDiagram === 9 ? this.gameOver('lose') : null;
  };

  gameOver = result => {
    if (result === 'lose') {
      this.setState({
        lose: true,
        newGame: false,
      });
      this.showRest();
    } else {
      this.setState({
        lose: false,
        newGame: false,
      });
    }
  };

  showRest() {
    const missedLetterList = this.getTitle()
      .split('')
      .filter(letter => !this.state.goodGuesses.includes(letter));
    this.setState({
      missedLetters: missedLetterList.join(''),
    });
  }

  handleKeyUp = e => {
    const keyName = e.key;
    if (letters.test(keyName)) {
      return this.isDisabled(keyName) ? null : this.checkLetter(keyName);
    }
  };

  isDisabled(letter) {
    for (let i = 0; i < digits.length; i++) {
      if (digits[i].textContent === letter) {
        return digits[i].hasAttribute('disabled');
      }
    }
  }

  onClickRetry() {
    this.setState({
      currentTitle: this.state.currentTitle + 1,
      guesses: [],
      currentDiagram: 0,
      goodGuesses: [],
      missedLetters: [],
      newGame: true,
      randomWord: this.state.data[this.state.currentTitle]
    });
  }

  render() {
    return (
      <div className="App" tabIndex="1" onKeyUp={this.handleKeyUp}>
        <Name>Hangman</Name>
        <Subtitle>Guess a movie name.</Subtitle>
        <Block>
          <Hangman incorrectGuessCount={this.state.currentDiagram} />
        </Block>
        <UserInput
          guesses={this.state.guesses}
          onClick={this.handleClick}
          newGame={this.state.newGame}
        />
        <DisplayWord
          content={this.getTitle()}
          guesses={this.state.guesses}
          missedLetters={this.state.missedLetters}
        />
        <div>
          <GameOver
            text={this.state.lose ? loseText : winText}
            newGame={this.state.newGame}
            isLose={this.state.lose}
          />
          <CreateNewGame
            onClick={this.onClickRetry.bind(this)}
            newGame={this.state.newGame}
          />
        </div>
      </div>
    );
  }

}

export default App;
