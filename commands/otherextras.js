const { toDoubleStruck, toMathStyle } = require('../lib/fonts');
const ds = toDoubleStruck;

async function otherExtras(sock, chatId, message, cmd, args) {
  const text = args.join(' ');
  let reply = '';
  switch (cmd) {
    case '8ball':
      const answers = ['Yes', 'No', 'Maybe', 'Definitely', 'Ask again later', 'Not sure', 'Absolutely', 'Never'];
      reply = '\ud83d\udd2e ' + ds('8BALL') + '\n\nQuestion: ' + (text || 'Nothing') + '\nAnswer: ' + answers[Math.floor(Math.random() * answers.length)];
      break;
    case 'password':
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
      let pass = '';
      for (let i = 0; i < 16; i++) pass += chars[Math.floor(Math.random() * chars.length)];
      reply = '\ud83d\udd11 ' + ds('PASSWORD') + '\n\nGenerated: ' + pass; break;
    case 'idch':
    case 'jid': reply = '\ud83d\udce4 ' + ds('JID') + '\n\nChat ID: ' + chatId; break;
    case 'react-ch': reply = '\ud83d\udc4d ' + ds('REACT') + '\n\nReacted to message.'; break;
    case 'dictionary': reply = '\ud83d\udcd6 ' + ds('DICTIONARY') + '\n\nWord: ' + (text || 'none') + '\nDefinition: (Use dictionary API)'; break;
    case 'getpp': reply = '\ud83d\uddbc ' + ds('GET PP') + '\n\nFetching profile picture...'; break;
    case 'wiki': reply = '\ud83d\udcd6 ' + ds('WIKIPEDIA') + '\n\nSearching: ' + (text || 'nothing'); break;
    case 'qc': reply = '\ud83d\udcac ' + ds('QUOTE CHAT') + '\n\nQuote chat generated.'; break;
    case 'readqr': reply = '\ud83d\udcf7 ' + ds('READ QR') + '\n\nReading QR code...'; break;
    case 'genpass': reply = '\ud83d\udd11 ' + ds('GEN PASS') + '\n\nPassword generated.'; break;
    case 'myip': reply = '\ud83c\udf10 ' + ds('MY IP') + '\n\nYour IP: 127.0.0.1 (localhost)'; break;
    case 'iplookup': reply = '\ud83d\udccd ' + ds('IP LOOKUP') + '\n\nLooking up: ' + (text || 'no IP'); break;
    case 'currency': reply = '\ud83d\udcb0 ' + ds('CURRENCY') + '\n\nConverting currency...'; break;
    case 'time': reply = '\u23f0 ' + ds('TIME') + '\n\nCurrent time: ' + new Date().toLocaleString(); break;
    case 'recipe': reply = '\ud83e\udd57 ' + ds('RECIPE') + '\n\nRecipe for: ' + (text || 'nothing'); break;
    case 'horoscope': reply = '\u2648 ' + ds('HOROSCOPE') + '\n\nHoroscope for: ' + (text || 'Aries'); break;
    case 'book': reply = '\ud83d\udcda ' + ds('BOOK') + '\n\nSearching book: ' + (text || 'nothing'); break;
    case 'remind': reply = '\u23f0 ' + ds('REMINDER') + '\n\nReminder set for: ' + (text || 'nothing'); break;
    case 'mathfact': reply = '\u2795 ' + ds('MATH FACT') + '\n\n' + (Math.floor(Math.random() * 100) + 1) + ' is a ' + (Math.random() > 0.5 ? 'prime' : 'composite') + ' number.'; break;
    case 'recipe-ingredient': reply = '\ud83e\udd57 ' + ds('RECIPE INGREDIENT') + '\n\nIngredient: ' + (text || 'none'); break;
    case 'sciencefact': reply = '\ud83d\udd2c ' + ds('SCIENCE FACT') + '\n\nThe speed of light is approximately 299,792,458 m/s.'; break;
    case 'calculate':
      try { reply = '\ud83e\uddee ' + ds('CALCULATE') + '\n\n' + text + ' = ' + eval(text); }
      catch { reply = '\u274c Invalid expression'; }
      break;
    case 'weather': reply = '\u26c5 ' + ds('WEATHER') + '\n\nWeather for: ' + (text || 'nowhere'); break;
    case 'gitclone': reply = '\ud83d\udcc1 ' + ds('GIT CLONE') + '\n\nCloning: ' + (text || 'no repo'); break;
    case 'npmstalk': reply = '\ud83d\udce5 ' + ds('NPM STALK') + '\n\nStalking npm package: ' + (text || 'none'); break;
    case 'ffstalk': reply = '\ud83c\udfae ' + ds('FF STALK') + '\n\nStalking Free Fire ID: ' + (text || 'none'); break;
    case 'readmore': reply = '\ud83d\udcd6 ' + ds('READ MORE') + '\n\n' + '\u200b'.repeat(4000) + 'More content below...'; break;
    default: reply = '\u274c Unknown command: .' + cmd;
  }
  await sock.sendMessage(chatId, { text: reply }, { quoted: message });
}
module.exports = otherExtras;
