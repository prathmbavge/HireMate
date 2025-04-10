
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock data for matching progress
const matchingProgress = {
  totalCandidates: 35,
  processedCandidates: 28,
  matchedCandidates: 12,
  shortlistedCandidates: 8,
  interviewRequested: 5,
};

const MatchingProgress = () => {
  const processedPercentage = Math.round(
    (matchingProgress.processedCandidates / matchingProgress.totalCandidates) * 100
  );
  const matchedPercentage = Math.round(
    (matchingProgress.matchedCandidates / matchingProgress.totalCandidates) * 100
  );
  const shortlistedPercentage = Math.round(
    (matchingProgress.shortlistedCandidates / matchingProgress.totalCandidates) * 100
  );
  const interviewPercentage = Math.round(
    (matchingProgress.interviewRequested / matchingProgress.totalCandidates) * 100
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruitment Funnel</CardTitle>
        <CardDescription>Current recruitment pipeline progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Processed</span>
            <span className="text-sm text-muted-foreground">
              {matchingProgress.processedCandidates} / {matchingProgress.totalCandidates}
            </span>
          </div>
          <Progress value={processedPercentage} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Matched</span>
            <span className="text-sm text-muted-foreground">
              {matchingProgress.matchedCandidates} / {matchingProgress.totalCandidates}
            </span>
          </div>
          <Progress value={matchedPercentage} className="h-2 bg-recruit-light" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Shortlisted</span>
            <span className="text-sm text-muted-foreground">
              {matchingProgress.shortlistedCandidates} / {matchingProgress.totalCandidates}
            </span>
          </div>
          <Progress value={shortlistedPercentage} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Interview Requested</span>
            <span className="text-sm text-muted-foreground">
              {matchingProgress.interviewRequested} / {matchingProgress.totalCandidates}
            </span>
          </div>
          <Progress value={interviewPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchingProgress;
