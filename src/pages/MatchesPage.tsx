
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock data for matches
const matches = [
  {
    id: "match-1",
    jobId: "job-1",
    jobTitle: "Senior Software Engineer",
    candidateId: "cand-1",
    candidateName: "Alex Johnson",
    matchScore: 0.85,
    matchDetails: {
      categoryScores: {
        skills: 0.9,
        experience: 0.8,
        education: 0.85
      },
      skillMatches: ["React", "TypeScript", "AWS"],
      missingCriticalSkills: ["Docker"]
    },
    shortlisted: true,
    interviewRequested: false
  },
  {
    id: "match-2",
    jobId: "job-2",
    jobTitle: "Product Manager",
    candidateId: "cand-2",
    candidateName: "Jamie Smith",
    matchScore: 0.76,
    matchDetails: {
      categoryScores: {
        skills: 0.8,
        experience: 0.7,
        education: 0.8
      },
      skillMatches: ["Product Strategy", "UX Research", "Agile"],
      missingCriticalSkills: []
    },
    shortlisted: false,
    interviewRequested: false
  },
  {
    id: "match-3",
    jobId: "job-3",
    jobTitle: "UX Designer",
    candidateId: "cand-3",
    candidateName: "Pat Wilson",
    matchScore: 0.92,
    matchDetails: {
      categoryScores: {
        skills: 0.95,
        experience: 0.9,
        education: 0.9
      },
      skillMatches: ["Figma", "Adobe Creative Suite", "Prototyping"],
      missingCriticalSkills: []
    },
    shortlisted: true,
    interviewRequested: true
  }
];

const MatchesPage = () => {
  const [selectedJob, setSelectedJob] = useState("all");

  const handleShortlist = (matchId: string) => {
    toast.success("Candidate has been shortlisted", {
      description: "The candidate has been added to the shortlist.",
    });
  };

  const handleRequestInterview = (matchId: string) => {
    toast.success("Interview request initiated", {
      description: "An AI-generated personalized email will be sent to the candidate.",
    });
  };

  const filteredMatches = selectedJob === "all" 
    ? matches 
    : matches.filter(match => match.jobId === selectedJob);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Matches & Analysis</h1>
        <p className="text-muted-foreground">
          View and manage candidate-job matches
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-64">
          <Select value={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by job" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              <SelectItem value="job-1">Senior Software Engineer</SelectItem>
              <SelectItem value="job-2">Product Manager</SelectItem>
              <SelectItem value="job-3">UX Designer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Matches</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
          <TabsTrigger value="interviewed">Interview Requested</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 py-4">
          {filteredMatches.map((match) => (
            <Card key={match.id}>
              <CardHeader>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {match.candidateName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{match.candidateName}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      for {match.jobTitle}
                    </span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                      {Math.round(match.matchScore * 100)}% Match
                    </div>
                    {match.shortlisted && (
                      <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        Shortlisted
                      </div>
                    )}
                    {match.interviewRequested && (
                      <div className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
                        Interview Requested
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 grid gap-2 sm:grid-cols-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Skills Match</span>
                          <span className="font-medium">
                            {Math.round(match.matchDetails.categoryScores.skills * 100)}%
                          </span>
                        </div>
                        <Progress value={match.matchDetails.categoryScores.skills * 100} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Experience Match</span>
                          <span className="font-medium">
                            {Math.round(match.matchDetails.categoryScores.experience * 100)}%
                          </span>
                        </div>
                        <Progress value={match.matchDetails.categoryScores.experience * 100} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Education Match</span>
                          <span className="font-medium">
                            {Math.round(match.matchDetails.categoryScores.education * 100)}%
                          </span>
                        </div>
                        <Progress value={match.matchDetails.categoryScores.education * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-1 text-sm font-medium">Matching Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {match.matchDetails.skillMatches.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-recruit-light px-2 py-1 text-xs text-recruit-primary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="mb-1 text-sm font-medium">Missing Critical Skills</h4>
                      {match.matchDetails.missingCriticalSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {match.matchDetails.missingCriticalSkills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-green-600">No missing critical skills</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                    {!match.shortlisted && (
                      <Button 
                        variant="outline" 
                        className="border-green-500 text-green-600 hover:bg-green-50" 
                        onClick={() => handleShortlist(match.id)}
                      >
                        Shortlist Candidate
                      </Button>
                    )}
                    {match.shortlisted && !match.interviewRequested && (
                      <Button 
                        variant="outline" 
                        className="border-blue-500 text-blue-600 hover:bg-blue-50" 
                        onClick={() => handleRequestInterview(match.id)}
                      >
                        Request Interview
                      </Button>
                    )}
                    <Button variant="outline">View Full Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="shortlisted" className="py-4">
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">
                Shortlisted matches would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="interviewed" className="py-4">
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">
                Interview requested matches would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchesPage;
