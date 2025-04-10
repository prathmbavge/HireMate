
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data
const funnelData = [
  { stage: "Applied", value: 75, fill: "#3b82f6" },
  { stage: "Screened", value: 48, fill: "#8b5cf6" },
  { stage: "Interviewed", value: 24, fill: "#0ea5e9" },
  { stage: "Offered", value: 12, fill: "#10b981" },
  { stage: "Hired", value: 8, fill: "#22c55e" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded-md shadow-sm">
        <p className="text-sm">{`${payload[0].payload.stage}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const RecruitmentFunnel = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recruitment Funnel</CardTitle>
          <CardDescription>Candidates at each stage</CardDescription>
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
        <CardTitle className="text-xl">Recruitment Funnel</CardTitle>
        <CardDescription>Candidates at each stage</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" />
            <YAxis dataKey="stage" type="category" scale="band" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RecruitmentFunnel;
