<p align="center">
  <a href="https://shields.io/">
    <img src="https://img.shields.io/badge/made%20for-procrastinators-lightgrey" alt="made for procrastinators">
  </a>
  <a href="https://shields.io/">
    <img src="https://img.shields.io/badge/stability-somewhat-orange" alt="stability somewhat">
  </a>
  <a href="https://shields.io/">
    <img src="https://img.shields.io/badge/time%20wasted-a%20little-green" alt="time wasted a little">
  </a>
</p>

# ✨ HAAMOON idle notifier

An Electron application that monitors your active window titles and classifies them as "studying" or "gaming" based on the `config.json` file. It plays helpful and motivational audio notifications to encourage you to spend more time studying and less time gaming.

## 📥 Installation

Download the Windows installer: 

[haamoon_idle_notifier.Setup.1.0.0.exe](https://github.com/AssortedFood/HAAMOON_idle_notifier/releases/download/latest/haamoon_idle_notifier.Setup.1.0.0.exe)

## ⚙️ Configuration

Edit the configuration file at `config/config.json` to specify keywords:
```json
{
  "studying": ["Google Chrome", "Excel", "Visual Studio Code"],
  "gaming": ["Dolphin", "Runelite", "lichess"],
  "audio": {
    "good": "good.mp3",
    "bad": "bad.mp3",
    "neutral": "neutral.mp3"
  }
}
```


If you want to replace the audio files you can do that by replacing the files `good.mp3` and `bad.mp3` in the `audio/` folder.

*This version of the application does not support neutral motivation, only good and bad.*

## 📝 Licence

This project is licensed under the terms described in the [LICENSE.md](./LICENSE.md) file.
