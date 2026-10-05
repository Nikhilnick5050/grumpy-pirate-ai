// ===== Grumpy Pirate AI — Captain Barnacle's Bad-Mood Bot =====

const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const moodEl = document.getElementById('mood');
const chips = document.querySelectorAll('.chip');

const MOODS = ['Grumpy', 'Extra Grumpy', 'Furious', 'Mildly Annoyed', 'Stormy', 'Hangry', 'Salty', 'Done With Ye'];

// ---- Response engine ----
const responses = {
  greeting: [
    "Arrr, what now? Spit it out, I ain't got all tide.",
    "Ye again? Fine. What be yer business?",
    "Aye? Make it quick, the rum's gettin' warm.",
    "Oh great, another landlubber. What do ye want?"
  ],
  weather: [
    "Weather? The sea's angry today, much like meself. Expect squalls, salt spray, and a 90% chance of me losin' me temper.",
    "Storm's brewin' to the east. Or west. I don't keep a compass, I keep grudges.",
    "Sunny with a chance of cannon fire. Now stop askin' about the sky."
  ],
  joke: [
    "Why did the pirate go to the doctor? Because he had a bad case of the scurvy... and a worse attitude. Like me.",
    "What's a pirate's favorite letter? Ye'd think it's R, but it's actually the C. Now laugh and leave.",
    "I'd tell ye a pirate joke, but it'd probably get keelhauled for bein' too good."
  ],
  treasure: [
    "Me treasure? Buried where the sun don't shine. And no, I ain't tellin' ye where.",
    "X marks the spot, but the spot is a secret, and the secret is I forgot. Happy now?",
    "Treasure's overrated. What I really want is five minutes of peace and quiet. Can't find that on any map."
  ],
  dinner: [
    "Dinner? Hardtack, salted pork, and regret. Same as every night.",
    "We're havin' whatever the cook didn't burn. So... hardtack.",
    "Fish. It's always fish. I'm a pirate, not a chef."
  ],
  name: [
    "Captain Barnacle, scourge of the seven seas and yer worst nightmare. Don't wear it out.",
    "The name's Barnacle. Earned it from bein' stuck to this ship for 40 years."
  ],
  help: [
    "Ask me about the weather, tell me to say a joke, or ask where me treasure is. Then kindly shove off.",
    "I can grumble about weather, jokes, treasure, and dinner. Pick one and be quick."
  ],
  default: [
    "Arrr, I don't understand that gibberish. Try askin' about weather, jokes, or treasure.",
    "What in Davy Jones' locker are ye on about? Speak plain, ye scallywag.",
    "That's above me pay grade. And I don't get paid. So it's above everything.",
    "I'd answer that, but I'd rather not. Ask somethin' else."
  ]
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getReply(text) {
  const t = text.toLowerCase();

  if (/\b(hi|hello|hey|ahoy|yo|greetings|howdy)\b/.test(t)) return pick(responses.greeting);
  if (/weather|rain|storm|sunny|forecast|sky|wind/.test(t)) return pick(responses.weather);
  if (/joke|funny|laugh|humor|humour/.test(t)) return pick(responses.joke);
  if (/treasure|gold|map|booty|chest|where.*(buried|hidden)/.test(t)) return pick(responses.treasure);
  if (/dinner|food|eat|lunch|breakfast|meal|hungry|cook/.test(t)) return pick(responses.dinner);
  if (/name|who are you|who are ye|your name/.test(t)) return pick(responses.name);
  if (/help|what can you do|commands|options/.test(t)) return pick(responses.help);
  return pick(responses.default);
}

// ---- Mood cycling ----
function randomMood() {
  moodEl.textContent = MOODS[Math.floor(Math.random() * MOODS.length)];
}

// ---- Message rendering ----
function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = 'message ' + sender;

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;

  msg.appendChild(bubble);
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return msg;
}

function addTyping() {
  const msg = document.createElement('div');
  msg.className = 'message bot typing';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = '...';
  msg.appendChild(bubble);
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return msg;
}

// ---- Send flow ----
function handleSend(text) {
  const clean = text.trim();
  if (!clean) return;

  addMessage(clean, 'user');
  chatInput.value = '';

  const typing = addTyping();
  const delay = 600 + Math.random() * 900;

  setTimeout(() => {
    typing.remove();
    addMessage(getReply(clean), 'bot');
    randomMood();
  }, delay);
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSend(chatInput.value);
});

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    handleSend(chip.dataset.q);
  });
});

// Random mood on load
randomMood();