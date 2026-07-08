// ─── DOUBLE STRUCK (ℍℕℤℚℕ∆ℳÅℊᵔf™℧ℳℋÅℴℳℊᵔf™℧ℳℋÅℴ) ───
const doubleStruckMap = {
    'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽',
    'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃',
    'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ',
    'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏',
    'Y': '𝕐', 'Z': 'ℤ',
    'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗',
    'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝',
    'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣',
    's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩',
    'y': '𝕪', 'z': '𝕫',
    '0': '𝟘', '1': '𝟙', '2': '𝟚', '3': '𝟛', '4': '𝟜',
    '5': '𝟝', '6': '𝟞', '7': '𝟟', '8': '𝟠', '9': '𝟡',
    ' ': ' '
};

// ─── MATH SCRIPT / MATHEMATICAL ITALIC SMALL (𝐚𝐯𝐢𝐢𝐲) ───
const mathStyleMap = {
    'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹',
    'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿',
    'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅',
    'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋',
    'Y': '𝑌', 'Z': '𝑍',
    'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓',
    'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙',
    'm': '𝑚', 'n': '𝑛', 'o': 'ℴ', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟',
    's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥',
    'y': '𝑦', 'z': '𝑧',
    '0': '𝟀', '1': '𝟁', '2': '𝟂', '3': '𝟃', '4': '𝟄',
    '5': '𝟅', '6': '𝟆', '7': '𝟇', '8': '𝟈', '9': '𝟉',
    ' ': ' '
};

function toDoubleStruck(text) {
    if (typeof text !== 'string') return String(text);
    return text.split('').map(c => doubleStruckMap[c] || c).join('');
}

function toMathStyle(text) {
    if (typeof text !== 'string') return String(text);
    return text.split('').map(c => mathStyleMap[c] || c).join('');
}

// Bold Serif / Blackboard (alternative for headings)
function toBoldSerif(text) {
    if (typeof text !== 'string') return String(text);
    return text.split('').map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(0x1D56C + code - 65); // A-Z
        if (code >= 97 && code <= 122) return String.fromCharCode(0x1D586 + code - 97); // a-z
        return c;
    }).join('');
}

module.exports = { toDoubleStruck, toMathStyle, toBoldSerif };
