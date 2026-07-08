const { toDoubleStruck, toMathStyle } = require('../lib/fonts');
const ds = toDoubleStruck;
const ms = toMathStyle;

const GAMEFACTS = [
  "The longest Monopoly game ever played lasted 70 days.",
  "The first video game was created in 1958.",
  "Minecraft has sold over 300 million copies.",
  "The highest score possible in Pac-Man is 3,333,360 points."
];

async function gameCommand(sock, chatId, message, cmd, args) {
  const text = args.join(' ');
  let reply = '';

  switch (cmd) {
    case 'rps':
      const choices = ['rock', 'paper', 'scissors'];
      const botChoice = choices[Math.floor(Math.random() * 3)];
      const userChoice = (text || 'rock').toLowerCase();
      if (!choices.includes(userChoice)) { reply = '\u274c Choose rock, paper, or scissors'; break; }
      let result = '';
      if (userChoice === botChoice) result = 'Draw!';
      else if ((userChoice === 'rock' && botChoice === 'scissors') || (userChoice === 'paper' && botChoice === 'rock') || (userChoice === 'scissors' && botChoice === 'paper')) result = 'You win!';
      else result = 'Bot wins!';
      reply = '\u270a ' + ds('ROCK PAPER SCISSORS') + '\n\nYou: ' + userChoice + '\nBot: ' + botChoice + '\n\n' + result;
      break;
    case 'rpsls':
      const ls = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
      const bc = ls[Math.floor(Math.random() * 5)];
      const uc = (text || 'rock').toLowerCase();
      reply = '\u270a ' + ds('RPSLS') + '\n\nYou: ' + uc + '\nBot: ' + bc;
      break;
    case 'coin':
      reply = '\ud83d\udcb0 ' + ds('COIN FLIP') + '\n\n' + (Math.random() > 0.5 ? 'Heads!' : 'Tails!');
      break;
    case 'dice':
      reply = '\ud83c\udfb2 ' + ds('DICE ROLL') + '\n\nYou rolled a ' + (Math.floor(Math.random() * 6) + 1);
      break;
    case 'guess':
      const num = Math.floor(Math.random() * 100) + 1;
      const guess = parseInt(text);
      if (!guess) { reply = '\u274c Usage: .guess <number>'; break; }
      reply = '\ud83e\udde0 ' + ds('GUESS') + '\n\nTarget: ' + num + '\nYour guess: ' + guess + '\n' + (guess === num ? '\ud83c\udf89 Correct!' : guess > num ? 'Too high!' : 'Too low!');
      break;
    case 'emojiquiz':
      const emojis = ['\ud83c\udf55', '\ud83c\udf0d', '\ud83d\udc18', '\u26a1', '\ud83c\udfa8'];
      const answers = ['pizza', 'earth', 'elephant', 'flash', 'art'];
      const idx = Math.floor(Math.random() * emojis.length);
      reply = '\ud83c\udfae ' + ds('EMOJI QUIZ') + '\n\nGuess: ' + emojis[idx] + '\nAnswer: ' + answers[idx];
      break;
    case 'math':
      const n1 = Math.floor(Math.random() * 50) + 1;
      const n2 = Math.floor(Math.random() * 50) + 1;
      const op = ['+', '-', '*'][Math.floor(Math.random() * 3)];
      const ans = op === '+' ? n1 + n2 : op === '-' ? n1 - n2 : n1 * n2;
      reply = '\u2795 ' + ds('MATH') + '\n\n' + n1 + ' ' + op + ' ' + n2 + ' = ?\nAnswer: ' + ans;
      break;
    case 'numberbattle':
    case 'numbattle':
    case 'coinbattle':
      reply = '\u2694 ' + ds('BATTLE') + '\n\nYou: ' + (Math.floor(Math.random() * 100) + 1) + '\nBot: ' + (Math.floor(Math.random() * 100) + 1);
      break;
    case 'gamefact':
      reply = '\ud83c\udfae ' + ds('GAME FACT') + '\n\n' + GAMEFACTS[Math.floor(Math.random() * GAMEFACTS.length)];
      break;
    case 'hangman':
      reply = '\ud83d\udcd6 ' + ds('HANGMAN') + '\n\nWord: _ _ _ _ _\nHint: A programming language\nAnswer: ZENITH';
      break;
    case 'tictactoe':
      reply = '\u274c ' + ds('TICTACTOE') + '\n\nUse .tictactoe @user to start a game';
      break;
    default:
      reply = '\u274c Unknown game: .' + cmd;
  }
  await sock.sendMessage(chatId, { text: reply }, { quoted: message });
}
module.exports = gameCommand;
