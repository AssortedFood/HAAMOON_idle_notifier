import { app, Tray, Menu } from 'electron';
import path from 'path';

app.whenReady().then(() => {
  if (app.dock) app.dock.hide();
  const tray = new Tray(path.join(__dirname, '../assets/tray.png'));
  tray.setToolTip('Study/Game Monitor');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Open config', click: () => { /* TODO: open config file */ } },
    { type: 'separator' },
    { role: 'quit' }
  ]));
});

