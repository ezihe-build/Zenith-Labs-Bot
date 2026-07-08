const { toDoubleStruck, toMathStyle } = require('../lib/fonts');
const ds = toDoubleStruck;

async function newsletterCommand(sock, chatId, message, cmd, args) {
  const text = args.join(' ');
  let reply = '';
  switch (cmd) {
    case 'newsletter': reply = '\ud83d\udce2 ' + ds('NEWSLETTER') + '\n\nZenith Labs Newsletter\nLatest: Bot v4.1 released!'; break;
    case 'nl-send': reply = '\ud83d\udce4 ' + ds('NL SEND') + '\n\nSending newsletter: ' + (text || 'default'); break;
    case 'nl-image': reply = '\ud83d\uddbc ' + ds('NL IMAGE') + '\n\nSending newsletter image...'; break;
    default: reply = '\u274c Unknown newsletter command: .' + cmd;
  }
  await sock.sendMessage(chatId, { text: reply }, { quoted: message });
}
module.exports = newsletterCommand;
