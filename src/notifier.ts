import { Notification } from 'electron';

export function notify(state: string): void {
  new Notification({
    silent: true,
    title: 'State Changed',
    body: `State changed to: ${state}`
  }).show();
}

