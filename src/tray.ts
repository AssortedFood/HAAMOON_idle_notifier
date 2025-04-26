// src/tray.ts

import { app, Tray, Menu, shell } from 'electron';
import path from 'path';

app.whenReady().then(() => {
  if (app.dock) app.dock.hide();
  const tray = new Tray(path.join(__dirname, '../assets/tray.png'));
  tray.setToolTip('Study/Game Monitor');
  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Open config',
      click: () => {
        // Opens the config directory in the user's file manager
        shell.openPath(path.join(__dirname, '../config'));
      }
    },
    { type: 'separator' },
    { role: 'quit' }
  ]));
});
