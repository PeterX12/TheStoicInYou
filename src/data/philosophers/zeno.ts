import { Philosopher } from "data/types/philosopher";

export const zeno: Philosopher = {
  id: "zeno",
  name: "Zeno",
  image: require("../../../assets/images/ZenoFramed.png"),
  lifespan: "334 - 262 BC",
  bio: `Zeno of Citium was a Hellenistic philosopher from Cyprus and the founder of the Stoic school of philosophy, which he taught in Athens from around 300 BC. His teachings emphasized virtue, wisdom, and living in harmony with nature. Zeno's ideas laid the groundwork for later Stoic philosophers like Seneca, Epictetus, and Marcus Aurelius.`,
  quotes: [
    "We have two ears and one mouth, so we should listen more than we say.",
  ],
};
