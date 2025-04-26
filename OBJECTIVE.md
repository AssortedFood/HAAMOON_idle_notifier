# Objective

Deliver a minimal Electron/TypeScript tray app that, once launched, will:

- Run in the background on Windows and Linux (no visible window).
- Every minute (5 seconds in development), read the active window title.
- Classify it as “studying”, “gaming” or “mixed” using `config/config.json`.
- Only play audio when the classification has changed since the last check (persist previous state).
- Play exactly one of three hard-coded audio files (`audio/good.mp3`, `audio/bad.mp3`, `audio/neutral.mp3`) based on that classification.
- Ship as a single, double-clickable executable per platform (via electron-builder), with zero manual language/runtime installs.
