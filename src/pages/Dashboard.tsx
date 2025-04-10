
import { useSystemStats } from "@/hooks/use-api";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import StatCard from "@/components/dashboard/StatCard";
import RecentJobsList from "@/components/dashboard/RecentJobsList";
import RecentCandidates from "@/components/dashboard/RecentCandidates";
import MatchingProgress from "@/components/dashboard/MatchingProgress";
import {
  BriefcaseIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  UsersIcon,
  AwardIcon,
  HandshakeIcon,
} from "lucide-react";
import JobsOverviewChart from "@/components/dashboard/JobsOverviewChart";
import RecruitmentFunnel from "@/components/dashboard/RecruitmentFunnel";

const Dashboard = () => {
  const { data: stats, isLoading } = useSystemStats();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Smart Hire AI recruitment system
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-8 w-8 rounded-full mb-4" />
              <Skeleton className="h-6 w-28 mb-2" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-4 w-36 mt-2" />
            </Card>
          ))
        ) : (
          <>
            <StatCard
              title="Total Jobs"
              value={stats?.totalJobs.toString() || "0"}
              icon={BriefcaseIcon}
              description="Active job descriptions"
            />
            <StatCard
              title="Total Candidates"
              value={stats?.totalCandidates.toString() || "0"}
              icon={UsersIcon}
              description="Profiles in the system"
            />
            <StatCard
              title="Average Match"
              value={`${Math.round((stats?.averageMatchScore || 0) * 100)}%`}
              icon={TrendingUpIcon}
              description="Average match rate"
            />
            <StatCard
              title="Interviews"
              value={stats?.interviewsScheduled.toString() || "0"}
              icon={CheckCircleIcon}
              description="Scheduled interviews"
            />
          </>
        )}
      </div>
      
      <div className="grid gap-4 lg:grid-cols-2">
        <JobsOverviewChart />
        <RecruitmentFunnel />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RecentJobsList className="lg:col-span-1" />
        <div className="space-y-4 md:col-span-2">
          <RecentCandidates />
          <MatchingProgress />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          title="Successful Placements"
          value={stats?.successfulPlacements.toString() || "0"}
          icon={AwardIcon}
          description="Candidates successfully hired"
          className="md:col-span-1"
        />
        <StatCard
          title="Shortlisted Candidates"
          value={stats?.shortlistedCandidates.toString() || "0"}
          icon={HandshakeIcon}
          description="Candidates shortlisted for interviews"
          className="md:col-span-1"
        />
      </div>
    </div>
  );
};

export default Dashboard;
