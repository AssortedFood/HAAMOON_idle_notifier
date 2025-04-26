// src/main.ts
import './tray';   // ← ensure tray.ts runs
import { app } from 'electron';
import path from 'path';
import activeWin from 'active-win';
import { loadConfig } from './config';
import { classify } from './classifier';
import { hasStateChanged } from './state';
import { playAudioDataUri } from './audioPlayer';
import { notify } from './notifier';

// Prevent the app quitting when all (offscreen) windows close
app.on('window-all-closed', () => {
  // no-op to keep the process alive
});

const cfg = loadConfig();

/**
 * Fetch the active window title using active-win,
 * and log the full window info for debugging.
 */
async function fetchActiveTitle(): Promise<string> {
  try {
    const winInfo = await activeWin();
    console.log('👉 Active window info:', winInfo);
    return winInfo?.title ?? '';
  } catch (error) {
    console.error('Error fetching active window title:', error);
    return '';
  }
}

async function checkLoop() {
  try {
    const title = await fetchActiveTitle();
    const state = classify(title, cfg);
    console.log(`🔍 classify() returned state="${state}" for title="${title}"`);

    if (!hasStateChanged(state)) {
      console.log('⏭  State unchanged, skipping audio');
      return;
    }

    // Only play audio for 'studying' or 'gaming'
    if (state === 'studying' || state === 'gaming') {
      const audioKey = state === 'studying' ? 'good' : 'bad';
      const fileName = cfg.audio[audioKey];
      console.log(`🔈 Playing audio: key=${audioKey}, file="${fileName}"`);
      await playAudioDataUri(fileName);
    } else {
      console.log('🔇 Neutral state detected, no audio playback');
    }

    // Always send a system notification
    notify(state);
  } catch (error) {
    console.error('Unhandled error in checkLoop:', error);
  }
}

// Only start looping once the app is initialised
app.whenReady().then(() => {
  console.log('✅ App ready, starting monitoring loop');
  checkLoop();
  setInterval(checkLoop, 5000);
});

// Catch any unhandled promise rejections
process.on('unhandledRejection', err => console.error(err));
