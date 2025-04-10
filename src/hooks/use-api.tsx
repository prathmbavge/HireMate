
import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService, Job, Candidate, Match, SystemStats } from "@/services/api";

// Jobs hooks
export const useJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: apiService.getJobs
  });
};

export const useJob = (id: string) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => apiService.getJob(id),
    enabled: !!id
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    }
  });
};

// Candidates hooks
export const useCandidates = () => {
  return useQuery({
    queryKey: ["candidates"],
    queryFn: apiService.getCandidates
  });
};

export const useCandidate = (id: string) => {
  return useQuery({
    queryKey: ["candidate", id],
    queryFn: () => apiService.getCandidate(id),
    enabled: !!id
  });
};

export const useCreateCandidate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.createCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    }
  });
};

// Matches hooks
export const useMatches = () => {
  return useQuery({
    queryKey: ["matches"],
    queryFn: apiService.getMatches
  });
};

export const useMatchesByJob = (jobId: string) => {
  return useQuery({
    queryKey: ["matches", jobId],
    queryFn: () => apiService.getMatchesByJob(jobId),
    enabled: !!jobId
  });
};

export const useShortlistCandidate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.shortlistCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    }
  });
};

export const useRequestInterview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.requestInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    }
  });
};

// System stats hook
export const useSystemStats = () => {
  return useQuery({
    queryKey: ["systemStats"],
    queryFn: apiService.getSystemStats
  });
};

// AI processing hooks
export const useProcessJobWithAI = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const processJob = useCallback(async (jobDescription: string) => {
    setIsProcessing(true);
    try {
      const result = await apiService.processJobWithAI(jobDescription);
      setIsProcessing(false);
      return result;
    } catch (error) {
      setIsProcessing(false);
      throw error;
    }
  }, []);
  
  return { processJob, isProcessing };
};

export const useProcessResumeWithAI = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const processResume = useCallback(async (resume: string) => {
    setIsProcessing(true);
    try {
      const result = await apiService.processResumeWithAI(resume);
      setIsProcessing(false);
      return result;
    } catch (error) {
      setIsProcessing(false);
      throw error;
    }
  }, []);
  
  return { processResume, isProcessing };
};
