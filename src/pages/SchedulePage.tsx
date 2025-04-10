
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CheckCircleIcon, ClockIcon } from "lucide-react";

// Mock data for interviews
const interviews = [
  {
    id: "int-1",
    candidateName: "Alex Johnson",
    jobTitle: "Senior Software Engineer",
    date: "2025-04-15",
    time: "10:00 AM",
    status: "scheduled",
  },
  {
    id: "int-2",
    candidateName: "Pat Wilson",
    jobTitle: "UX Designer",
    date: "2025-04-16",
    time: "2:30 PM",
    status: "scheduled",
  },
  {
    id: "int-3",
    candidateName: "Jamie Smith",
    jobTitle: "Product Manager",
    date: "2025-04-20",
    time: "11:00 AM",
    status: "pending",
  },
];

const SchedulePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interview Schedule</h1>
        <p className="text-muted-foreground">
          Manage and track candidate interviews
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CalendarIcon className="h-5 w-5 text-recruit-primary" />
              Upcoming Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {interviews.filter((i) => i.status === "scheduled").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Scheduled for the next 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ClockIcon className="h-5 w-5 text-amber-500" />
              Pending Confirmation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {interviews.filter((i) => i.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting candidate response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              Completed Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              In the past 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interview Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-medium">{interview.candidateName}</h3>
                  <div className="text-sm text-muted-foreground">
                    {interview.jobTitle}
                  </div>
                </div>
                <div className="flex flex-col gap-1 sm:items-end">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{interview.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{interview.time}</span>
                  </div>
                </div>
                <div>
                  {interview.status === "scheduled" ? (
                    <Button variant="outline" size="sm">View Details</Button>
                  ) : (
                    <Button size="sm" variant="outline" className="border-amber-500 text-amber-600">
                      Pending
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchedulePage;
