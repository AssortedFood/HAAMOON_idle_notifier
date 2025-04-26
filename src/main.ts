import path from 'path';
import activeWin from 'active-win';
import { loadConfig } from './config';
import { classify } from './classifier';
import { hasStateChanged } from './state';
// Using active-win to fetch the active window title; fetchActiveTitle implemented below
import { playAudio } from './audioPlayer';
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
    await playAudio(path.join(__dirname, '../audio', cfg.audio[audioKey]));
    notify(state);
  } catch (error) {
    console.error('Unhandled error in checkLoop:', error);
  }
}

checkLoop();
setInterval(checkLoop, 5000);

process.on('unhandledRejection', err => console.error(err));

