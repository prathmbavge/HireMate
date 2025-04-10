import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, UsersIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecentJobsListProps {
  className?: string;
}

const recentJobs = [
  {
    id: "job-1",
    title: "Senior Software Engineer",
    department: "Engineering",
    candidates: 12,
    matches: 5,
    createdAt: "2025-04-05",
  },
  {
    id: "job-2",
    title: "Product Manager",
    department: "Product",
    candidates: 8,
    matches: 3,
    createdAt: "2025-04-07",
  },
  {
    id: "job-3",
    title: "UX Designer",
    department: "Design",
    candidates: 15,
    matches: 7,
    createdAt: "2025-04-09",
  },
];

const RecentJobsList = ({ className }: RecentJobsListProps) => {
  return (
    <Card className={cn("col-span-2", className)}>
      <CardHeader>
        <CardTitle>Recent Job Openings</CardTitle>
        <CardDescription>
          Latest job descriptions processed by the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentJobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between space-x-4 rounded-md border p-3"
            >
              <div className="space-y-1">
                <h3 className="font-medium">{job.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Badge variant="outline" className="mr-2">
                    {job.department}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-3 w-3" />
                    <span>{job.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center text-sm">
                  <UsersIcon className="mr-1 h-3 w-3 text-muted-foreground" />
                  <span>
                    <span className="font-medium text-recruit-primary">
                      {job.matches}
                    </span>{" "}
                    / {job.candidates} candidates
                  </span>
                </div>
                <Badge className="bg-recruit-light text-recruit-primary">
                  {Math.round((job.matches / job.candidates) * 100)}% match rate
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentJobsList;
