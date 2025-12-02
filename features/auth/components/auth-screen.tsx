"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authType } from "@/features/type";
import { Github, TriangleAlert } from "lucide-react";
import { FormEvent, useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useAuthActions } from "@convex-dev/auth/react";

export default function AuthScreen() {
  const [authState, setAuthState] = useState<authType>("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const { signIn } = useAuthActions();
  const handleSocialLogin = (social: "github" | "google") => {
    setPending(true);
    signIn(social).finally(() => {
      setPending(false);
    });
  };
  const handlePasswordAuth = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authState === "signUp") {
      password !== confirmPassword && setError("Password do not match");
      return;
    }
    setPending(true);
    signIn("password", { email, password, flow: authState })
      .catch(() => {
        setError(
          authState == "signIn"
            ? "Invalid email or password"
            : "Somethings wrong "
        );
      })
      .finally(() => {
        setPending(false);
      });
  };
  return (
    <div className=" w-full h-screen flex items-center justify-center bg-[#611f69]">
      <div className=" h-auto md:w-[450px]">
        <Card className="  w-full">
          <CardHeader>
            <CardTitle className=" text-2xl">
              {authState === "signIn" ? "Login" : "Register"} to DingDong
            </CardTitle>
            <CardDescription>
              Use your email or another service to continue
            </CardDescription>
          </CardHeader>
          {!!error && (
            <div className="  p-2 flex items-center gap-3 mx-5 rounded-md bg-destructive/15 text-destructive">
              <TriangleAlert className="size-5" /> {error}
            </div>
          )}
          <CardContent className=" space-y-5">
            <form className=" space-y-2.5" onSubmit={handlePasswordAuth}>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder=" password"
                required
              />
              {authState === "signUp" && (
                <Input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder=" confirmPassword"
                  required
                />
              )}
              <Button disabled={pending} className=" w-full">
                Continue
              </Button>
            </form>
            <Separator className="my-4" />
            <Button
              disabled={pending}
              className=" w-full"
              variant={"outline"}
              onClick={() => handleSocialLogin("google")}
            >
              <AiFillGoogleCircle />
              Continue with goolge
            </Button>
            <Button
              disabled={pending}
              className=" w-full"
              variant={"outline"}
              onClick={() => handleSocialLogin("github")}
            >
              <Github />
              Continue with github
            </Button>
            <p className=" text-sm text-muted-foreground">
              {authState == "signIn"
                ? "Don`t you have account?"
                : "Already have an account?"}
              <span
                className=" text-sky-600 cursor-pointer hover:underline"
                onClick={() =>
                  setAuthState((prev) =>
                    prev == "signIn" ? "signUp" : "signIn"
                  )
                }
              >
                {authState === "signUp" ? " Sign In" : " Sign up"}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
