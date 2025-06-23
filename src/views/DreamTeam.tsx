import { Team } from "@/components/Team";
import { useDreamTeam } from "@/hooks/useDreamTeam";

export const DreamTeam = () => {
  const { team } = useDreamTeam();

  return <Team team={team} />;
};
