const { toDoubleStruck, toMathStyle } = require('../lib/fonts');
const ds = toDoubleStruck;

async function downExtras(sock, chatId, message, cmd, args) {
  const text = args.join(' ');
  let reply = '';
  switch (cmd) {
    case 'play2': reply = '\ud83c\udfb5 ' + ds('PLAY2') + '\n\nSearching for: ' + (text || 'nothing'); break;
    case 'ytsearch': reply = '\ud83d\udd0d ' + ds('YT SEARCH') + '\n\nSearching YouTube for: ' + (text || 'nothing'); break;
    case 'movie': reply = '\ud83c\udfac ' + ds('MOVIE') + '\n\nSearching movie: ' + (text || 'nothing'); break;
    case 'tomp3': reply = '\ud83c\udfb5 ' + ds('TO MP3') + '\n\nConverting to MP3...'; break;
    case 'tomp4': reply = '\ud83c\udfa5 ' + ds('TO MP4') + '\n\nConverting to MP4...'; break;
    case 'apk': reply = '\ud83d\udcf1 ' + ds('APK') + '\n\nSearching APK: ' + (text || 'nothing'); break;
    case 'pdftotext': reply = '\ud83d\udcc4 ' + ds('PDF TO TEXT') + '\n\nConverting PDF to text...'; break;
    case 'qrcode': reply = '\ud83d\udcf7 ' + ds('QR CODE') + '\n\nGenerating QR for: ' + (text || 'nothing'); break;
    case 'shorturl': reply = '\ud83d\udd17 ' + ds('SHORT URL') + '\n\nShortening: ' + (text || 'no URL'); break;
    case 'say': reply = '\ud83d\udde3 ' + ds('SAY') + '\n\n' + (text || 'Hello from Zenith Labs'); break;
    case 'tgstickers': reply = '\ud83d\udc9a ' + ds('TG STICKERS') + '\n\nSearching Telegram stickers: ' + (text || 'nothing'); break;
    case 'mediafire': reply = '\ud83d\udce5 ' + ds('MEDIAFIRE') + '\n\nDownloading from MediaFire: ' + (text || 'no link'); break;
    case 'imdb': reply = '\ud83c\udfac ' + ds('IMDB') + '\n\nSearching IMDB for: ' + (text || 'nothing'); break;
    case 'fbdl': reply = '\ud83d\udce5 ' + ds('FB DOWNLOAD') + '\n\nDownloading Facebook video: ' + (text || 'no link'); break;
    case 'igdl': reply = '\ud83d\udce5 ' + ds('IG DOWNLOAD') + '\n\nDownloading Instagram post: ' + (text || 'no link'); break;
    default: reply = '\u274c Unknown download command: .' + cmd;
  }
  await sock.sendMessage(chatId, { text: reply }, { quoted: message });
}
module.exports = downExtras;
