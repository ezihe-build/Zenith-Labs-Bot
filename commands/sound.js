const { toDoubleStruck, toMathStyle } = require('../lib/fonts');
const ds = toDoubleStruck;

async function soundCommand(sock, chatId, message, cmd) {
  const effects = {
    bass: 'BASS BOOSTED',
    blown: 'BLOWN OUT',
    earrape: 'EARRAPE',
    deep: 'DEEP VOICE',
    fast: 'FAST',
    nightcore: 'NIGHTCORE',
    reverse: 'REVERSE',
    robot: 'ROBOT',
    slow: 'SLOW',
    smooth: 'SMOOTH',
    squirrel: 'SQUIRREL'
  };
  const effect = effects[cmd] || cmd.toUpperCase();
  await sock.sendMessage(chatId, {
    text: '\ud83c\udfb5 ' + ds(effect) + '\n\nApply ' + effect + ' to audio (reply to audio with .' + cmd + ')'
  }, { quoted: message });
}
module.exports = soundCommand;
