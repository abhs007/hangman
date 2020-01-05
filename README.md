# hangman

The classic [Hangman
game](<https://en.wikipedia.org/wiki/Hangman_(game)>) in React.


## Requirements

- Generate a random word for the player to guess
- Provide a mechanism for the player to input their letter guesses
- When the player guesses a letter it should reveal matching instances of
  that letter in the word
- The game is won if the player is able to correctly guess all of the letters
  in the word before making 10 incorrect guesses
- If the player has guessed 10 times without revealing the word, the game is
  lost

The UI should include the following, but feel free to add more if you see the
need or would like to get creative.

- A masked version of the word, with correct guesses revealed
  - For example, if the word is “voleer” and the player has guessed the
    letter “e” then the word should be displayed as: \_ \_ _ E E _
- An input mechanism of some kind which allows the player to input their next guess
- An indication of which letters the player has already guessed incorrectly
- An indication of how many remaining incorrect guesses the player has before
  the game is over
- An indication of win/loss state when the game is over
- The ability to start a new game once the game is over
