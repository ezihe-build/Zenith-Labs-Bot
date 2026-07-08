const { toDoubleStruck, toMathStyle } = require('../lib/fonts');
const ds = toDoubleStruck;

async function animeExtras(sock, chatId, message, cmd, args) {
  const text = args.join(' ');
  let reply = '';
  switch (cmd) {
    case 'manga': reply = '\ud83d\udcd5 ' + ds('MANGA') + '\n\nSearching manga: ' + (text || 'nothing'); break;
    case 'rwaifu': reply = '\ud83d\udc69 ' + ds('RANDOM WAIFU') + '\n\nFetching random waifu...'; break;
    case 'waifu': reply = '\ud83d\udc69 ' + ds('WAIFU') + '\n\nFetching waifu...'; break;
    case 'animekill': reply = '\ud83d\udc80 ' + ds('ANIME KILL') + '\n\n*anime kill gif*'; break;
    case 'animelick': reply = '\ud83d\udc45 ' + ds('ANIME LICK') + '\n\n*anime lick gif*'; break;
    case 'animebite': reply = '\ud83d\udc3e ' + ds('ANIME BITE') + '\n\n*anime bite gif*'; break;
    case 'animeglomp': reply = '\ud83e\udd17 ' + ds('ANIME GLOMP') + '\n\n*anime glomp gif*'; break;
    case 'animehappy': reply = '\ud83d\ude04 ' + ds('ANIME HAPPY') + '\n\n*anime happy gif*'; break;
    case 'animedance': reply = '\ud83d\udc83 ' + ds('ANIME DANCE') + '\n\n*anime dance gif*'; break;
    case 'animecringe': reply = '\ud83d\ude2c ' + ds('ANIME CRINGE') + '\n\n*anime cringe gif*'; break;
    case 'animehighfive': reply = '\ud83d\udd90 ' + ds('ANIME HIGH FIVE') + '\n\n*anime high five gif*'; break;
    case 'animepoke': reply = '\ud83d\udc49 ' + ds('ANIME POKE') + '\n\n*anime poke gif*'; break;
    case 'animewink': reply = '\ud83d\ude09 ' + ds('ANIME WINK') + '\n\n*anime wink gif*'; break;
    case 'animesmile': reply = '\ud83d\ude0a ' + ds('ANIME SMILE') + '\n\n*anime smile gif*'; break;
    case 'animesmug': reply = '\ud83d\ude0f ' + ds('ANIME SMUG') + '\n\n*anime smug gif*'; break;
    case 'animewlp': reply = '\ud83d\udc9c ' + ds('ANIME WLP') + '\n\n*anime wallpaper*'; break;
    case 'animesearch': reply = '\ud83d\udd0d ' + ds('ANIME SEARCH') + '\n\nSearching: ' + (text || 'nothing'); break;
    case 'animeavatar': reply = '\ud83d\udc64 ' + ds('ANIME AVATAR') + '\n\nGenerating anime avatar...'; break;
    default: reply = '\u274c Unknown anime command: .' + cmd;
  }
  await sock.sendMessage(chatId, { text: reply }, { quoted: message });
}
module.exports = animeExtras;
