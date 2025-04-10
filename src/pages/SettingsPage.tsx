
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const SettingsPage = () => {
  const handleSaveApiKeys = () => {
    toast.success("API keys saved successfully", {
      description: "Your changes have been saved.",
    });
  };

  const handleSaveEmailSettings = () => {
    toast.success("Email settings saved successfully", {
      description: "Your changes have been saved.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure the Smart Hire AI system settings
        </p>
      </div>

      <Separator />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>
              Configure API keys for language models and external services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="openai-api-key">OpenAI API Key</Label>
              <Input
                id="openai-api-key"
                placeholder="sk-..."
                type="password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="embedding-model">Embedding Model</Label>
              <Input
                id="embedding-model"
                defaultValue="text-embedding-ada-002"
              />
            </div>
            <Button onClick={handleSaveApiKeys}>Save API Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Configuration</CardTitle>
            <CardDescription>
              Configure email settings for candidate communications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="smtp-server">SMTP Server</Label>
                <Input
                  id="smtp-server"
                  placeholder="smtp.example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input
                  id="smtp-port"
                  placeholder="587"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="smtp-username">SMTP Username</Label>
                <Input
                  id="smtp-username"
                  placeholder="username@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">SMTP Password</Label>
                <Input
                  id="smtp-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <Button onClick={handleSaveEmailSettings}>Save Email Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>
              Configure system behavior and parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-shortlist">
                <div>Auto-shortlist Candidates</div>
                <div className="text-sm text-muted-foreground">
                  Automatically shortlist candidates with match score above threshold
                </div>
              </Label>
              <Switch id="auto-shortlist" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-schedule">
                <div>Auto-schedule Interviews</div>
                <div className="text-sm text-muted-foreground">
                  Automatically request interviews for shortlisted candidates
                </div>
              </Label>
              <Switch id="auto-schedule" />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="match-threshold">Match Score Threshold</Label>
              <Input
                id="match-threshold"
                defaultValue="0.75"
                type="number"
                min="0"
                max="1"
                step="0.05"
              />
              <p className="text-xs text-muted-foreground">
                Candidates with match scores above this threshold will be shortlisted
              </p>
            </div>
            <Button>Save System Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
