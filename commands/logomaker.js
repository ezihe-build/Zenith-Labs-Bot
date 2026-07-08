const { toDoubleStruck, toMathStyle } = require('../lib/fonts');
const ds = toDoubleStruck;

async function logoCommand(sock, chatId, message, cmd, args) {
  const text = args.join(' ') || 'Zenith Labs';
  await sock.sendMessage(chatId, {
    text: '\ud83d\udca5 ' + ds(cmd.toUpperCase()) + '\n\nGenerating logo with text: ' + text + '\n\n(Use external logo API for actual generation)'
  }, { quoted: message });
}
module.exports = logoCommand;
