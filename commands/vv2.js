const isOwnerOrSudo = require('../lib/isOwner');

async function vv2Command(sock, chatId, message, args) {
    try {
        // FIX: Normalize senderId to string
        const rawSender = message.key.participant || message.key.remoteJid || '';
        const senderId = String(rawSender);
        const isAuthorized = await isOwnerOrSudo(senderId, sock, chatId);
        if (!isAuthorized) {
            await sock.sendMessage(chatId, { text: '\u274c Owner only.' }, { quoted: message });
            return;
        }

        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted) {
            await sock.sendMessage(chatId, { text: 'Reply to an image/video with .vv2 to send it view-once to yourself.' }, { quoted: message });
            return;
        }

        const botJid = sock.user.id;
        let content = {};

        if (quoted.imageMessage) {
            content = { image: { url: quoted.imageMessage.url }, caption: quoted.imageMessage.caption || '', viewOnce: true };
        } else if (quoted.videoMessage) {
            content = { video: { url: quoted.videoMessage.url }, caption: quoted.videoMessage.caption || '', viewOnce: true };
        } else {
            await sock.sendMessage(chatId, { text: 'Only images and videos supported for view-once.' }, { quoted: message });
            return;
        }

        await sock.sendMessage(botJid, content);
        await sock.sendMessage(chatId, { text: '\u2705 View-once sent to yourself.' }, { quoted: message });
    } catch (error) {
        console.error('VV2 error:', error);
        await sock.sendMessage(chatId, { text: '\u274c VV2 failed: ' + (error.message || error) }, { quoted: message });
    }
}

module.exports = vv2Command;
