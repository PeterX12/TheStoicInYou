import { Philosopher } from "data/types/philosopher";
import { marcusAurelius } from "./marcusAurelius";
import { epictetus } from "./epictetus";
import { seneca } from "./seneca";
import { zeno } from "./zeno";

export const philosophers: Philosopher[] = [
  marcusAurelius,
  epictetus,
  seneca,
  zeno,
];

export const getPhilosopherById = (id: string) => {
  return philosophers.find((p) => p.id === id);
};
