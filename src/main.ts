import activeWin from 'active-win';

export async function fetchActiveTitle(): Promise<string> {
  try {
    const result = await activeWin();
    return result?.title ?? '';
  } catch (error) {
    console.error('Failed to get active window title', error);
    return '';
  }
}

