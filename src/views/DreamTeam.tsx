import { useDreamTeam } from "@/hooks/useDreamTeam";

export const DreamTeam = () => {
  const { team } = useDreamTeam();
  console.log("Dream Team:", team);

  return (
    <div className="dream-team">
      <h1>Dream Team</h1>
      <p>Coming soon...</p>
    </div>
  );
};
