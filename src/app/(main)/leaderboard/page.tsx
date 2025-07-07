import LeaderboardClientPage from "@/components/leaderboard/leaderboard-client-page";
import { getTopTemplates } from "@/lib/data/leaderboard";

export default async function Leaderboard() {
   const topTemplates = await getTopTemplates();
   return <LeaderboardClientPage topTemplates={topTemplates.data || []} />;
}