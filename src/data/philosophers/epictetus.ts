import { Philosopher } from "data/types/philosopher";

export const epictetus: Philosopher = {
  id: "epictetus",
  name: "Epictetus",
  image: require("../../../assets/images/EpictetusFramed.png"),
  lifespan: "50 - 135 AD",
  bio: `Epictetus was a Greek Stoic philosopher born into slavery. He taught that philosophy is a way of life and not just a theoretical discipline. His teachings emphasize that we cannot control external events, only our responses to them.`,
  quotes: [
    'If anyone tells you that a certain person speaks ill of you, do not make excuses about what is said of you but answer, "He was ignorant of my other faults, else he would not have mentioned these alone."',
  ],
};
