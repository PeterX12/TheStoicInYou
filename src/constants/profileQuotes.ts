export const ProfileQuotes: string[] = [
  "Today matters",
  "One life. Live it.",
  "Every moment counts",
  "Make today count",
  "Your time is now",
  "Live with purpose",
  "Small steps, big change",
  "Do it for your future self",
  "What you do today echoes tomorrow",
  "Every day is a gift",
  "Be here now",
  "Time waits for no one",
  "Action over excuses",
  "Tomorrow starts today",
  "Create, don't wait",
  "Progress, not perfection",
  "Start where you are",
  "Less talk, more do",
  "Consistency beats intensity",
  "Momentum is everything",
  "You control the present",
  "Choose growth daily",
  "Life rewards action",
  "Little things add up",
  "Do what matters most",
  "Your future is built today",
  "Energy flows where focus goes",
  "Seconds become stories",
  "Time is your currency",
  "Don't waste this gift",
];

export const getRandomProfileQuote = (): string => {
  const randomIndx = Math.floor(Math.random() * ProfileQuotes.length);
  return ProfileQuotes[randomIndx];
};
