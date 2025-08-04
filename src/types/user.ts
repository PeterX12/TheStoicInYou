export interface UserProfile {
  name: string;
  dateOfBirth: string;
  gender?: "male" | "female" | "other";
}
