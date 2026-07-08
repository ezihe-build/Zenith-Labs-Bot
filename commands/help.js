const settings = require('../settings');
const fs = require('fs');
const path = require('path');
const { sendAnimatedLoading } = require('../lib/loadingBar');
const { toDoubleStruck, toMathStyle } = require('../lib/fonts');

const ds = toDoubleStruck;
const ms = toMathStyle;

// ──────────────────────────────────────────────────────────────
// CATEGORY DEFINITIONS
// ──────────────────────────────────────────────────────────────
const CATEGORIES = [
    {
        id: 'ai',
        title: ds('AI MENU'),
        emoji: '\ud83e\udd16',
        img: 'zenith_logo.png',
        cmds: ['.ai', '.gpt', '.gpt4', '.gpt5', '.metaai', '.codeai', '.triviaai', '.photoai', '.storyai', '.gemini', '.imagine', '.flux', '.sora']
    },
    {
        id: 'group',
        title: ds('GROUP MENU'),
        emoji: '\ud83d\udccc',
        img: 'richard.png',
        cmds: ['.hidetag', '.tagall', '.demote', '.promote', '.mute', '.unmute', '.join', '.kick', '.left', '.add', '.creategroup', '.resetlink', '.grouplink', '.kickadmins', '.kickall', '.listadmins', '.listonline', '.opentime', '.closetime', '.antilink', '.getchannel', '.followchannel', '.vcf']
    },
    {
        id: 'owner',
        title: ds('OWNER MENU'),
        emoji: '\ud83d\udd12',
        img: 'portfolio.png',
        cmds: ['.poem', '.newmail', '.readmail', '.deltmp', '.tempmail2', '.tempmail-inbox', '.github', '.addsudo', '.setsudo', '.listsudo', '.delsudo', '.rewrite', '.codeai', '.npm', '.setpp', '.owner', '.repo', '.ban', '.unban', '.alive', '.ping', '.self', '.public']
    },
    {
        id: 'fun',
        title: ds('FUN MENU'),
        emoji: '\ud83d\ude1b',
        img: 'madara1.jpg',
        cmds: ['.wouldyou', '.flirt', '.moe', '.sfw', '.cartoonify', '.story', '.rate', '.ship', '.truthdare', '.compliment', '.roast', '.trivia', '.triviaai', '.aipic', '.hentai', '.chinagirl', 'bluearchive', '.boypic', '.carimage', '.random-girl', '.hijab-girl', '.indonesia-girl', '.japan-girl', '.korean-girl', '.loli', '.malaysia-girl', '.profile-pictures', '.thailand-girl', '.tiktok-girl', '.vietnam-girl', '.joke', '.truth', '.dare', '.meme', '.advice', '.urban', '.moviequote', '.triviafact', '.inspire', '.ascii', '.progquote', '.dadjoke', '.prog', '.quotememe', '.funfact', '.panda', '.bird', '.koala', '.fox', '.dog', '.fact', '.paptt']
    },
    {
        id: 'anime',
        title: ds('ANIME MENU'),
        emoji: '\ud83c\udfa1',
        img: 'madara2.jpg',
        cmds: ['.manga', '.rwaifu', '.waifu', '.animekill', '.animelick', '.animebite', '.animeglomp', '.animehappy', '.animedance', '.animecringe', '.animehighfive', '.animepoke', '.animewink', '.animesmile', '.animesmug', '.animewlp', '.animesearch', '.animeavatar']
    },
    {
        id: 'download',
        title: ds('DOWNLOAD MENU'),
        emoji: '\ud83d\udce5',
        img: 'zenith_logo.png',
        cmds: ['.play', '.play2', '.vv', '.vv2', '.tiktok', '.toimg', '.ytsearch', '.movie', '.tomp3', '.tomp4', '.url', '.apk', '.pdftotext', '.qrcode', '.shorturl', '.say', '.tgstickers', '.mediafire', '.imdb', '.tts', '.fbdl', '.igdl']
    },
    {
        id: 'logo',
        title: ds('LOGO MENU'),
        emoji: '\ud83d\udca5',
        img: 'richard.png',
        cmds: ['.gfx1', '.gfx2', '.gfx3', '.gfx4', '.gfx5', '.gfx6', '.gfx7', '.gfx8', '.gfx9', '.gfx10', '.gfx11', '.gfx12', '.brat', '.furbrat']
    },
    {
        id: 'sticker',
        title: ds('STICKER MENU'),
        emoji: '\ud83d\ude0b',
        img: 'portfolio.png',
        cmds: ['.sticker', '.toimg', '.cry', '.kill', '.hug', '.happy', '.dance', '.handhold', '.highfive', '.slap', '.kiss', '.blush', '.bite', '.cuddle', '.furbrat', '.shinobu', '.bonk', '.pat', '.nom']
    },
    {
        id: 'sound',
        title: ds('SOUND MENU'),
        emoji: '\ud83d\udd0a',
        img: 'madara1.jpg',
        cmds: ['.bass', '.blown', '.earrape', '.deep', '.fast', '.nightcore', '.reverse', '.robot', '.slow', '.smooth', '.squirrel']
    },
    {
        id: 'game',
        title: ds('GAME MENU'),
        emoji: '\ud83c\udfae',
        img: 'madara2.jpg',
        cmds: ['.rps', '.guess', '.gamefact', '.coin', '.rpsls', '.dice', '.emojiquiz', '.math', '.numberbattle', '.coinbattle', '.numbattle', '.hangman', '.tictactoe']
    },
    {
        id: 'other',
        title: ds('OTHER MENU'),
        emoji: '\u264e',
        img: 'zenith_logo.png',
        cmds: ['.toimg', '.dadjoke', '.8ball', '.password', '.idch', '.react-ch', '.jid', '.dictionary', '.getpp', '.wiki', '.qc', '.readqr', '.genpass', '.myip', '.iplookup', '.currency', '.time', '.recipe', '.horoscope', '.book', '.remind', '.mathfact', '.recipe-ingredient', '.sciencefact', '.calculate', '.weather', '.gitclone', '.npmstalk', '.ffstalk', '.readmore']
    },
    {
        id: 'ephoto',
        title: ds('EPHOTO MENU'),
        emoji: '\ud83d\uddbc\ufe0f',
        img: 'richard.png',
        cmds: ['.glitchtext', '.writetext', '.advancedglow', '.typographytext', '.pixelglitch', '.neonglitch', '.flagtext', '.flag3dtext', '.deletingtext', '.blackpinkstyle', '.glowingtext', '.underwatertext', '.logomaker', '.cartoonstyle', '.papercutstyle', '.watercolortext', '.effectclouds', '.blackpinklogo', '.gradienttext', '.summerbeach', '.luxurygold', '.multicoloredneon', '.sandsummer', '.galaxywallpaper', '.style1917', '.makingneon', '.royaltext', '.freecreate', '.galaxystyle', '.lighteffects']
    },
    {
        id: 'newsletter',
        title: ds('NEWSLETTER'),
        emoji: '\ud83d\udce2',
        img: 'portfolio.png',
        cmds: ['.newsletter', '.nl-send', '.nl-image']
    },
    {
        id: 'crazycheck',
        title: ds('CRAZY CHECK'),
        emoji: '\ud83e\udd21',
        img: 'madara2.jpg',
        cmds: ['.smartcheck', '.greatcheckcase', '.stupidcheck', '.uncleancheck', '.hotcheck', '.gaycheck', '.waifucheck', '.evilcheck', '.dogcheck', '.coolcheck']
    }
];

