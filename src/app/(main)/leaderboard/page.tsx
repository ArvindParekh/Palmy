import LeaderboardClientPage from "@/components/leaderboard/leaderboard-client-page";
import { getTopCreators, getTopTemplates } from "@/lib/data/leaderboard";

export default async function Leaderboard() {
   const topTemplates = await getTopTemplates();
   const topCreators = await getTopCreators();

   return <LeaderboardClientPage topTemplates={topTemplates.data} topCreators={topCreators.data} />;
}