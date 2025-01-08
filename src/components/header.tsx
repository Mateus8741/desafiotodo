import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { ChangeTheme } from "./change-theme";
import { Button } from "./ui/button";

export function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Task Dashboard</h1>
      <div className="flex gap-2 items-center">
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