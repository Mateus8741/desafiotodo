import { useTaskStore } from "@/lib/store";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export function ChangeTheme() {
  const { toggleTheme, theme } = useTaskStore();

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-9 h-9"
    >
      {theme === "light" ? (
        <Sun
          className="text-yellow-500 transition-transform transform rotate-0 scale-100"
          size={24}
          key="sun"
        />
      ) : (
        <Moon
          className="text-blue-500 transition-transform transform rotate-0 scale-100"
          size={24}
          key="moon"
        />
      )}
    </Button>
  );
}
