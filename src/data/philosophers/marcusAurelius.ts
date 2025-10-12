import { Philosopher } from "data/types/philosopher";

export const marcusAurelius: Philosopher = {
  id: "marcusAurelius",
  name: "Marcus Aurelius",
  image: require("../../../assets/images/MarcusFramed.png"),
  quotesImage: require("../../../assets/images/MarcusQuotes.png"),
  lifespan: "121 - 180 AD",
  bio: `Marcus Aurelius was a Roman emperor from 161 to 180 AD and is considered one of the most important Stoic philosophers. His reign was marked by military conflict, but he is best known for his philosophical work, "Meditations," which he wrote as a series of personal reflections. Marcus emphasized the importance of rationality, self-discipline, and virtue, advocating for acceptance of fate and the transient nature of life. His teachings continue to inspire those seeking wisdom and resilience in the face of adversity.`,
  quotes: [
    "You have power over your mind - not outside events. Realize this, and you will find strength.",
    "Dwell on the beauty of life. Watch the stars, and see yourself running with them.",
  ],
};
