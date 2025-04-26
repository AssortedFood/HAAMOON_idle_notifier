# HAAMOON idle notifier

An Electron application that monitors your active window titles and classifies them as "studying", "gaming", "mixed" or "none". It plays audio notifications and integrates with the system tray for seamless monitoring.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AssortedFood/HAAMOON_idle_notifier.git
   cd HAAMOON_idle_notifier
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Start the application in development mode:
```bash
npm start
```

## Configuration

Edit the configuration file at `config/config.json` to specify keywords:
```json
{
  "studying": ["lecture", "paper", "code"],
  "gaming": ["game", "play", "match"],
  "audio": {
    "good": "good.mp3",
    "bad": "bad.mp3",
    "neutral": "neutral.mp3"
  }
}
```
Place your audio files in the `audio/` directory.

## Build & Packaging

Use Electron Builder to package the app:
```bash
npm run build      # Build installers/packages
npm run build:dir  # Build unpacked dir
```
Artifacts will be available in the `dist/` folder.