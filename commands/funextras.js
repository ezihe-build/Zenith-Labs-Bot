const { toDoubleStruck, toMathStyle } = require('../lib/fonts');
const ds = toDoubleStruck;
const ms = toMathStyle;

// ─── STATIC DATA (RAM-friendly, no APIs) ───
const DAD_JOKES = [
  "Why don't eggs tell jokes? They'd crack each other up.",
  "What do you call a fake noodle? An impasta.",
  "Why did the scarecrow win an award? He was outstanding in his field.",
  "Why don't skeletons fight each other? They don't have the guts.",
  "What do you call cheese that isn't yours? Nacho cheese.",
  "Why couldn't the bicycle stand up by itself? It was two-tired.",
  "What do you call a bear with no socks on? Barefoot.",
  "Why did the golfer bring two pairs of pants? In case he got a hole in one.",
  "What do you call a fish wearing a crown? A king fish.",
  "Why did the math book look sad? Because it had too many problems.",
  "What do you call a sleeping dinosaur? A dino-snore.",
  "Why don't scientists trust atoms? Because they make up everything.",
  "What do you call a lazy kangaroo? A pouch potato.",
  "Why did the tomato turn red? Because it saw the salad dressing.",
  "What do you call a belt made of watches? A waist of time.",
  "Why did the coffee file a police report? It got mugged.",
  "What do you call a pig that does karate? Pork chop.",
  "Why did the cookie go to the doctor? Because it felt crumby.",
  "What do you call a snowman with a six pack? An abdominal snowman.",
  "Why did the stadium get hot after the game? All the fans left.",
  "What do you call an alligator in a vest? An investigator.",
  "Why did the invisible man turn down the job? He couldn't see himself doing it.",
  "What do you call a fake stone? A sham-rock.",
  "Why did the banana go to the doctor? It wasn't peeling well.",
  "What do you call a dog magician? A labracadabrador.",
  "Why did the mushroom go to the party? Because he's a fungi.",
  "What do you call a bee that can't make up its mind? A may-bee.",
  "Why did the duck get arrested? For selling quack.",
  "What do you call a lazy cow? A milk dud.",
  "Why did the crab never share? Because he's shellfish.",
  "What do you call a cat that likes to swim? A catfish.",
  "Why did the drum take a nap? It was beat.",
  "What do you call a fish with no eyes? Fsh.",
  "Why did the bicycle fall over? It was too tired.",
  "What do you call a pile of cats? A meowtain.",
  "Why did the robot go on vacation? To recharge his batteries.",
  "What do you call a nosy pepper? Jalapeño business.",
  "Why did the picture go to jail? It was framed.",
  "What do you call a sad strawberry? A blueberry.",
  "Why did the music note go to school? To get sharp.",
  "What do you call a sleeping bull? A bulldozer.",
  "Why did the calendar go to therapy? Its days were numbered.",
  "What do you call a grumpy cow? Moody.",
  "Why did the astronaut break up with his girlfriend? He needed space.",
  "What do you call a cold dog? A chili dog.",
  "Why did the orange stop rolling? It ran out of juice.",
  "What do you call a ghost's true love? A ghoul-friend.",
  "Why did the barber win the race? He knew all the shortcuts.",
  "What do you call a rich frog? A leapionaire.",
  "Why did the computer sneeze? It had a virus.",
  "What do you call a dinosaur with an extensive vocabulary? A thesaurus.",
  "Why did the chicken join a band? Because it had the drumsticks.",
  "What do you call a bear stuck in the rain? A drizzly bear.",
  "Why did the melon jump into the lake? It wanted to be a watermelon.",
  "What do you call a snake that's exactly 3.14 meters long? A π-thon.",
  "Why did the paper go to school? To get cut out for success.",
  "What do you call a group of musical whales? An orca-stra.",
  "Why did the string go to school? To be knotty.",
  "What do you call a sleeping rabbit? A hop-tic.",
  "Why did the pencil go to the dance? To draw attention.",
  "What do you call a fish that knows addition? An octoplus.",
  "Why did the grape stop in the middle of the road? Because it ran out of juice.",
  "What do you call a train that sneezes? Achoo-choo train.",
  "Why did the butter cross the road? To get to the other slide.",
  "What do you call a cow with no legs? Ground beef.",
  "Why did the pillow go to school? To get a little fluffier.",
  "What do you call a dog that meditates? Aware wolf.",
  "Why did the light bulb fail the test? It wasn't very bright.",
  "What do you call a deer with no eyes? No-eye deer.",
  "Why did the fisherman put peanut butter on his bait? To catch a jellyfish.",
  "What do you call a turtle that takes up photography? A snapping turtle.",
  "Why did the banker switch careers? He lost interest.",
  "What do you call a cat that loves to bowl? An alley cat.",
  "Why did the football coach go to the bank? To get his quarterback.",
  "What do you call a snowman party? A snowball.",
  "Why did the detective bring a pencil to bed? To draw the curtains.",
  "What do you call a dog that can do magic tricks? A labracadabrador.",
  "Why did the frog call his insurance company? He had a jump in his car.",
  "What do you call a sleepy car? Tired.",
  "Why did the lion eat the tightrope walker? He wanted a well-balanced meal.",
  "What do you call a cow in an earthquake? A milkshake.",
  "Why did the tree go to the dentist? It needed a root canal.",
  "What do you call a lazy spud? A couch potato.",
  "Why did the electrician break up with his girlfriend? There was no spark.",
  "What do you call a pile of kittens? A meowtain.",
  "Why did the baker go to therapy? He kneaded help.",
  "What do you call a sad cup of coffee? Depresso.",
  "Why did the cloud date the fog? He was down to earth.",
  "What do you call a bear with no teeth? A gummy bear.",
  "Why did the cell phone go to school? To get smarter.",
  "What do you call a rabbit with fleas? Bugs Bunny.",
  "Why did the scarecrow become a successful neurosurgeon? He was outstanding in his field.",
  "What do you call a sleeping pizza? A piZZZZa.",
  "Why did the duck say bang? Because he was a firequacker.",
  "What do you call a singing laptop? A Dell.",
  "Why did the window go to school? To improve its pane."
];

