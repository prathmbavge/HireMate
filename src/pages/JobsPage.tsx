
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
import { PlusIcon } from "lucide-react";
import JobForm from "@/components/jobs/JobForm";

// Mock data for jobs
const jobs = [
  {
    id: "job-1",
    title: "Senior Software Engineer",
    department: "Engineering",
    createdAt: "2025-04-05",
    processedDescription: {
      requiredTechnicalSkills: ["Python", "React", "AWS", "Docker"],
      requiredSoftSkills: ["Communication", "Leadership", "Problem Solving"],
      requiredEducation: "Bachelor's degree in Computer Science or related field",
      requiredExperience: "5+ years",
      responsibilities: [
        "Design and implement scalable web applications",
        "Mentor junior developers",
        "Collaborate with cross-functional teams"
      ]
    }
  },
  {
    id: "job-2",
    title: "Product Manager",
    department: "Product",
    createdAt: "2025-04-07",
    processedDescription: {
      requiredTechnicalSkills: ["Data Analysis", "Product Strategy", "A/B Testing"],
      requiredSoftSkills: ["Leadership", "Communication", "User Empathy"],
      requiredEducation: "Bachelor's degree in Business or related field",
      requiredExperience: "3+ years",
      responsibilities: [
        "Define product vision and strategy",
        "Work with engineering to prioritize features",
        "Analyze user needs and market trends"
      ]
    }
  },
  {
    id: "job-3",
    title: "UX Designer",
    department: "Design",
    createdAt: "2025-04-09",
    processedDescription: {
      requiredTechnicalSkills: ["Figma", "Adobe Creative Suite", "Prototyping"],
      requiredSoftSkills: ["Creativity", "User Empathy", "Collaboration"],
      requiredEducation: "Bachelor's degree in Design or related field",
      requiredExperience: "2+ years",
      responsibilities: [
        "Create wireframes and prototypes",
        "Conduct user research",
        "Work with developers to implement designs"
      ]
    }
  }
];

const JobsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showAddJobForm, setShowAddJobForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Descriptions</h1>
          <p className="text-muted-foreground">
            Manage and analyze job openings
          </p>
        </div>
        <Button
          className="w-full sm:w-auto"
          onClick={() => setShowAddJobForm(!showAddJobForm)}
        >
          <PlusIcon className="mr-1 h-4 w-4" />
          {showAddJobForm ? "Hide Form" : "Add New Job"}
        </Button>
      </div>

      {showAddJobForm && (
        <div className="my-6">
          <JobForm />
        </div>
      )}

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 py-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>
                      {job.department} • Added on {job.createdAt}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 sm:flex-col sm:items-end">
                    <Button variant="outline" className="mt-2 sm:mt-0">View Matches</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Required Technical Skills</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {job.processedDescription.requiredTechnicalSkills.map((skill) => (
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
                    <h4 className="font-medium">Required Soft Skills</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {job.processedDescription.requiredSoftSkills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium">Education</h4>
                      <p className="text-sm text-muted-foreground">
                        {job.processedDescription.requiredEducation}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Experience</h4>
                      <p className="text-sm text-muted-foreground">
                        {job.processedDescription.requiredExperience}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Key Responsibilities</h4>
                    <ul className="ml-6 mt-1 list-disc text-sm text-muted-foreground">
                      {job.processedDescription.responsibilities.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="active" className="py-4">
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">
                Active jobs content would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="archived" className="py-4">
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">
                Archived jobs content would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobsPage;
