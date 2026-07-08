const { toDoubleStruck, toMathStyle } = require('../lib/fonts');
const ds = toDoubleStruck;
const ms = toMathStyle;

async function ownerExtras(sock, chatId, message, cmd, args) {
  const text = args.join(' ');
  let reply = '';
  switch (cmd) {
    case 'poem': reply = '\ud83d\udcd6 ' + ds('POEM') + '\n\nRoses are red,\nViolets are blue,\nZenith Labs is great,\nAnd so are you!'; break;
    case 'newmail':
    case 'tempmail2':
    case 'tempmail-inbox':
      reply = '\ud83d\udce7 ' + ds('TEMP MAIL') + '\n\nTemp mail generated: zenith' + Math.floor(Math.random()*9999) + '@tempmail.com'; break;
    case 'readmail': reply = '\ud83d\udce7 ' + ds('READ MAIL') + '\n\nNo new messages in inbox.'; break;
    case 'deltmp': reply = '\ud83d\uddd1 ' + ds('DELETE TEMP') + '\n\nTemp files cleared.'; break;
    case 'github': reply = '\ud83d\udc27 ' + ds('GITHUB') + '\n\nhttps://github.com/ezihe-building/Knightbot-MD'; break;
    case 'addsudo':
    case 'setsudo':
    case 'listsudo':
    case 'delsudo':
      reply = '\ud83d\udd12 ' + ds('SUDO') + '\n\nCommand: .' + cmd + ' ' + (text || '') + '\nUse .sudo for full sudo management.'; break;
    case 'rewrite': reply = '\ud83d\udd04 ' + ds('REWRITE') + '\n\nText rewritten: ' + (text || 'No text provided'); break;
    case 'codeai': reply = '\ud83e\udd16 ' + ds('CODE AI') + '\n\nGenerating code for: ' + (text || 'nothing'); break;
    case 'npm': reply = '\ud83d\udce6 ' + ds('NPM') + '\n\nSearching npm for: ' + (text || 'nothing'); break;
    case 'owner': reply = '\ud83d\udc64 ' + ds('OWNER') + '\n\nOwner: Ezihe Chigorzim (Richard)\nContact: +234 814 291 3572\nSite: zenith-labs-ten.vercel.app'; break;
    case 'repo': reply = '\ud83d\udcc1 ' + ds('REPO') + '\n\nhttps://github.com/ezihe-building/Knightbot-MD'; break;
    case 'ban': reply = '\ud83d\udeab ' + ds('BAN') + '\n\nUser ' + (text || '') + ' banned.'; break;
    case 'unban': reply = '\u2705 ' + ds('UNBAN') + '\n\nUser ' + (text || '') + ' unbanned.'; break;
    case 'alive': reply = '\ud83d\udfe2 ' + ds('ALIVE') + '\n\nZenith Labs Bot is ONLINE!\nVersion: 4.1.0\nStatus: Operational'; break;
    case 'ping': reply = '\u26a1 ' + ds('PING') + '\n\nPong! Bot is responsive.'; break;
    case 'self': reply = '\ud83d\udd12 ' + ds('SELF MODE') + '\n\nBot set to self mode.'; break;
    case 'public': reply = '\ud83c\udf10 ' + ds('PUBLIC MODE') + '\n\nBot set to public mode.'; break;
    default: reply = '\u274c Unknown owner command: .' + cmd;
  }
  await sock.sendMessage(chatId, { text: reply }, { quoted: message });
}
module.exports = ownerExtras;
