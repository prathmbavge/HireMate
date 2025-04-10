
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const JobForm = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Job description has been submitted for processing", {
        description: "Our AI agents will analyze and extract key requirements.",
      });

      // Reset form
      setJobTitle("");
      setDepartment("");
      setJobDescription("");
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Job Description</CardTitle>
        <CardDescription>
          Enter job details to be processed by the AI agents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="job-title">Job Title</Label>
            <Input
              id="job-title"
              placeholder="e.g. Senior Software Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select value={department} onValueChange={setDepartment} required>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              placeholder="Paste the full job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[200px]"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Submit Job Description"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobForm;
