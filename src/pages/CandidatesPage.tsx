
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PlusIcon } from "lucide-react";
import CandidateForm from "@/components/candidates/CandidateForm";

// Mock data for candidates
const candidates = [
  {
    id: "cand-1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    processedProfile: {
      technicalSkills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
      softSkills: ["Communication", "Teamwork", "Problem Solving"],
      education: [
        {
          degree: "B.S. Computer Science",
          institution: "MIT",
          year: "2018"
        }
      ],
      workExperience: [
        {
          role: "Senior Frontend Developer",
          company: "Tech Solutions Inc",
          years: "2020-Present",
          responsibilities: ["Led a team of 5 developers", "Implemented design system", "Reduced load time by 40%"]
        },
        {
          role: "Frontend Developer",
          company: "Web Dynamics",
          years: "2018-2020",
          responsibilities: ["Built React components", "Refactored legacy code", "Implemented unit tests"]
        }
      ]
    }
  },
  {
    id: "cand-2",
    name: "Jamie Smith",
    email: "jamie.smith@example.com",
    processedProfile: {
      technicalSkills: ["Product Strategy", "UX Research", "Agile", "Jira", "SQL"],
      softSkills: ["Leadership", "Stakeholder Management", "Strategic Thinking"],
      education: [
        {
          degree: "MBA",
          institution: "Harvard Business School",
          year: "2019"
        },
        {
          degree: "B.A. Business",
          institution: "UC Berkeley",
          year: "2015"
        }
      ],
      workExperience: [
        {
          role: "Product Manager",
          company: "InnovateTech",
          years: "2019-Present",
          responsibilities: ["Led product development for enterprise platform", "Increased user retention by 25%"]
        },
        {
          role: "Associate Product Manager",
          company: "TechStart Inc",
          years: "2015-2019",
          responsibilities: ["Managed backlog and sprint planning", "Coordinated with engineering and design teams"]
        }
      ]
    }
  }
];

const CandidatesPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">
            Manage candidate profiles and evaluations
          </p>
        </div>
        <Button
          className="w-full sm:w-auto"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <PlusIcon className="mr-1 h-4 w-4" />
          {showAddForm ? "Hide Form" : "Add New Candidate"}
        </Button>
      </div>

      {showAddForm && (
        <div className="my-6">
          <CandidateForm />
        </div>
      )}

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="all">All Candidates</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
          <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 py-4">
          {candidates.map((candidate) => (
            <Card key={candidate.id}>
              <CardHeader>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {candidate.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{candidate.name}</CardTitle>
                      <CardDescription>{candidate.email}</CardDescription>
                    </div>
                  </div>
                  <div>
                    <Button variant="outline">View Matches</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Technical Skills</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {candidate.processedProfile.technicalSkills.map((skill) => (
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
                    <h4 className="font-medium">Soft Skills</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {candidate.processedProfile.softSkills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium">Education</h4>
                    <div className="mt-2 space-y-2">
                      {candidate.processedProfile.education.map((edu, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="font-medium">{edu.degree}</div>
                          <div className="text-muted-foreground">
                            {edu.institution} • {edu.year}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium">Work Experience</h4>
                    <div className="mt-2 space-y-3">
                      {candidate.processedProfile.workExperience.map((exp, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="font-medium">{exp.role}</div>
                          <div className="text-muted-foreground">
                            {exp.company} • {exp.years}
                          </div>
                          {exp.responsibilities && (
                            <ul className="ml-4 mt-1 list-disc text-muted-foreground">
                              {exp.responsibilities.map((resp, i) => (
                                <li key={i}>{resp}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
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
                Shortlisted candidates would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="interviewed" className="py-4">
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">
                Interviewed candidates would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CandidatesPage;
