import { useState } from "react";
import { useMatches, useShortlistCandidate, useRequestInterview } from "@/hooks/use-api";
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
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MatchesPage = () => {
  const [selectedJob, setSelectedJob] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: matches, isLoading, isError, error } = useMatches();
  const shortlistMutation = useShortlistCandidate();
  const interviewMutation = useRequestInterview();

  const handleShortlist = async (matchId: string) => {
    await shortlistMutation.mutateAsync(matchId);
  };

  const handleRequestInterview = async (matchId: string) => {
    await interviewMutation.mutateAsync(matchId);
  };

  const filteredMatches = !matches ? [] : 
    selectedJob === "all" 
      ? matches 
      : matches.filter(match => match.jobId === selectedJob);
      
  const tabFilteredMatches = !filteredMatches ? [] :
    activeTab === "all" 
      ? filteredMatches
      : activeTab === "shortlisted"
        ? filteredMatches.filter(match => match.shortlisted)
        : filteredMatches.filter(match => match.interviewRequested);

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Matches & Analysis</h1>
          <p className="text-muted-foreground">View and manage candidate-job matches</p>
        </div>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading matches data: {error instanceof Error ? error.message : "Unknown error"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

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

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Matches</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
          <TabsTrigger value="interviewed">Interview Requested</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 py-4">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="h-6 w-24" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="mb-2 grid gap-2 sm:grid-cols-3">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-2 w-full" />
                        </div>
                      ))}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {[...Array(2)].map((_, j) => (
                        <div key={j}>
                          <Skeleton className="h-4 w-32 mb-2" />
                          <div className="flex flex-wrap gap-1">
                            {[...Array(3)].map((_, k) => (
                              <Skeleton key={k} className="h-6 w-16 rounded-full" />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                      <Skeleton className="h-9 w-32" />
                      <Skeleton className="h-9 w-32" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : tabFilteredMatches.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No matches found</p>
              </CardContent>
            </Card>
          ) : (
            tabFilteredMatches.map((match) => (
              <Card key={match.id} className="group transition-all duration-300 hover:ring-1 hover:ring-primary/20">
                <CardHeader>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                          {match.candidateName.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{match.candidateName}</span>
                      <span className="text-sm font-normal text-muted-foreground">
                        for {match.jobTitle}
                      </span>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {Math.round(match.matchScore * 100)}% Match
                      </div>
                      {match.shortlisted && (
                        <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                          Shortlisted
                        </div>
                      )}
                      {match.interviewRequested && (
                        <div className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
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
                              className="rounded-full bg-primary bg-opacity-10 px-2 py-1 text-xs text-primary"
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
                                className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600 dark:bg-red-900 dark:text-red-200"
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
                          disabled={shortlistMutation.isPending}
                        >
                          {shortlistMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                            </>
                          ) : (
                            "Shortlist Candidate"
                          )}
                        </Button>
                      )}
                      {match.shortlisted && !match.interviewRequested && (
                        <Button 
                          variant="outline" 
                          className="border-blue-500 text-blue-600 hover:bg-blue-50"
                          onClick={() => handleRequestInterview(match.id)}
                          disabled={interviewMutation.isPending}
                        >
                          {interviewMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                            </>
                          ) : (
                            "Request Interview"
                          )}
                        </Button>
                      )}
                      <Button variant="outline">View Full Profile</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="shortlisted" className="py-4">
          {isLoading ? (
            <Card>
              <CardContent className="py-10 text-center">
                <Skeleton className="mx-auto h-4 w-48" />
              </CardContent>
            </Card>
          ) : tabFilteredMatches.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No shortlisted candidates found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {tabFilteredMatches.map((match) => (
                <Card key={match.id}>
                  <CardHeader>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                            {match.candidateName.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{match.candidateName}</span>
                        <span className="text-sm font-normal text-muted-foreground">
                          for {match.jobTitle}
                        </span>
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {Math.round(match.matchScore * 100)}% Match
                        </div>
                        {match.shortlisted && (
                          <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            Shortlisted
                          </div>
                        )}
                        {match.interviewRequested && (
                          <div className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
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
                                className="rounded-full bg-primary bg-opacity-10 px-2 py-1 text-xs text-primary"
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
                                  className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600 dark:bg-red-900 dark:text-red-200"
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
                            disabled={shortlistMutation.isPending}
                          >
                            {shortlistMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                              </>
                            ) : (
                              "Shortlist Candidate"
                            )}
                          </Button>
                        )}
                        {match.shortlisted && !match.interviewRequested && (
                          <Button 
                            variant="outline" 
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleRequestInterview(match.id)}
                            disabled={interviewMutation.isPending}
                          >
                            {interviewMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                              </>
                            ) : (
                              "Request Interview"
                            )}
                          </Button>
                        )}
                        <Button variant="outline">View Full Profile</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="interviewed" className="py-4">
          {isLoading ? (
            <Card>
              <CardContent className="py-10 text-center">
                <Skeleton className="mx-auto h-4 w-48" />
              </CardContent>
            </Card>
          ) : tabFilteredMatches.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No interview requests found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {tabFilteredMatches.map((match) => (
                <Card key={match.id}>
                  <CardHeader>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                            {match.candidateName.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{match.candidateName}</span>
                        <span className="text-sm font-normal text-muted-foreground">
                          for {match.jobTitle}
                        </span>
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {Math.round(match.matchScore * 100)}% Match
                        </div>
                        {match.shortlisted && (
                          <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            Shortlisted
                          </div>
                        )}
                        {match.interviewRequested && (
                          <div className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
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
                                className="rounded-full bg-primary bg-opacity-10 px-2 py-1 text-xs text-primary"
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
                                  className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600 dark:bg-red-900 dark:text-red-200"
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
                            disabled={shortlistMutation.isPending}
                          >
                            {shortlistMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                              </>
                            ) : (
                              "Shortlist Candidate"
                            )}
                          </Button>
                        )}
                        {match.shortlisted && !match.interviewRequested && (
                          <Button 
                            variant="outline" 
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleRequestInterview(match.id)}
                            disabled={interviewMutation.isPending}
                          >
                            {interviewMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                              </>
                            ) : (
                              "Request Interview"
                            )}
                          </Button>
                        )}
                        <Button variant="outline">View Full Profile</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchesPage;
