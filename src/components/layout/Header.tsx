
import { Button } from "@/components/ui/button";
import { BellIcon, MenuIcon, UserCircleIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <Button variant="outline" size="icon" className="rounded-full">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <h1 className="text-lg font-semibold">HireMate</h1>
      </div>
      <div className="hidden md:flex">
        <h1 className="text-xl font-semibold">HireMate System</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <BellIcon className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircleIcon className="h-5 w-5" />
          <span className="sr-only">User</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