const FUN_FACTS = [
  "Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs and it was still edible.",
  "Octopuses have three hearts, blue blood, and nine brains.",
  "Bananas are berries, but strawberries aren't.",
  "A day on Venus is longer than a year on Venus.",
  "Wombat poop is cube-shaped.",
  "Sloths can hold their breath longer than dolphins — up to 40 minutes.",
  "The Eiffel Tower can grow taller in summer due to heat expansion.",
  "Sharks have been around longer than trees.",
  "A group of flamingos is called a 'flamboyance'.",
  "Butterflies taste with their feet.",
  "The shortest war in history lasted 38 minutes.",
  "Cows have best friends and get stressed when separated.",
  "The inventor of the frisbee was turned into a frisbee after he died.",
  "A bolt of lightning is five times hotter than the surface of the sun.",
  "There's a species of jellyfish that is biologically immortal."
];

const TRIVIA_QS = [
  { q: "What is the largest planet in our solar system?", a: "Jupiter" },
  { q: "Who painted the Mona Lisa?", a: "Leonardo da Vinci" },
  { q: "What is the chemical symbol for gold?", a: "Au" },
  { q: "In which year did World War II end?", a: "1945" },
  { q: "What is the smallest country in the world?", a: "Vatican City" },
  { q: "How many bones does an adult human have?", a: "206" },
  { q: "What is the hardest natural substance on Earth?", a: "Diamond" },
  { q: "Which planet is known as the Red Planet?", a: "Mars" },
  { q: "What is the longest river in the world?", a: "Nile" },
  { q: "Who wrote 'Romeo and Juliet'?", a: "William Shakespeare" }
];

const MOVIE_QUOTES = [
  "May the Force be with you. — Star Wars",
  "I'm going to make him an offer he can't refuse. — The Godfather",
  "You talking to me? — Taxi Driver",
  "I'll be back. — The Terminator",
  "Why so serious? — The Dark Knight",
  "Hasta la vista, baby. — Terminator 2",
  "There's no place like home. — The Wizard of Oz",
  "I see dead people. — The Sixth Sense",
  "Life is like a box of chocolates. — Forrest Gump",
  "Say hello to my little friend! — Scarface"
];

