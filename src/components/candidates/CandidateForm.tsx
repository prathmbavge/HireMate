
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

const CandidateForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cvText, setCvText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Candidate profile has been submitted for processing", {
        description: "Our AI agents will analyze and extract key skills and experience.",
      });

      // Reset form
      setName("");
      setEmail("");
      setCvText("");
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Candidate</CardTitle>
        <CardDescription>
          Enter candidate details to be processed by the AI agents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="e.g. John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. john.smith@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cv-text">CV/Resume Text</Label>
            <Textarea
              id="cv-text"
              placeholder="Paste the full CV/resume text here..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              className="min-h-[200px]"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Submit Candidate"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CandidateForm;