// ──────────────────────────────────────────────────────────────
// HELP COMMAND
// ──────────────────────────────────────────────────────────────

async function helpCommand(sock, chatId, message) {
    const pushName = message.pushName || 'User';
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const runtimeStr = hours + 'h ' + minutes + 'm ' + seconds + 's';
    const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
    const totalRAM = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(1);
    const start = Date.now();
    await sock.sendMessage(chatId, { text: '_p_' });
    const ping = Date.now() - start;

    // Status panel with loading animation
    const statusPrefix = ds('ZENITH LABS SYSTEM ONLINE') + ' \u26a1\n\n' +
        ms('User') + '     : ' + pushName + '\n' +
        ms('Bot') + '      : ' + ds('ZENITH LABS BOT') + '\n' +
        ms('Version') + '  : 4.1.0\n' +
        ms('Runtime') + '  : ' + runtimeStr + '\n' +
        ms('Ping') + '     : ' + ping + 'ms\n' +
        ms('RAM') + '      : ' + usedRAM + 'MB / ' + totalRAM + 'MB\n' +
        ms('Commands') + ' : 200+\n' +
        ms('Status') + '   : \ud83d\udfe2 OPERATIONAL\n';

    await sendAnimatedLoading(sock, chatId, message, statusPrefix);

    // Build interactive list message with categories as sections
    const sections = CATEGORIES.map(cat => ({
        title: cat.emoji + ' ' + cat.title,
        rows: cat.cmds.slice(0, 10).map(cmd => ({
            title: cmd,
            rowId: cmd,
            description: ms('Tap to use')
        }))
    }));

    // Send interactive list menu
    try {
        await sock.sendMessage(chatId, {
            text: ds('ZENITH LABS COMMAND MENU') + '\n\n' + ms('Select a category below to see commands:'),
            footer: '\ud83c\udfad ' + ms('Zenith Labs') + ' | zenith-labs-ten.vercel.app',
            title: '\ud83d\udd25 ' + ds('ZENITH LABS BOT v4.1') + ' \ud83d\udd25',
            buttonText: ms('TAP TO OPEN'),
            sections: sections
        }, { quoted: message });
    } catch (e) {
        // Fallback if list message fails
        let fallbackText = '\u2554' + '\u2550'.repeat(30) + '\u2557\n';
        fallbackText += '\u2551 ' + ds('ZENITH LABS BOT v4.1') + ' \u2551\n';
        fallbackText += '\u255a' + '\u2550'.repeat(30) + '\u255d\n\n';
        for (const cat of CATEGORIES) {
            fallbackText += '\u2554' + '\u2550'.repeat(28) + '\u2557\n';
            fallbackText += '\u2551 ' + cat.emoji + ' ' + cat.title + '\u2551\n';
            fallbackText += '\u2560' + '\u2550'.repeat(28) + '\u2563\n';
            for (const cmd of cat.cmds.slice(0, 8)) {
                fallbackText += '\u2551 \u25cf ' + ms(cmd) + '\u2551\n';
            }
            fallbackText += '\u255a' + '\u2550'.repeat(28) + '\u255d\n\n';
        }
        fallbackText += '\ud83d\udc64 Founder: Ezihe Chigorzim (Richard)\n';
        fallbackText += '\ud83d\uddbc\ufe0f Site: https://zenith-labs-ten.vercel.app\n';
        fallbackText += '\ud83d\udce7 Contact: +234 814 291 3572\n';
        await sock.sendMessage(chatId, { text: fallbackText }, { quoted: message });
    }

    // Send audio after menu
    try {
        const audioPath = path.join(__dirname, '../assets/menu_audio.m4a');
        if (fs.existsSync(audioPath)) {
            await sock.sendMessage(chatId, {
                audio: fs.readFileSync(audioPath),
                mimetype: 'audio/mp4',
                ptt: false
            });
        }
    } catch (e) {
        console.log('Audio send failed:', e.message);
    }

    // Send category image
    try {
        const imgPath = path.join(__dirname, '../assets/zenith_logo.png');
        if (fs.existsSync(imgPath)) {
            await sock.sendMessage(chatId, {
                image: fs.readFileSync(imgPath),
                caption: ds('ZENITH LABS') + '\n' + ms('Powered by Zenith Labs Bot v4.1'),
                contextInfo: { forwardingScore: 999, isForwarded: true }
            });
        }
    } catch (e) {
        console.log('Image send failed:', e.message);
    }
}

module.exports = helpCommand;
