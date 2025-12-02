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
import { Github } from "lucide-react";
import { useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useAuthActions } from "@convex-dev/auth/react";

export default function AuthScreen() {
  const [authState, setAuthState] = useState<authType>("singIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signIn } = useAuthActions();
  const handleSocialLogin = (social: "github" | "google") => {
    signIn(social);
  };
  return (
    <div className=" w-full h-screen flex items-center justify-center bg-[#611f69]">
      <div className=" h-auto md:w-[450px]">
        <Card className="  w-full">
          <CardHeader>
            <CardTitle className=" text-2xl">
              {authState === "singIn" ? "Login" : "Register"} to DingDong
            </CardTitle>
            <CardDescription>
              Use your email or another service to continue
            </CardDescription>
          </CardHeader>
          <CardContent className=" space-y-5">
            <form className=" space-y-2.5">
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
              {authState === "singIn" && (
                <Input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder=" confirmPassword"
                  required
                />
              )}
              <Button className=" w-full">Continue</Button>
            </form>
            <Separator className="my-4" />
            <Button
              className=" w-full"
              variant={"outline"}
              onClick={() => handleSocialLogin("google")}
            >
              <AiFillGoogleCircle />
              Continue with goolge
            </Button>
            <Button
              className=" w-full"
              variant={"outline"}
              onClick={() => handleSocialLogin("github")}
            >
              <Github />
              Continue with github
            </Button>
            <p className=" text-sm text-muted-foreground">
              Already have an account?{" "}
              <span
                className=" text-sky-600 cursor-pointer hover:underline"
                onClick={() =>
                  setAuthState((prev) =>
                    prev == "singIn" ? "singUp" : "singIn"
                  )
                }
              >
                {authState === "singIn" ? "Sign In" : "Sign up"}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
