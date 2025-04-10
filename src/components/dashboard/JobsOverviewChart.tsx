
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data
const weeklyData = [
  { name: "Mon", jobs: 2, applications: 5 },
  { name: "Tue", jobs: 1, applications: 8 },
  { name: "Wed", jobs: 3, applications: 12 },
  { name: "Thu", jobs: 0, applications: 7 },
  { name: "Fri", jobs: 2, applications: 9 },
  { name: "Sat", jobs: 1, applications: 4 },
  { name: "Sun", jobs: 0, applications: 3 },
];

const monthlyData = [
  { name: "Week 1", jobs: 5, applications: 18 },
  { name: "Week 2", jobs: 8, applications: 32 },
  { name: "Week 3", jobs: 3, applications: 26 },
  { name: "Week 4", jobs: 6, applications: 22 },
];

const JobsOverviewChart = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Jobs Overview</CardTitle>
          <CardDescription>Job listings and applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[240px] w-full" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Jobs Overview</CardTitle>
        <CardDescription>Job listings and applications</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly">
          <TabsList className="mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={weeklyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="jobs" stroke="#0ea5e9" name="Jobs Posted" />
                <Line type="monotone" dataKey="applications" stroke="#7c3aed" name="Applications" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="monthly">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="jobs" stroke="#0ea5e9" name="Jobs Posted" />
                <Line type="monotone" dataKey="applications" stroke="#7c3aed" name="Applications" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default JobsOverviewChart;
