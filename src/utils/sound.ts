export const playSound = (soundName: 'correct' | 'incorrect') => {
  const audio = new Audio(`/sounds/${soundName}.wav`);
  audio.play().catch(error => {
    console.log('Error playing sound:', error);
  });
}; 