import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { ChangeTheme } from "./change-theme";
import { TaskDialog } from "./task-dialog";
import { Button } from "./ui/button";

type HeaderProps = {
  onAddTask?: (title: string) => void;
};

export function Header({ onAddTask }: HeaderProps) {
  const { isSignedIn } = useUser();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 md:mb-6">
      <h1 className="text-xl md:text-2xl font-bold">Task Dashboard</h1>
      <div className="flex gap-2 items-center">
        {isSignedIn && onAddTask && <TaskDialog onSave={onAddTask} />}
        <ChangeTheme />
        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        )}
      </div>
    </header>
  );
}
