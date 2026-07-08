const { toDoubleStruck, toMathStyle } = require('../lib/fonts');
const ds = toDoubleStruck;

async function ephotoCommand(sock, chatId, message, cmd, args) {
  const text = args.join(' ') || 'Zenith Labs';
  await sock.sendMessage(chatId, {
    text: '\ud83c\udfa8 ' + ds(cmd.toUpperCase().replace(/-/g, ' ')) + '\n\nGenerating ephoto with text: ' + text + '\n\n(Use external API for actual image generation)'
  }, { quoted: message });
}
module.exports = ephotoCommand;
