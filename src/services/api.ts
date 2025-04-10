
import { toast } from "sonner";

// Types
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  postedDate: string;
  applicants: number;
  status: "open" | "closed" | "draft";
  description: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  appliedFor: string[];
  status: "new" | "reviewed" | "shortlisted" | "interviewed" | "rejected" | "hired";
  matchScore?: number;
  skillsMatch?: number;
  experienceMatch?: number;
  educationMatch?: number;
  resume: string;
}

export interface Match {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  matchScore: number;
  matchDetails: {
    categoryScores: {
      skills: number;
      experience: number;
      education: number;
    };
    skillMatches: string[];
    missingCriticalSkills: string[];
  };
  shortlisted: boolean;
  interviewRequested: boolean;
}

export interface SystemStats {
  totalJobs: number;
  totalCandidates: number;
  averageMatchScore: number;
  shortlistedCandidates: number;
  interviewsScheduled: number;
  successfulPlacements: number;
}

// Mock data
const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    postedDate: "2025-04-01",
    applicants: 24,
    status: "open",
    description: "We are looking for a Senior Software Engineer proficient in React, TypeScript, and Node.js"
  },
  {
    id: "job-2",
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    postedDate: "2025-04-03",
    applicants: 18,
    status: "open",
    description: "Seeking an experienced Product Manager with 5+ years in SaaS products"
  },
  {
    id: "job-3",
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    postedDate: "2025-04-05",
    applicants: 32,
    status: "open",
    description: "Looking for a UX Designer with strong Figma skills and user research experience"
  }
];

const mockCandidates: Candidate[] = [
  {
    id: "cand-1",
    name: "Alex Johnson",
    email: "alex@example.com",
    appliedFor: ["job-1"],
    status: "shortlisted",
    matchScore: 0.85,
    skillsMatch: 0.9,
    experienceMatch: 0.8,
    educationMatch: 0.85,
    resume: "8 years experience as a Full Stack Developer with React, TypeScript, and AWS"
  },
  {
    id: "cand-2",
    name: "Jamie Smith",
    email: "jamie@example.com",
    appliedFor: ["job-2"],
    status: "reviewed",
    matchScore: 0.76,
    skillsMatch: 0.8,
    experienceMatch: 0.7,
    educationMatch: 0.8,
    resume: "Product Manager with 4 years experience in fintech startups"
  },
  {
    id: "cand-3",
    name: "Pat Wilson",
    email: "pat@example.com",
    appliedFor: ["job-3"],
    status: "interviewed",
    matchScore: 0.92,
    skillsMatch: 0.95,
    experienceMatch: 0.9,
    educationMatch: 0.9,
    resume: "Senior UX Designer with 6 years experience and portfolio of mobile and web projects"
  }
];

const mockMatches: Match[] = [
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

const mockSystemStats: SystemStats = {
  totalJobs: 12,
  totalCandidates: 35,
  averageMatchScore: 0.68,
  shortlistedCandidates: 8,
  interviewsScheduled: 5,
  successfulPlacements: 3
};

// Simulated delay to mimic API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API service
export const apiService = {
  // Jobs
  async getJobs(): Promise<Job[]> {
    await delay(800);
    return [...mockJobs];
  },
  
  async getJob(id: string): Promise<Job | undefined> {
    await delay(500);
    return mockJobs.find(job => job.id === id);
  },
  
  async createJob(job: Omit<Job, "id">): Promise<Job> {
    await delay(1000);
    const newJob = {
      ...job,
      id: `job-${Date.now()}`,
      applicants: 0,
      postedDate: new Date().toISOString().split('T')[0]
    };
    mockJobs.push(newJob);
    toast.success("Job created successfully");
    return newJob;
  },
  
  // Candidates
  async getCandidates(): Promise<Candidate[]> {
    await delay(800);
    return [...mockCandidates];
  },
  
  async getCandidate(id: string): Promise<Candidate | undefined> {
    await delay(500);
    return mockCandidates.find(candidate => candidate.id === id);
  },
  
  async createCandidate(candidate: Omit<Candidate, "id">): Promise<Candidate> {
    await delay(1000);
    const newCandidate = {
      ...candidate,
      id: `cand-${Date.now()}`
    };
    mockCandidates.push(newCandidate);
    toast.success("Candidate added successfully");
    return newCandidate;
  },
  
  // Matches
  async getMatches(): Promise<Match[]> {
    await delay(800);
    return [...mockMatches];
  },
  
  async getMatchesByJob(jobId: string): Promise<Match[]> {
    await delay(500);
    return mockMatches.filter(match => match.jobId === jobId);
  },
  
  async shortlistCandidate(matchId: string): Promise<Match> {
    await delay(700);
    const matchIndex = mockMatches.findIndex(match => match.id === matchId);
    if (matchIndex >= 0) {
      mockMatches[matchIndex] = {
        ...mockMatches[matchIndex],
        shortlisted: true
      };
      toast.success("Candidate has been shortlisted");
      return mockMatches[matchIndex];
    }
    throw new Error("Match not found");
  },
  
  async requestInterview(matchId: string): Promise<Match> {
    await delay(700);
    const matchIndex = mockMatches.findIndex(match => match.id === matchId);
    if (matchIndex >= 0) {
      mockMatches[matchIndex] = {
        ...mockMatches[matchIndex],
        interviewRequested: true
      };
      toast.success("Interview request sent");
      return mockMatches[matchIndex];
    }
    throw new Error("Match not found");
  },
  
  // System stats
  async getSystemStats(): Promise<SystemStats> {
    await delay(600);
    return {...mockSystemStats};
  },
  
  // AI processing simulation
  async processJobWithAI(jobDescription: string): Promise<{skills: string[], experience: string, education: string}> {
    await delay(1500);
    toast.success("AI analysis complete");
    // Simulated AI processing result
    return {
      skills: ["React", "TypeScript", "Node.js", "AWS", "CI/CD"],
      experience: "5+ years in software development",
      education: "Bachelor's degree in Computer Science or related field"
    };
  },
  
  async processResumeWithAI(resume: string): Promise<{skills: string[], experience: number, education: string}> {
    await delay(1500);
    toast.success("Resume analysis complete");
    // Simulated AI processing result
    return {
      skills: ["React", "JavaScript", "TypeScript", "AWS", "Docker"],
      experience: 4,
      education: "Master's in Computer Science"
    };
  }
};
