const { toDoubleStruck, toMathStyle } = require('../lib/fonts');
const ds = toDoubleStruck;

async function crazyCheck(sock, chatId, message, cmd, args) {
  const target = args.join(' ') || message.pushName || 'You';
  const checks = {
    smartcheck: ['genius', 'smart', 'average', 'dull', 'confused'],
    greatcheckcase: ['legendary', 'great', 'good', 'okay', 'meh'],
    stupidcheck: ['wise', 'normal', 'silly', 'clumsy', 'total disaster'],
    uncleancheck: ['sparkling clean', 'clean', 'normal', 'messy', 'disaster zone'],
    hotcheck: ['freezing', 'cold', 'warm', 'hot', 'absolutely fire'],
    gaycheck: ['straight', 'curious', 'bi-curious', 'flexible', 'rainbow'],
    waifucheck: ['trash', 'normal', 'cute', 'beautiful', 'absolute waifu'],
    evilcheck: ['angel', 'kind', 'neutral', 'mischievous', 'pure evil'],
    dogcheck: ['cat person', 'normal', 'likes dogs', 'dog lover', 'absolute doggo'],
    coolcheck: ['boring', 'plain', 'okay', 'cool', 'absolute legend']
  };
  const check = checks[cmd] || ['low', 'medium', 'high', 'very high', 'extreme'];
  const level = Math.floor(Math.random() * check.length);
  const percent = Math.floor(Math.random() * 100);
  await sock.sendMessage(chatId, {
    text: '\ud83e\udde9 ' + ds(cmd.toUpperCase().replace(/-/g, ' ')) + '\n\nTarget: ' + target + '\nResult: ' + check[level] + ' (' + percent + '%)'
  }, { quoted: message });
}
module.exports = crazyCheck;
