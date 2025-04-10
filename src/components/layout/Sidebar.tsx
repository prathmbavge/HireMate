
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3Icon,
  BriefcaseIcon,
  CalendarIcon,
  HomeIcon,
  SettingsIcon,
  UsersIcon
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const Sidebar = () => {
  return (
    <nav className="hidden border-r bg-muted/40 md:block md:w-64 lg:w-72">
      <div className="flex h-16 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <BriefcaseIcon className="h-6 w-6 text-recruit-primary" />
          <span>Smart Hire AI</span>
        </Link>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <Link
          to="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start gap-2"
          )}
        >
          <HomeIcon className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          to="/jobs"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start gap-2"
          )}
        >
          <BriefcaseIcon className="h-5 w-5" />
          Job Descriptions
        </Link>
        <Link
          to="/candidates"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start gap-2"
          )}
        >
          <UsersIcon className="h-5 w-5" />
          Candidates
        </Link>
        <Link
          to="/matches"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start gap-2"
          )}
        >
          <BarChart3Icon className="h-5 w-5" />
          Matches & Analysis
        </Link>
        <Link
          to="/schedule"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start gap-2"
          )}
        >
          <CalendarIcon className="h-5 w-5" />
          Interview Schedule
        </Link>
        <Link
          to="/settings"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start gap-2"
          )}
        >
          <SettingsIcon className="h-5 w-5" />
          Settings
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
