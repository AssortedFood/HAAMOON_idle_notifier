// src/tray.ts
import { app, Tray, Menu, shell } from 'electron';
import path from 'path';

/**
 * Returns the absolute path to the config directory,
 * whether in development or in a packaged build.
 */
function getConfigDir(): string {
  if (app.isPackaged) {
    // When packaged, extraResources put it under resources/config
    return path.join(process.resourcesPath, 'config');
  } else {
    // In dev, config sits alongside src
    return path.join(__dirname, '../config');
  }
}

app.whenReady().then(() => {
  // Prevent a Dock icon on macOS
  if (app.dock) app.dock.hide();

  // Choose correct icon for platform
  const iconName = process.platform === 'win32' ? 'icon.ico' : 'tray.png';
  const trayIcon = path.join(__dirname, '../assets', iconName);

  const tray = new Tray(trayIcon);
  tray.setToolTip('HAAMOON idle notifier');

  const configDir = getConfigDir();
  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Open config',
      click: () => {
        shell.openPath(configDir);
      }
    },
    { type: 'separator' },
    { role: 'quit' }
  ]));
});
