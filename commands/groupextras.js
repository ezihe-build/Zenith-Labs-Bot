const { toDoubleStruck, toMathStyle } = require('../lib/fonts');
const ds = toDoubleStruck;
const ms = toMathStyle;

async function groupExtras(sock, chatId, message, cmd, args) {
  const text = args.join(' ');
  let reply = '';
  switch (cmd) {
    case 'join': reply = '\ud83d\udeaa ' + ds('JOIN') + '\n\nJoining group: ' + (text || 'no link'); break;
    case 'left': reply = '\ud83d\udc4b ' + ds('LEFT') + '\n\nLeaving group...'; break;
    case 'add': reply = '\u2795 ' + ds('ADD') + '\n\nAdding: ' + (text || 'no number'); break;
    case 'creategroup': reply = '\ud83d\udc65 ' + ds('CREATE GROUP') + '\n\nCreating group: ' + (text || 'Zenith Group'); break;
    case 'grouplink': reply = '\ud83d\udcc4 ' + ds('GROUP LINK') + '\n\nFetching group link...'; break;
    case 'kickadmins': reply = '\ud83d\udeab ' + ds('KICK ADMINS') + '\n\nKicking all admins (owner only)...'; break;
    case 'kickall': reply = '\ud83d\udeab ' + ds('KICK ALL') + '\n\nKicking all members (owner only)...'; break;
    case 'listadmins': reply = '\ud83d\udcdc ' + ds('LIST ADMINS') + '\n\nFetching admin list...'; break;
    case 'listonline': reply = '\ud83d\udfe2 ' + ds('LIST ONLINE') + '\n\nFetching online members...'; break;
    case 'opentime': reply = '\ud83d\udd13 ' + ds('OPEN TIME') + '\n\nGroup open time set.'; break;
    case 'closetime': reply = '\ud83d\udd12 ' + ds('CLOSE TIME') + '\n\nGroup close time set.'; break;
    case 'getchannel': reply = '\ud83d\udce2 ' + ds('GET CHANNEL') + '\n\nFetching channel: ' + (text || 'no link'); break;
    case 'followchannel': reply = '\u2795 ' + ds('FOLLOW CHANNEL') + '\n\nFollowing channel: ' + (text || 'no link'); break;
    case 'vcf': reply = '\ud83d\udc65 ' + ds('VCF') + '\n\nSending VCF contact card...'; break;
    default: reply = '\u274c Unknown group command: .' + cmd;
  }
  await sock.sendMessage(chatId, { text: reply }, { quoted: message });
}
module.exports = groupExtras;
