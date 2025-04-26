import fs from 'fs';
import path from 'path';
import { BrowserWindow } from 'electron';

export function playAudioDataUri(fileName: string): Promise<void> {
  return new Promise(resolve => {
    const filePath = path.join(__dirname, '../audio', fileName);
    const audioBase64 = fs.readFileSync(filePath).toString('base64');
    const dataUri = `data:audio/mp3;base64,${audioBase64}`;

    const win = new BrowserWindow({
      show: false,
      webPreferences: { offscreen: true, contextIsolation: true }
    });

    win.webContents.once('did-finish-load', () => {
      win.webContents.executeJavaScript(`
        const audio = new Audio("${dataUri}");
        audio.onended = () => window.close();
        audio.play().catch(() => window.close());
      `);
    });

    win.loadURL('about:blank');
    win.once('closed', () => resolve());
  });
}
