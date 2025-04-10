
import { Card } from "@/components/ui/card";
import StatCard from "@/components/dashboard/StatCard";
import RecentJobsList from "@/components/dashboard/RecentJobsList";
import RecentCandidates from "@/components/dashboard/RecentCandidates";
import MatchingProgress from "@/components/dashboard/MatchingProgress";
import {
  BriefcaseIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Smart Hire AI recruitment system
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Jobs"
          value="12"
          icon={BriefcaseIcon}
          description="Active job descriptions"
        />
        <StatCard
          title="Total Candidates"
          value="35"
          icon={UsersIcon}
          description="Profiles in the system"
        />
        <StatCard
          title="Successful Matches"
          value="68%"
          icon={TrendingUpIcon}
          description="Average match rate"
        />
        <StatCard
          title="Interviews Scheduled"
          value="8"
          icon={CheckCircleIcon}
          description="Awaiting feedback"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RecentJobsList />
        <div className="space-y-4 lg:col-span-1">
          <RecentCandidates />
          <MatchingProgress />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
