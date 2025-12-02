"use client";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

const Home = () => {
  const { signOut } = useAuthActions();
  return (
    <div className=" w-full h-screen flex justify-center items-center ">
      <Button variant={"destructive"} onClick={signOut}>
        Logout
      </Button>
    </div>
  );
};
export default Home;
