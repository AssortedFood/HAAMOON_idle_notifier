// src/main.ts
import { app } from 'electron';           // ← import app
import path from 'path';
import activeWin from 'active-win';
import { loadConfig } from './config';
import { classify } from './classifier';
import { hasStateChanged } from './state';
import { playAudioDataUri } from './audioPlayer';
import { notify } from './notifier';

const cfg = loadConfig();

/**
 * Fetch the active window title using active-win.
 */
async function fetchActiveTitle(): Promise<string> {
  try {
    const win = await activeWin();
    return win?.title ?? '';
  } catch (error) {
    console.error('Error fetching active window title:', error);
    return '';
  }
}

async function checkLoop() {
  try {
    const title = await fetchActiveTitle();
    console.log(title);
    const state = classify(title, cfg);
    if (!hasStateChanged(state)) return;

    const audioKey = state === 'studying'
      ? 'good'
      : state === 'gaming'
        ? 'bad'
        : 'neutral';
    const fileName = cfg.audio[audioKey];

    await playAudioDataUri(fileName);
    notify(state);
  } catch (error) {
    console.error('Unhandled error in checkLoop:', error);
  }
}

// Only start looping once app is initialised
app.whenReady().then(() => {
  checkLoop();
  setInterval(checkLoop, 5000);
});

// In case of any unhandled promise rejections
process.on('unhandledRejection', err => console.error(err));
