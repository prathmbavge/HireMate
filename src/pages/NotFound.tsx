
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircleIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="text-center">
        <AlertCircleIcon className="mx-auto h-16 w-16 text-recruit-primary" />
        <h1 className="mt-4 text-4xl font-bold text-recruit-dark">404</h1>
        <p className="mt-2 text-xl text-muted-foreground">
          Oops! Page not found
        </p>
        <p className="mt-1 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
