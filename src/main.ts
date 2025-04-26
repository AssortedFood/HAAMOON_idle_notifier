import path from 'path';
import { loadConfig } from './config';
import { classify } from './classifier';
import { hasStateChanged } from './state';
import { fetchActiveTitle } from './main';
import { playAudio } from './audioPlayer';
import { notify } from './notifier';

const cfg = loadConfig();

async function checkLoop() {
  try {
    const title = await fetchActiveTitle();
    console.log(title);
    const state = classify(title, cfg);
    if (!hasStateChanged(state)) return;
    await playAudio(path.join(__dirname, '../audio', cfg.audio[state]));
    notify(state);
  } catch (error) {
    console.error('Unhandled error in checkLoop:', error);
  }
}

checkLoop();
setInterval(checkLoop, 5000);

process.on('unhandledRejection', err => console.error(err));

