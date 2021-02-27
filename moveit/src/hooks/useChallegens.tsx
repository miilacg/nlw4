import { useContext } from "react"
import { ChallengesContext } from "../contexts/ChallengesContexts";

export function useChallenges() {
  const context = useContext(ChallengesContext);
  return context;
}