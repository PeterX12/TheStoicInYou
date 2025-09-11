import { Philosopher } from "data/types/philosopher";

export const seneca: Philosopher = {
  id: "seneca",
  name: "Seneca",
  image: require("../../../assets/images/SenecaFramed.png"),
  lifespan: "4 BC - 65 AD",
  bio: `Lucius Annaeus Seneca, often known simply as Seneca, was a Roman Stoic philosopher, statesman, and dramatist. He served as an advisor to Emperor Nero but later fell out of favor and was forced to take his own life. Seneca emphasized the importance of virtue, self-discipline, and the transient nature of life. His teachings continue to inspire those seeking wisdom and resilience in the face of adversity.`,
  quotes: ["Sometimes even to live is an act of courage."],
};
