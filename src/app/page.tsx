"use client";

import useAuthStatusCheck from "@/hooks/useAuthStatusCheck";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Dashboard from "./dashboard/page";

export default function HomePage() {
  const { isValidUser } = useAuthStatusCheck(); // Hook to check if the user is valid
  const router = useRouter();

  // Redirect to the home page if the user is not valid
  useEffect(() => {
    if (!isValidUser) {
      router.replace("/"); // Replace current URL with the home page
    }
  }, [isValidUser]);

  return <Dashboard />; // Render the Dashboard component
}