const PROG_QUOTES = [
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "Programs must be written for people to read, and only incidentally for machines to execute. — Harold Abelson",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Java is to JavaScript what car is to Carpet. — Chris Heilmann"
];

const ADVICE = [
  "Don't watch the clock; do what it does. Keep going.",
  "The best way to predict the future is to create it.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Your time is limited, don't waste it living someone else's life.",
  "Believe you can and you're halfway there."
];

const QUOTE_MEMES = [
  "I'm not lazy, I'm on energy-saving mode.",
  "My bed is a magical place where I suddenly remember everything I forgot to do.",
  "I don't need anger management, you just need to stop making me angry.",
  "Common sense is like deodorant. The people who need it most never use it.",
  "I'm not arguing, I'm just explaining why I'm right."
];

const ANIMAL_URLS = {
  panda: 'https://some-random-api.com/animal/panda',
  bird: 'https://some-random-api.com/animal/bird',
  koala: 'https://some-random-api.com/animal/koala',
  fox: 'https://some-random-api.com/animal/fox',
  dog: 'https://some-random-api.com/animal/dog'
};

async function fetchAnimal(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return { image: data.image, fact: data.fact };
  } catch { return null; }
}

// ─── COMMAND ROUTER ───
async function funExtras(sock, chatId, message, cmd, args) {
  const text = args.join(' ');
  let reply = '';

  switch (cmd) {
    case 'dadjoke':
      reply = '\ud83d\udc68 ' + ds('DAD JOKE') + '\n\n' + DAD_JOKES[Math.floor(Math.random() * DAD_JOKES.length)];
      break;
    case 'funfact':
      reply = '\ud83d\udca1 ' + ds('FUN FACT') + '\n\n' + FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
      break;
    case 'triviafact':
      reply = '\ud83e\udde0 ' + ds('TRIVIA') + '\n\n' + TRIVIA_QS[Math.floor(Math.random() * TRIVIA_QS.length)].q;
      break;
    case 'moviequote':
      reply = '\ud83c\udfac ' + ds('MOVIE QUOTE') + '\n\n' + MOVIE_QUOTES[Math.floor(Math.random() * MOVIE_QUOTES.length)];
      break;
    case 'progquote':
      reply = '\ud83d\udcbb ' + ds('DEV QUOTE') + '\n\n' + PROG_QUOTES[Math.floor(Math.random() * PROG_QUOTES.length)];
      break;
    case 'advice':
      reply = '\ud83d\udcad ' + ds('ADVICE') + '\n\n' + ADVICE[Math.floor(Math.random() * ADVICE.length)];
      break;
    case 'quotememe':
      reply = '\ud83d\ude02 ' + ds('QUOTE MEME') + '\n\n' + QUOTE_MEMES[Math.floor(Math.random() * QUOTE_MEMES.length)];
      break;
    case 'inspire':
      reply = '\u2728 ' + ds('INSPIRATION') + '\n\n' + ADVICE[Math.floor(Math.random() * ADVICE.length)];
      break;
    case 'ascii':
      reply = `
  /\\_/\\
 ( o.o )
  > ^ <
`;
      break;
    case 'truthdare':
      reply = Math.random() > 0.5 ? '\ud83d\ude33 ' + ds('TRUTH') + ': What is your biggest fear?' : '\ud83d\ude08 ' + ds('DARE') + ': Send a voice note saying "I love bugs"';
      break;
    case 'rate':
      reply = '\u2b50 ' + ds('RATE') + '\n\n' + (text || 'You') + ' is ' + Math.floor(Math.random() * 10) + '/10';
      break;
    case 'wouldyou':
      const wyr = ["Would you rather be invisible or be able to fly?", "Would you rather live in space or underwater?", "Would you rather have unlimited money or unlimited time?"];
      reply = '\ud83e\udd14 ' + ds('WOULD YOU RATHER') + '\n\n' + wyr[Math.floor(Math.random() * wyr.length)];
      break;
    case 'roast':
      const roasts = ["You're like a cloud. When you disappear, it's a beautiful day.", "I'd agree with you but then we'd both be wrong.", "You're not stupid, you just have bad luck thinking."];
      reply = '\ud83d\udd25 ' + ds('ROAST') + '\n\n' + roasts[Math.floor(Math.random() * roasts.length)];
      break;
    case 'moe':
      reply = '\ud83e\udd70 ' + ds('MOE') + '\n\n' + 'Kawaii desu ne~!';
      break;
    case 'sfw':
      reply = '\u2705 ' + ds('SFW CHECK') + '\n\n' + 'Content is safe for work.';
      break;
    case 'story':
      reply = '\ud83d\udcd6 ' + ds('STORY') + '\n\nOnce upon a time in Zenith Labs, a bot learned to make people smile...';
      break;
    case 'urban':
      reply = '\ud83c\udfdb ' + ds('URBAN') + '\n\nSearching urban dictionary for: ' + (text || 'nothing') + '...\nResult: Not found (API key needed)';
      break;
    case 'prog':
      reply = '\ud83d\udcbb ' + ds('PROGRAMMING FACT') + '\n\nThe first computer bug was an actual moth found in a Harvard Mark II computer in 1947.';
      break;
    case 'paptt':
      reply = '\ud83c\udfad ' + ds('ZENITH LABS') + '\n\nPAPTT: Powered by Zenith Labs Bot v4.1';
      break;
    case 'bluearchive':
      reply = '\ud83d\udcd5 ' + ds('BLUE ARCHIVE') + '\n\nBlue Archive is a tactical RPG mobile game developed by Nexon Games.';
      break;
    case 'boypic':
    case 'carimage':
    case 'chinagirl':
    case 'hentai':
    case 'hijab-girl':
    case 'indonesia-girl':
    case 'japan-girl':
    case 'korean-girl':
    case 'malaysia-girl':
    case 'profile-pictures':
    case 'random-girl':
    case 'thailand-girl':
    case 'tiktok-girl':
    case 'vietnam-girl':
    case 'aipic':
    case 'cartoonify':
      reply = '\ud83d\uddbc ' + ds('IMAGE') + '\n\nFetching image for .' + cmd + '...\n(Use external image API for production)';
      break;
    case 'panda':
    case 'bird':
    case 'koala':
    case 'fox':
    case 'dog':
      const animalData = await fetchAnimal(ANIMAL_URLS[cmd]);
      if (animalData) {
        await sock.sendMessage(chatId, { image: { url: animalData.image }, caption: animalData.fact }, { quoted: message });
        return;
      }
      reply = '\ud83d\udc3e ' + ds(cmd.toUpperCase()) + '\n\nHere is a random ' + cmd + ' fact!';
      break;
    case 'joke':
      reply = '\ud83d\ude02 ' + ds('JOKE') + '\n\n' + DAD_JOKES[Math.floor(Math.random() * DAD_JOKES.length)];
      break;
    case 'truth':
      reply = '\ud83d\ude33 ' + ds('TRUTH') + '\n\nWhat is the most embarrassing thing that has happened to you?';
      break;
    case 'dare':
      reply = '\ud83d\ude08 ' + ds('DARE') + '\n\nSend a voice note saying "Zenith Labs is the best!"';
      break;
    case 'meme':
      reply = '\ud83d\ude02 ' + ds('MEME') + '\n\nWhen the bug menu actually works...\n*surprised Pikachu face*';
      break;
    case 'fact':
      reply = '\ud83d\udca1 ' + ds('FACT') + '\n\n' + FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
      break;
    case 'flirt':
      reply = '\ud83d\ude18 ' + ds('FLIRT') + '\n\nAre you WiFi? Because I\'m feeling a connection.';
      break;
    case 'compliment':
      reply = '\ud83d\udc96 ' + ds('COMPLIMENT') + '\n\nYou have a smile that could light up the whole room!';
      break;
    default:
      reply = '\u274c ' + ds('UNKNOWN FUN COMMAND') + ': .' + cmd;
  }

  await sock.sendMessage(chatId, { text: reply }, { quoted: message });
}

module.exports = funExtras;
