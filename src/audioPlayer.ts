import player from 'play-sound';

export function playAudio(file: string): Promise<void> {
  const audioPlayer = player();
  return new Promise((resolve) => {
    try {
      audioPlayer.play(file, (err: any) => {
        if (err) console.error(err);
        resolve();
      });
    } catch (err) {
      console.error(err);
      resolve();
    }
  });
}

