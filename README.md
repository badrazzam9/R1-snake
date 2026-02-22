# 🐍 Snake R1 — Classic Snake for Rabbit R1

<p align="center">
  <img src="https://fav.farm/🐍" alt="Snake R1">
</p>

A fully playable Snake game designed specifically for the Rabbit R1 device. Nostalgic Nokia-style gameplay with modern rotary controls.

---

## 🎮 Features

- **Classic Snake Gameplay** — Eat food, grow longer, don't hit walls or yourself
- **Rotary Controls** — Use the Rabbit R1 scroll wheel to cycle through directions
- **Touch Controls** — Tap screen left/right to turn
- **Voice Feedback** — Audio cues when eating food
- **Score Tracking** — Track your high score during gameplay
- **Speed Progression** — Game gets faster as you score higher

---

## 📱 Installation

### Option 1: Scan QR Code

1. Open your Rabbit R1
2. Go to **Creations**
3. Tap **Add via QR**
4. Scan this code:

<p align="center">
  <img src="https://badrazzam9.github.io/R1-snake/qr-code.png" alt="Scan to install" width="200">
</p>

### Option 2: Direct URL

Visit: `https://badrazzam9.github.io/R1-snake/`

---

## 🎛️ Controls

| Input | Action |
|-------|--------|
| **Scroll Up** | Cycle direction clockwise |
| **Scroll Down** | Cycle direction counter-clockwise |
| **Tap Left** | Turn left |
| **Tap Right** | Turn right |
| **Tap Middle** | Toggle vertical direction |

### How Rotary Controls Work

If the snake is moving **RIGHT**:
- Scroll UP → Now going **UP**
- Scroll UP → Now going **LEFT**
- Scroll UP → Now going **DOWN**
- Scroll UP → Now going **RIGHT** (cycle complete!)

---

## 🔧 Development

This game was built from scratch using:

- **HTML5 Canvas** — Game rendering
- **Vanilla JavaScript** — Game logic
- **CSS** — Retro Nokia-style aesthetics
- **Rabbit R1 SDK** — Hardware integration (scroll wheel, TTS)

### Running Locally

```bash
# Clone the repo
git clone https://github.com/badrazzam9/R1-snake.git

# Open in browser
cd R1-snake
# Open index.html in your browser
```

### Deploying to R1

1. Host the files (GitHub Pages, Netlify, Vercel, etc.)
2. Generate an R1 Creation QR with this JSON format:

```json
{
  "title": "Snake R1",
  "url": "https://your-url.com/",
  "description": "Classic Snake game for Rabbit R1",
  "iconUrl": "https://fav.farm/🐍",
  "themeColor": "#00aa00"
}
```

3. Scan with your R1!

---

## 📖 The Story Behind Snake R1

This project was born from a late-night coding session between a human and their AI assistant, exploring the possibilities of the Rabbit R1 device.

It started with a simple question: *"What can we build for this little AI-powered device?"*

The answer: A classic Snake game — but reimagined for the R1's unique rotary scroll wheel interface. Instead of traditional directional controls, the game uses a **rotary system** where scrolling cycles through directions — giving that authentic Nokia feel while leveraging modern hardware.

What began as a proof-of-concept quickly became a fully playable game, demonstrating that the Rabbit R1 isn't just an AI companion — it's a legitimate platform for custom mini-apps.

**This game represents the democratization of device programming.** Anyone can build for the R1 — you don't need a development kit or special access. Just imagination, an AI assistant, and a willingness to experiment.

---

## 👏 Credits

**Built with ❤️ by Alfred** — An OpenClaw AI Assistant

Alfred is a British-themed AI assistant running on OpenClaw, designed to help with automation, productivity, and creative projects. Using MiniMax M2.5 for code generation and powered by the open-source OpenClaw platform, Alfred helped conceptualize, design, and build this game from scratch.

### Technology Stack

- **AI Coding:** MiniMax M2.5 (LLM)
- **Platform:** OpenClaw Gateway
- **Hosting:** GitHub Pages
- **Device:** Rabbit R1

---

## 📄 License

MIT License — Feel free to fork, modify, and share!

---

<p align="center">
  Made with 🤖 by Alfred the OpenClaw Assistant
</p>
