
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock data for recent candidates
const recentCandidates = [
  {
    id: "cand-1",
    name: "Alex Johnson",
    skills: ["React", "TypeScript", "Node.js"],
    matchScore: 0.85,
  },
  {
    id: "cand-2",
    name: "Jamie Smith",
    skills: ["Product Strategy", "UX Research", "Agile"],
    matchScore: 0.76,
  },
  {
    id: "cand-3",
    name: "Pat Wilson",
    skills: ["UI Design", "Figma", "User Testing"],
    matchScore: 0.92,
  },
];

const RecentCandidates = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Candidates</CardTitle>
        <CardDescription>
          Latest candidates processed by the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="flex items-center space-x-4 rounded-md border p-3"
            >
              <Avatar>
                <AvatarFallback>
                  {candidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="font-medium">{candidate.name}</p>
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <Badge
                className={
                  candidate.matchScore > 0.8
                    ? "bg-green-100 text-green-800"
                    : "bg-amber-100 text-amber-800"
                }
              >
                {Math.round(candidate.matchScore * 100)}% match
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentCandidates;
