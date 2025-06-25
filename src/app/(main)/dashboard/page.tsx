import { DashboardCardGradient, DashboardCardMinimal, DashboardCardAnimated } from "@/components/dashboard/dashboard-card-variants";

export default function Dashboard() {
   return (
      <div className="w-full h-full p-16">
         <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold text">Welcome, Arvind!</h1>
            <p className="text-sm text-gray-500">
               Here's a quick overview of your account and recent activity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
               <DashboardCardGradient title="Templates" description="See your templates here" />
               <DashboardCardMinimal title="Templates" description="See your templates here" />
               <DashboardCardAnimated title="Templates" description="See your templates here" />
            </div>
         </div>
      </div>
   );
}