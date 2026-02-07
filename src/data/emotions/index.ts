export interface Emotion {
  id: string;
  name: string;
  image: any;
  explanation: string;
  stoicPerspective: string;
  prompt: string;
}

export const emotions: Emotion[] = [
  {
    id: "anger",
    name: "Anger",
    image: require("../../../assets/images/AngerEmotion.png"),
    explanation:
      "Anger often arises when we feel wronged, blocked, or treated unfairly. It can feel intense and urgent, but it is usually a signal that something we expected did not happen as we believed it should.",
    stoicPerspective:
      "The Stoics taught that anger is not caused by events themselves, but by the judgments we attach to them. What lies within our control is not the situation, but how we choose to interpret it.",
    prompt:
      "What expectation or belief may have been challenged, and is it within your control to change it?",
  },
  {
    id: "aversion",
    name: "Aversion",
    image: require("../../../assets/images/AversionEmotion.png"),
    explanation:
      "Aversion is the feeling of wanting to pull away from something uncomfortable, unpleasant, or unwanted. It often appears when we are trying to avoid pain, effort, or uncertainty.",
    stoicPerspective:
      "Stoicism reminds us that avoiding discomfort does not remove it. What troubles us most is often our resistance to what is happening, not the experience itself.",
    prompt:
      "What are you trying to avoid right now, and what might happen if you allowed it to be present?",
  },
  {
    id: "confusion",
    name: "Confusion",
    image: require("../../../assets/images/ConfusionEmotion.png"),
    explanation:
      "Confusion arises when things feel unclear or when we do not know what to think, decide, or do next. It can feel disorienting, but it often appears during moments of growth or change.",
    stoicPerspective:
      "The Stoics accepted uncertainty as a natural part of life. Clarity comes not from rushing decisions, but from patiently examining what is known and what is not.",
    prompt:
      "What is one small thing you know for certain right now, even if everything else feels unclear?",
  },
  {
    id: "fear",
    name: "Fear",
    image: require("../../../assets/images/FearEmotion.png"),
    explanation:
      "Fear is a response to perceived threat or uncertainty about the future. It often focuses on what might happen, rather than what is happening now.",
    stoicPerspective:
      "Stoicism teaches that fear comes from imagining outcomes beyond our control. Peace is found by focusing attention on what can be acted upon in the present moment.",
    prompt:
      "What part of this situation is within your control right now, even in a small way?",
  },
  {
    id: "joy",
    name: "Joy",
    image: require("../../../assets/images/JoyEmotion.png"),
    explanation:
      "Joy is a feeling of contentment, appreciation, or quiet satisfaction. It can arise from meaningful connection, progress, or simply being present with what is good.",
    stoicPerspective:
      "The Stoics valued a calm and steady joy rooted in gratitude, not in fleeting pleasures. True joy comes from living in alignment with what matters.",
    prompt:
      "What is present in your life right now that you would not want to take for granted?",
  },
  {
    id: "sadness",
    name: "Sadness",
    image: require("../../../assets/images/SadnessEmotion.png"),
    explanation:
      "Sadness often appears in response to loss, disappointment, or unmet expectations. It can feel heavy, but it is a natural expression of caring deeply.",
    stoicPerspective:
      "Stoicism does not deny sadness, but invites us to meet it with understanding. Accepting what cannot be changed allows space for healing and resilience.",
    prompt:
      "What are you holding onto that may need acknowledgment rather than resistance?",
  },
];

export const getEmotionById = (id: string): Emotion | undefined => {
  return emotions.find((emotion) => emotion.id === id);
};
