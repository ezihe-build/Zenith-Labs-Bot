function getLoadingBar(percent) {
    const filled = Math.round(percent / 10);
    const empty = 10 - filled;
    const bar = '\u2588'.repeat(filled) + '\u2591'.repeat(empty);
    return bar + ' ' + percent + '%';
}

function getLoadingStages() {
    return [10, 30, 50, 70, 90, 100].map(p => getLoadingBar(p));
}

// Send animated loading bars sequentially with delay
async function sendAnimatedLoading(sock, chatId, message, prefix = '') {
    const stages = getLoadingStages();
    let msg = await sock.sendMessage(chatId, {
        text: prefix + '\n' + stages[0]
    }, { quoted: message });

    for (let i = 1; i < stages.length; i++) {
        await new Promise(r => setTimeout(r, 400));
        const text = prefix + '\n' + stages.slice(0, i + 1).join('\n');
        msg = await sock.sendMessage(chatId, {
            text: text,
            edit: msg.key
        });
    }
    return msg;
}

module.exports = { getLoadingBar, getLoadingStages, sendAnimatedLoading };
